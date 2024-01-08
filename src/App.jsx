import Home from "./Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./Nav";
import Cards from "./Lists";

const App = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/boards/:id" element={<Cards />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
