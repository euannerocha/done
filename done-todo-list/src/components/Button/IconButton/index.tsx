import { GenericButton as GenericButtonTypes } from "../Button.types";
import arrow from "../../../assets/arrow.svg"

function IconButton({ text, bgColor, textColor, onClick, disabled }: GenericButtonTypes) {
    const bg = disabled ? "bg-light-gray" : bgColor;
    const txt = disabled ? "text-black" : textColor;
    const interactive = disabled
        ? "opacity-50 cursor-not-allowed"
        : "hover:bg-opacity-80 cursor-pointer";

    return (
        <button
            className={`${bg} ${txt} font-normal py-2 pr-4 pl-2 rounded-xl transition-all flex items-center space-x-2 ${interactive}`}
            onClick={onClick}
            disabled={disabled}
            aria-disabled={disabled}
        >
            <img src={arrow} alt="icon" className="w-4 h-4" />
            <span>{text}</span>
        </button>

    );
}

export default IconButton;