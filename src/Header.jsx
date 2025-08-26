function Header({score, bestScore}) {
  return (
    <div className="Header">
      <h1 className="header-title">Pokémon Memory Game</h1>
      <div className="header-scores">
        <h3>Score: {score}</h3>
        <h3>Best Score: {bestScore}</h3>
      </div>
    </div>
  );
}
export default Header;
