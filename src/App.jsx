import { BrowserRouter, Route, Routes } from "react-router-dom";
import TicTacToe from "./pages/TicTacToe";
import Snake from "./pages/Snake";
import Menu from "./components/Menu";
import "./App.css";
import ConnectFour from "./pages/ConnectFour";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<TicTacToe />} />
        <Route path="snake" element={<Snake />} />
        <Route path="connectfour" element={<ConnectFour />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
