import React, { useEffect } from "react";
import {
  UseFormRegister,
  UseFormSetValue,
  FieldError,
  FieldErrorsImpl,
  Merge,
} from "react-hook-form";
interface PlayerSelectDropdownProps {
  players: { name: string; number: string }[];
  register: UseFormRegister<{
    selectedSize: string;
    selectedColor: string;
    selectedQuantity: number;
    orderItemNotes: string;
    isAddNumberToBack: boolean;
    selectedPlayerName: string;
    selectedPlayerNumber: string;
    selectedMaterial: string;
  }>;
  // isRequired: boolean;
  selectedPlayerName: string;
  selectedPlayerNumber: string;
  setValue: UseFormSetValue<{
    selectedSize: string;
    selectedColor: string;
    selectedQuantity: number;
    orderItemNotes: string;
    isAddNumberToBack: boolean;
    selectedPlayerName: string;
    selectedPlayerNumber: string;
    selectedMaterial: string;
  }>;
  errors?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
}
let PlayerSelectDropdown = ({
  players,
  register,
  selectedPlayerName,
  setValue,
  errors,
}: PlayerSelectDropdownProps) => {
  // Automatically set player number when player name is selected
  useEffect(() => {
    const selectedPlayer = players.find(
      (player) => player.name === selectedPlayerName
    );
    if (selectedPlayer) {
      setValue("selectedPlayerNumber", selectedPlayer.number); // Set player number as read-only
    }
  }, [selectedPlayerName, players, setValue]);

  return (
    <div className='relative w-full my-4'>
      <label
        htmlFor='playerName'
        className="className='left-4 top-3 text-gray-800 text-sm py-2 transition-all duration-200 transform peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-black"
      >
        Player Name
      </label>
      <select
        id='selectedPlayerName'
        {...register("selectedPlayerName", { required: true })}
        className='mt-1 mb-4 p-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
      >
        <option value=''>Select a player</option>
        {players.map((player) => (
          <option key={player.number} value={player.name}>
            {player.name}
          </option>
        ))}
      </select>
      {errors &&
        errors.type === "required" &&
        typeof errors.message === "string" && (
          <p className='text-red-500 text-sm mt-1'>Player name is required</p>
        )}

      <label
        htmlFor='selectedPlayerNumber'
        className='left-4 my-4 top-3 text-gray-800 text-sm py-2 transition-all duration-200 transform peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-black'
      >
        Player Number
      </label>
      <input
        id='selectedPlayerNumber'
        {...register("selectedPlayerNumber")}
        className='mt-1 p-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
        readOnly
      />
    </div>
  );
};

export default PlayerSelectDropdown;
