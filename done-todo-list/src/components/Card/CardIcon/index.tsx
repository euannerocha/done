import { useEffect, useState } from "react";
import pinkIcon from "../../../assets/iconPink.svg"
import orangeIcon from "../../../assets/iconOrange.svg"
import purpleIcon from "../../../assets/iconPurple.svg"
import xIcon from "../../../assets/xIcon.svg"
import { Card as CardTypes } from "../Card.types";


function CardIcon({ description, id, checked = false }: CardTypes) {
  const [isChecked, setIsChecked] = useState(checked);
  const [bgColor, setBgColor] = useState<string>("");
  const [checkColor, setcheckColor] = useState<string>("");
  const [borderCheckColor, setBorderCheckColor] = useState<string>("");
  const [iconImage, setIconImage] = useState<string>("");

  const randomizeColor = () => {
    const colors = [
      { colorClass: "bg-pink", icon: pinkIcon, checkColor: "bg-light-pink-1", borderCheckColor: "border-pink" },
      { colorClass: "bg-purple", icon: purpleIcon, checkColor: "bg-light-purple-1", borderCheckColor: "border-purple" },
      { colorClass: "bg-orange", icon: orangeIcon, checkColor: "bg-light-orange-1", borderCheckColor: "border-orange" },
    ];

    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setBgColor(randomColor.colorClass);
    setIconImage(randomColor.icon);
    setcheckColor(randomColor.checkColor);
    setBorderCheckColor(randomColor.borderCheckColor)
  };

  useEffect(() => {
    randomizeColor();
  }, []);

  const handleCheckChange = () => {
    setIsChecked(!isChecked);
  };

  const handleDelete = () => {
    const event = new CustomEvent("deleteCard", { detail: { id } });
    window.dispatchEvent(event);
  };

  return (
    <>
      <div id={id} className="flex relative items-center justify-between bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center space-x-3">
          <img src={iconImage} alt="icon" className="w-8 h-8" />
          {!isChecked &&
            <span className="font-medium text-black">{description}</span>
          }
          {isChecked &&
            <span className="font-medium line-through text-light-gray">{description}</span>

          }
        </div>

        <div className={`${checkColor} absolute top-50% right-15 w-7 h-7 rounded-lg flex justify-center items-center space-x-3`}>
          <div
            onClick={handleCheckChange}
            className={`w-4 h-4 border-2 ${borderCheckColor} rounded-full ${isChecked ? bgColor : "bg-white"} cursor-pointer`}
          >
            {isChecked && (
              <div className="flex w-4 h-4 mx-auto my-auto bg-transparent rounded-full" />
            )}
          </div>
        </div>
        <div>
          <img
            id={id}
            src={xIcon}
            alt="close"
            className="absolute w-4 h-4 cursor-pointer top-0 right-0"
            onClick={handleDelete}
          />
        </div>
      </div>
    </>
  );
}

export default CardIcon;