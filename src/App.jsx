import Home from "./Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./Nav";
import "./App.css";
import Cards from "./FeatureComponents/Lists";
import Error from "./Error";
import { BoardProvider } from "./Background";

const App = () => {
  return (
    <BrowserRouter>
      <Nav />
      <BoardProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/boards/:id" element={<Cards />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </BoardProvider>
    </BrowserRouter>
  );
};

export default App;
