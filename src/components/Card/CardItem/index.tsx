import { useRef, useEffect, useState } from "react";
import pinkIcon from "../../../assets/iconPink.svg";
import orangeIcon from "../../../assets/iconOrange.svg";
import purpleIcon from "../../../assets/iconPurple.svg";
import xIcon from "../../../assets/xIcon.svg";
import editIcon from "../../../assets/editIcon.svg";
import { CardItemProps } from "../Card.types";
import { gsap } from "gsap";

function CardItem({ description, id, checked = false, onToggle, onDelete, onEdit }: CardItemProps) {
  const [bgColor, setBgColor] = useState<string>("");
  const [checkColor, setCheckColor] = useState<string>("");
  const [borderCheckColor, setBorderCheckColor] = useState<string>("");
  const [iconImage, setIconImage] = useState<string>("");

  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(description);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => setDraft(description), [description]);

  useEffect(() => {
    const colors = [
      { colorClass: "bg-pink",    icon: pinkIcon,    check: "bg-light-pink-1",    border: "border-pink" },
      { colorClass: "bg-primary", icon: purpleIcon,  check: "bg-light-primary-2", border: "border-primary" },
      { colorClass: "bg-orange",  icon: orangeIcon,  check: "bg-light-orange-1",  border: "border-orange" },
    ];
    const c = colors[Math.floor(Math.random() * colors.length)];
    setBgColor(c.colorClass);
    setIconImage(c.icon);
    setCheckColor(c.check);
    setBorderCheckColor(c.border);
  }, []);

  const rootRef = useRef<HTMLDivElement>(null);
  const enter = () => gsap.to(rootRef.current, { scale: 1.015, duration: 0.18, ease: "power2.out" });
  const leave = () => gsap.to(rootRef.current, { scale: 1, duration: 0.22, ease: "power2.inOut" });

  const startEdit = () => {
    setDraft(description);
    setIsEditing(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const commitEdit = () => {
    const txt = draft.trim();
    if (!txt) { cancelEdit(); return; }
    if (txt !== description) onEdit?.(txt);
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setDraft(description);
    setIsEditing(false);
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") { e.preventDefault(); commitEdit(); }
    if (e.key === "Escape") { e.preventDefault(); cancelEdit(); }
  };

  return (
    <div
      ref={rootRef}
      onMouseEnter={enter}
      onMouseLeave={leave}
      id={String(id)}
      className="ml-3 mr-3 relative flex items-center justify-between bg-white p-4 rounded-lg shadow-md transform-gpu will-change-transform"
    >
      <div className="flex items-center gap-3 w-[75%] min-w-0">
        <img src={iconImage} alt="icon" className="w-8 h-8" />

        {!isEditing ? (
          <span
            onDoubleClick={startEdit}
            className={`font-medium ${checked ? "line-through text-light-primary-1" : "text-black"} cursor-text break-words flex-1 min-w-0`}
            title="Double click to edit"
          >
            {description}
          </span>
        ) : (
          <input
            ref={inputRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={onKeyDown}
            onBlur={commitEdit}
            className="bg-light-primary-2/40 text-black px-2 py-1 rounded-md outline-none focus:ring-2 focus:ring-light-primary-1 w-100"
          />
        )}
      </div>

      <div className={`${checkColor} absolute top-1/2 -translate-y-1/2 right-12 w-7 h-7 rounded-lg flex justify-center items-center`}>
        <button
          aria-label="toggle checked"
          onClick={onToggle}
          className={`w-4 h-4 border-2 ${borderCheckColor} rounded-full ${checked ? bgColor : "bg-white"} cursor-pointer`}
        />
      </div>
      <button
        aria-label="Remover card"
        onClick={onDelete}
        className="absolute top-0 right-0 cursor-pointer"
      >
        <img src={xIcon} alt="" className="w-4 h-4" />
      </button>

      <button
        aria-label={isEditing ? "Salvar edição" : "Editar card"}
        onClick={isEditing ? commitEdit : startEdit}
        className="absolute top-0 left-0 cursor-pointer"
        title={isEditing ? "Salvar" : "Editar"}
      >
        <img src={editIcon} alt="edit icon" className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

export default CardItem;