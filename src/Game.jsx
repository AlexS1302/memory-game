import { useEffect, useState } from "react";

function Game() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const newCards = Array.from({ length: 12 }, () => ({
      id: crypto.randomUUID(),
    }));
    setCards(newCards);
    console.log(newCards);
  }, []);

  return (
    <div className="Game">
      {cards.map((card) => (
        <div key={card.id} className="card">
          <div className="pokemon-sprite">Sprite</div>
          <div className="pokemon-name">Name</div>
        </div>
      ))}
    </div>
  );
}
export default Game;
