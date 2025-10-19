import { GenericButton as GenericButtonTypes } from "../Button.types";
import arrow from "../../../assets/arrow.svg"

function IconButton({ text, bgColor, textColor, onClick }: GenericButtonTypes) {

    return (
        <button
            className={`${bgColor} ${textColor} font-normal py-2 pr-4 pl-2 rounded-xl hover:bg-opacity-80 transition-all cursor-pointer flex items-center space-x-2`}
            onClick={onClick}
        >
            <img src={arrow} alt="icon" className="w-4 h-4" />
            <span>{text}</span>
        </button>

    );
}

export default IconButton;