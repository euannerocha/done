import { useEffect, useState } from "react";
import CardIcon from "../CardIcon";

const CardContainer = () => {
    const [cards, setCards] = useState([
        { id: "1", description: "Card 1", checked: false },
        { id: "2", description: "Card 2", checked: false },
        { id: "3", description: "Card 3", checked: false },
    ]);

    useEffect(() => {
        const handleCardDelete = (event: Event) => {
            const { id } = (event as CustomEvent).detail;
            setCards((prevCards) => prevCards.filter((card) => card.id !== id));
        };

        window.addEventListener("deleteCard", handleCardDelete);

        return () => {
            window.removeEventListener("deleteCard", handleCardDelete);
        };
    }, []);

    return (
        <div className="flex flex-col space-y-4">
            {cards.map((card) => (
                <CardIcon
                    key={card.id}
                    id={card.id}
                    description={card.description}
                    checked={card.checked}
                />
            ))}
        </div>
    );
};

export default CardContainer;