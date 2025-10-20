import { useRef, useEffect, useState } from "react";
import pinkIcon from "../../../assets/iconPink.svg";
import orangeIcon from "../../../assets/iconOrange.svg";
import purpleIcon from "../../../assets/iconPurple.svg";
import xIcon from "../../../assets/xIcon.svg";
import { CardItemProps } from "../Card.types";
import { gsap } from "gsap";

function CardItem({ description, id, checked = false, onToggle, onDelete }: CardItemProps) {
  const [bgColor, setBgColor] = useState<string>("");
  const [checkColor, setCheckColor] = useState<string>("");
  const [borderCheckColor, setBorderCheckColor] = useState<string>("");
  const [iconImage, setIconImage] = useState<string>("");
  const rootRef = useRef<HTMLDivElement>(null);  

  useEffect(() => {
    const colors = [
      { colorClass: "bg-pink", icon: pinkIcon,   check: "bg-light-pink-1", border: "border-pink" },
      { colorClass: "bg-primary", icon: purpleIcon, check: "bg-light-primary-2", border: "border-primary" },
      { colorClass: "bg-orange", icon: orangeIcon, check: "bg-light-orange-1", border: "border-orange" },
    ];
    const c = colors[Math.floor(Math.random() * colors.length)];
    setBgColor(c.colorClass);
    setIconImage(c.icon);
    setCheckColor(c.check);
    setBorderCheckColor(c.border);
  }, []);

  const enter = () =>
    gsap.to(rootRef.current, { scale: 1.015, duration: 0.18, ease: "power2.out" });

  const leave = () =>
    gsap.to(rootRef.current, { scale: 1, duration: 0.22, ease: "power2.inOut" });

  return (
    <div ref={rootRef} onMouseEnter={enter} onMouseLeave={leave} id={String(id)} className="relative flex items-center justify-between bg-white p-4 rounded-lg shadow-md transform-gpu will-change-transform">
      <div className="flex items-center space-x-3">
        <img src={iconImage} alt="icon" className="w-8 h-8" />
        <span className={`font-medium ${checked ? "line-through text-light-primary-1" : "text-black"}`}>
          {description}
        </span>
      </div>

      <div className={`${checkColor} absolute top-1/2 -translate-y-1/2 right-16 w-7 h-7 rounded-lg flex justify-center items-center`}>
        <button
          aria-label="toggle checked"
          onClick={onToggle}
          className={`w-4 h-4 border-2 ${borderCheckColor} rounded-full ${checked ? bgColor : "bg-white"} cursor-pointer`}
        />
      </div>

      <button
        aria-label="Remover card"
        onClick={onDelete}
        className="absolute top-2 right-2 cursor-pointer"
      >
        <img src={xIcon} alt="" className="w-4 h-4" />
      </button>
    </div>
  );
}

export default CardItem;