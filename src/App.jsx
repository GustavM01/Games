import { BrowserRouter, Route, Routes } from "react-router-dom";
import TicTacToe from "./pages/TicTacToe";
import Snake from "./pages/Snake";
import Menu from "./pages/Menu";
import "./App.css";
import ConnectFour from "./pages/ConnectFour";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />}>
          {/* <Route index element={<h1>Välj ett spel</h1>} /> */}
          <Route path="tictactoe" element={<TicTacToe />} />
          <Route path="snake" element={<Snake />} />
          <Route path="connectfour" element={<ConnectFour />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
