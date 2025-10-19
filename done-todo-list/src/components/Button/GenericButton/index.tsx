import { GenericButton as GenericButtonTypes } from "../Button.types";

function GenericButton({ text, bgColor, textColor, onClick }: GenericButtonTypes) {

    return (
    <button
      className={`${bgColor} ${textColor} font-normal py-2 px-4 rounded-xl hover:bg-opacity-80 transition-all cursor-pointer`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default GenericButton;