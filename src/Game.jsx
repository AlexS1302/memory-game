import { useEffect, useState } from "react";

function Game() {
  const [cards, setCards] = useState([]);

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
                details.sprites.front_default,
            };
          })
        );
        setCards(detailedCards);
      } catch (error) {
        console.error("Problem fetching Pokemons:", error);
      }
    }

    fetchPokemon();
  }, []);

  console.log("Array:", cards);

  return (
    <div className="Game">
      {cards.map((card) => (
        <div key={card.id} className="card">
          <img className="pokemon-sprite" src={card.sprite}></img>
          <p className="pokemon-name">{card.name}</p>
        </div>
      ))}
    </div>
  );
}
export default Game;
