import NavigationBar from "./components/NavigationBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Overview/Home";
import Send from "./components/Send/Send";
import Token from "./components/Token/Token";
import Exchange from "./components/Exchange/Exchange";

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
