// stores/storeConfigs.ts
import { Categories, StoreConfig } from "../../_types";
export const DRIFIT = "Dri-Fit (+ $5)";
const colors = ["Black", "Silver", "White"];
const materials = ["Cotton", DRIFIT];
export const DEFAULT_PLAYER_NUMBER = "n/a";
export const coach = { name: "Coach", number: DEFAULT_PLAYER_NUMBER };
import { hustle } from "./teams/hustle";
import { reign } from "./teams/reign";
import { renegades } from "./teams/renegades";
import { cinco } from "./teams/cinco";

export const stores: Record<string, StoreConfig> = {
  store1: {
    id: 1,
    version: 1,
    name: "Store 1",
    branding: {
      logo: "/store1-logo.png",
      primaryColor: "#ff5733",
      secondaryColor: "#c70039",
    },
    passcode: "s1",
    players: [
      { name: "John Doe", number: "10" },
      { name: "Jane Smith", number: "12" },
      { name: "Mike Johnson", number: "8" },
    ],
    items: [
      {
        id: 1,
        title: "T-Shirt",
        isCustomizable: false,
        category: Categories.TSHIRTS,
        price: 1.0,
        image: "/tshirt.png",
        sizes: ["S", "M", "L", "XL"],
        colors,
        material: [...materials],
        orders: [],
      },
      {
        id: 2,
        title: "Shirt",
        isCustomizable: false,
        category: Categories.TSHIRTS,
        price: 22.99,
        image: "/tshirt.png",
        sizes: ["S", "M", "L", "XL"],
        colors,
        material: [...materials],
        orders: [],
      },
      // More items...
    ],
  },
  renegades,
  hustle,
  reign,
  cinco,
};
