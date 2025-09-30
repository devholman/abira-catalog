#!/usr/bin/env node
/* eslint-disable no-console */
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const TEAM_DIR = "app/catalog/teams";
const IGNORE_FILE = "catalogConfigs.tsx"; // don't bump this aggregator file

// Match numeric version fields like: version: 14
const versionFieldRegex = /(version\s*:\s*)(\d+)/;

// --- helpers ---
function run(cmd) {
  return execSync(cmd, { encoding: "utf8" }).trim();
}
function tryGitShow(spec) {
  try {
    return run(`git show ${spec}`);
  } catch {
    return null;
  }
}
function getStagedFiles() {
  const list = run("git diff --cached --name-only --diff-filter=ACMRT")
    .split("\n")
    .filter(Boolean);
  return list;
}
// Strip version values so we can compare “substantive” changes
function stripVersions(text) {
  return text.replace(versionFieldRegex, "$1__STRIPPED__");
}
function parseVersion(text) {
  const m = text.match(versionFieldRegex);
  return m ? parseInt(m[2], 10) : null;
}
function setOrInsertVersion(text, next) {
  if (versionFieldRegex.test(text)) {
    return text.replace(versionFieldRegex, (_m, p1) => `${p1}${next}`);
  }
  // Insert after the first "{"" of the first object literal after a named export:
  // Works with: export const TEAM = { ... }
  return text.replace(
    /(\bexport\s+const\s+\w+\s*=\s*{\s*)/,
    `$1\n  version: ${next},\n`
  );
}

// --- main ---
(function main() {
  const staged = getStagedFiles()
    .filter((p) => p.startsWith(`${TEAM_DIR}/`))
    .filter((p) => p.endsWith(".tsx") || p.endsWith(".ts"))
    .filter((p) => path.basename(p) !== IGNORE_FILE);

  if (staged.length === 0) process.exit(0);

  const bumped = [];
  for (const file of staged) {
    const headText = tryGitShow(`HEAD:${file}`) ?? "";
    const stagedText = tryGitShow(`:${file}`) ?? fs.readFileSync(file, "utf8");

    const headStripped = stripVersions(headText);
    const stagedStripped = stripVersions(stagedText);

    // If nothing changed except version (or nothing changed), skip
    if (headStripped === stagedStripped) continue;

    // Something substantive changed → ensure version increments
    const oldV = parseVersion(headText) ?? 0;
    const newV = parseVersion(stagedText);

    // If dev already bumped to a higher number, accept it
    if (newV != null && newV > oldV) continue;

    const base = newV != null ? newV : oldV;
    const next = base + 1;

    const updated = setOrInsertVersion(stagedText, next);
    if (updated === stagedText) {
      console.error(`✖ Failed to bump version in ${file}`);
      process.exit(1);
    }

    fs.writeFileSync(file, updated, "utf8");
    run(`git add -- "${file}"`);
    bumped.push(`${file} (${base} → ${next})`);
  }

  if (bumped.length) {
    console.log("🔁 Auto-bumped team config versions:");
    bumped.forEach((x) => console.log("  •", x));
  }

  process.exit(0);
})();
