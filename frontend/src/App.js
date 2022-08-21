import NavigationBar from "./components/NavigationBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Send from "./components/Send";
import Token from "./components/Token";
import Exchange from "./components/Exchange";

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
