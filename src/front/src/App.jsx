import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";

import { Home } from "./views/Home";
import { DetailsView } from "./views/DetailsView";
import { PlanetsView } from "./views/PlanetsVIew";
import { NotFound } from "./views/NotFound";

function App() {
  return (
    <BrowserRouter basename="/">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/characters/:id" element={<DetailsView />} />
        <Route path="/planets/:id" element={<PlanetsView />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
