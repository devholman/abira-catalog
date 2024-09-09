import { Field, Select } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

interface SelectMenuProps {
  name?: string;
  handleChange?: (x: React.ChangeEvent<HTMLSelectElement>) => void;
  options: any[];
}

export default function SelectMenu({
  name,
  handleChange,
  options,
}: SelectMenuProps) {
  return (
    <div className='w-full max-w-md px-4'>
      <Field>
        <div className='relative'>
          <Select
            name={name}
            className={clsx(
              "mt-3 block w-full appearance-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
              // Make the text of each option black on Windows
              "*:text-black"
            )}
            onChange={handleChange}
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
          <ChevronDownIcon
            className='group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60'
            aria-hidden='true'
          />
        </div>
      </Field>
    </div>
  );
}
