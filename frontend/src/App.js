import { BrowserRouter, Route, Routes } from "react-router-dom";
import Exchange from "./components/Exchange/Exchange";
import NavigationBar from "./components/NavigationBar";
import Home from "./components/Overview/Home";
import Send from "./components/Send/Send";
import Token from "./components/Token/Token";

const App = () => {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="send" element={<Send />} />
        <Route path="token" element={<Token />} />
        <Route path="exchange" element={<Exchange />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
