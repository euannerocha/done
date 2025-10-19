import { AddButton as AddButtonTypes} from "../Button.types";
import addIcon from "../../../assets/add.svg"

function AddButton({desktop, onClick}: AddButtonTypes) {
    
 return(
    <button
      className={`${
        desktop === 'desktop' ? 'fixed bottom-4 right-4' : ''
      } bg-primary text-white font-thin text-3xl py-4 px-6 rounded-full hover:bg-opacity-80 transition-all cursor-pointer w-16 h-16 flex items-center justify-center shadow-lg`}
      onClick={onClick}
    >
      <img
        src={addIcon}
        alt="Add icon"
        className="w-10 h-10"
      />
    </button>
 )
}

export default AddButton;