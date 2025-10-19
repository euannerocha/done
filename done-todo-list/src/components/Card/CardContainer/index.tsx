import { useMemo } from "react";
import useTodos from "../../../store/useTodos";
import CardItem from "../CardItem";

function CardContainer() {
  const todos = useTodos((s) => s.todos);
  const sortMode = useTodos((s) => s.sortMode);
  const toggle = useTodos((s) => s.toggle);
  const remove = useTodos((s) => s.remove);

  const collator = useMemo(
    () => new Intl.Collator(undefined, { sensitivity: "base", numeric: true }),
    []
  );

  const list = useMemo(() => {
    if (sortMode === "none") return todos;
    const cpy = [...todos];
    cpy.sort((a, b) =>
      sortMode === "asc"
        ? collator.compare(a.content, b.content)
        : collator.compare(b.content, a.content)
    );
    return cpy;
  }, [todos, sortMode, collator]);

  if (!Array.isArray(todos)) return null;

  return (
    <div className="flex flex-col space-y-4">
      {list.length === 0 && <div className="text-light-gray">{"No tasks here :( Let's create one?"}</div>}

      {list.map((t) => (
        <CardItem
          key={t.id}
          id={t.id}
          description={t.content}
          checked={t.checked}
          onToggle={() => toggle(t.id)}
          onDelete={() => remove(t.id)}
        />
      ))}
    </div>
  );
}

export default CardContainer;


// import { useEffect, useState } from "react";
// import CardItem from "../CardIcon";

// const CardContainer = () => {
//     const [cards, setCards] = useState([
//         { id: "1", description: "Card 1", checked: false },
//         { id: "2", description: "Card 2", checked: false },
//         { id: "3", description: "Card 3", checked: false },
//     ]);

//     useEffect(() => {
//         const handleCardDelete = (event: Event) => {
//             const { id } = (event as CustomEvent).detail;
//             setCards((prevCards) => prevCards.filter((card) => card.id !== id));
//         };

//         window.addEventListener("deleteCard", handleCardDelete);

//         return () => {
//             window.removeEventListener("deleteCard", handleCardDelete);
//         };
//     }, []);

//     return (
//         <div className="flex flex-col space-y-4">
//             {cards.map((card) => (
//                 <CardItem
//                     key={card.id}
//                     id={card.id}
//                     description={card.description}
//                     checked={card.checked}
//                 />
//             ))}
//         </div>
//     );
// };

// export default CardContainer;