import Header from "./Header";
import Game from "./Game";
import "./styles/App.css";
import { useState } from "react";

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  return (
    <div className="App">
      <Header score={score} bestScore={bestScore} />
      <Game score={score} setScore={setScore} setBestScore={setBestScore} />
    </div>
  );
}

export default App;
