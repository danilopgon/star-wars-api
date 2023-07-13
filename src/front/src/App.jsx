import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import { AppProvider } from "./context/AppContext.jsx";
import { LoginProvider } from "./context/LoginContext.jsx";
import { Navbar } from "./components/Navbar";

import { Home } from "./views/Home";
import { DetailsView } from "./views/DetailsView";
import { PlanetsView } from "./views/PlanetsView";
import { VehiclesView } from "./views/VehiclesView";
import { NotFound } from "./views/NotFound";
import { LoginView } from "./views/LoginView";

function App() {
  return (
    <BrowserRouter basename="/">
      <LoginProvider>
        <AppProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/characters/:id" element={<DetailsView />} />
            <Route path="/planets/:id" element={<PlanetsView />} />
            <Route path="/vehicles/:id" element={<VehiclesView />} />
            <Route path="/login" element={<LoginView />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppProvider>
      </LoginProvider>
    </BrowserRouter>
  );
}

export default App;
