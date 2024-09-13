import React from "react";

interface ButtonProps {
  handleClick?: () => void;
  isDisabled?: boolean;
  text: string;
  classNames?: string;
  type?: "submit" | "reset" | "button" | undefined;
}

const Button = ({
  handleClick,
  isDisabled = false,
  text,
  type = "submit",
  classNames,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`w-full py-2 mt-4 text-white bg-black rounded ${classNames}`}
      onClick={handleClick}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
};

export default Button;
