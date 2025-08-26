import { useEffect, useState } from "react";
import loadingAnimation from "./assets/loading-animation.gif";
import { PawPrint } from "lucide-react";

function Game({ score, setScore, setBestScore }) {
  const [cards, setCards] = useState([]);
  const [clickedPokemons, setClickedPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initial card creation
  useEffect(() => {
    const newCards = Array.from({ length: 12 }, () => ({
      id: crypto.randomUUID(),
    }));
    setCards(newCards);
  }, []);

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=12"
        );
        const data = await response.json();
        console.log("API Data:", data);

        const pokemonList = data.results;

        const detailedCards = await Promise.all(
          pokemonList.map(async (pokemon) => {
            const result = await fetch(pokemon.url);
            const details = await result.json();
            return {
              id: details.id,
              name: details.name,
              sprite:
                details.sprites.versions["generation-v"]["black-white"].animated
                  .front_default,
            };
          })
        );
        setCards(detailedCards);
        setIsLoading(false);
      } catch (error) {
        console.error("Problem fetching Pokemons:", error);
      }
    }

    fetchPokemon();
  }, []);

  const handlePokemonClick = (cardId) => {
    setScore((prev) => prev + 1);

    if (clickedPokemons.indexOf(cardId) > -1) {
      setScore(0);
      setBestScore((prev) => Math.max(prev, score));
      setClickedPokemons([]);
    } else {
      setClickedPokemons((prevClicked) => [...prevClicked, cardId]);
    }
  };

  console.log("Array:", cards);

  return (
    <div className="Game">
      {cards.map((card) => (
        <div
          key={card.id}
          onClick={() => handlePokemonClick(card.id)}
          className="card"
        >
          <div className="sprite-container">
            <img
              className={isLoading ? "loading-icon" : "pokemon-sprite"}
              src={isLoading ? loadingAnimation : card.sprite}
              alt={isLoading ? "Loading..." : card.name}
            />
          </div>

          <p className="pokemon-name">
            {isLoading ? (
              <>
                <PawPrint /> Loading...{" "}
              </>
            ) : (
              <>
                <PawPrint /> {card.name}
              </>
            )}
          </p>
        </div>
      ))}
    </div>
  );
}
export default Game;
