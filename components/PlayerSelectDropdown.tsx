import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";

const PlayerSelectDropdown = ({ players }) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const selectedPlayerName = watch("playerName");

  // Automatically set player number when player name is selected
  useEffect(() => {
    const selectedPlayer = players.find(
      (player) => player.name === selectedPlayerName
    );
    if (selectedPlayer) {
      setValue("playerNumber", selectedPlayer.number); // Set player number as read-only
    }
  }, [selectedPlayerName, players, setValue]);

  return (
    <div className='relative w-full my-4'>
      <label
        htmlFor='playerName'
        className="className='left-4 top-3 text-gray-700 transition-all duration-200 transform peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-black"
      >
        Player Name
      </label>
      <select
        id='playerName'
        {...register("playerName", { required: true })}
        className='mt-1 mb-4 p-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
      >
        <option value=''>Select a player</option>
        {players.map((player) => (
          <option key={player.number} value={player.name}>
            {player.name}
          </option>
        ))}
      </select>
      {errors.playerName && (
        <p className='text-red-500 text-xs mt-1'>Player name is required</p>
      )}

      <label
        htmlFor='playerNumber'
        className='left-4 my-4 top-3 text-gray-500 transition-all duration-200 transform peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-black'
      >
        Player Number
      </label>
      <input
        id='playerNumber'
        {...register("playerNumber")}
        className='mt-1 p-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
        readOnly
      />
    </div>
  );
};

export default PlayerSelectDropdown;
