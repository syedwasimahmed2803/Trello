import Home from "./Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./Nav";
import "./App.css";
import Cards from "./FeatureComponents/Lists";
import Error from "./Error";

const App = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/boards/:id" element={<Cards />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
