import { GenericButton as GenericButtonTypes } from "../Button.types";

function GenericButton({ text, bgColor, textColor, onClick, disabled }: GenericButtonTypes) {
  const bg = disabled ? "bg-light-gray" : bgColor;
  const txt = disabled ? "text-black" : textColor;
  // const cursorState = disabled ? "cursor-block" : "cursor-pointer";
  const interactive = disabled
    ? "opacity-50 cursor-not-allowed"
    : "hover:bg-opacity-80 cursor-pointer";

    return (
    <button
      className={`${bg} ${txt} font-normal py-2 px-4 rounded-xl transition-all ${interactive}`}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
    >
      {text}
    </button>
  );
}

export default GenericButton;