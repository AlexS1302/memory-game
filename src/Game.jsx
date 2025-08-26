import { useEffect, useState } from "react";
import loadingAnimation from "./assets/animations/loading-animation.gif";
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
      setBestScore((prevBest) => Math.max(prevBest, score));
      setClickedPokemons([]);
      handlePokemonShuffle();
    } else {
      setClickedPokemons((prevClicked) => [...prevClicked, cardId]);
      handlePokemonShuffle();
    }
  };

  const handlePokemonShuffle = () => {
    setIsLoading(true);
    setTimeout(() => {
      const shuffledCards = shuffle(cards);
      setCards(shuffledCards);
      setIsLoading(false);
    }, 300);
  };

  // Fisher-Yates algorithm
  function shuffle(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const random = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[random]] = [copy[random], copy[i]];
    }
    return copy;
  }

  return (
    <div className="Game">
      {cards &&
        cards.map((card) => (
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
