import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { AppProvider } from "./context/AppContext.jsx";
import { LoginProvider } from "./context/LoginContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <LoginProvider>
    <AppProvider>
      <App />
    </AppProvider>
  </LoginProvider>
);
