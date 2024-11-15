import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toast } from "./components/ui/toast";
import { Toaster } from "./components/ui/toaster";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <Toaster />
      <App />
    </StrictMode>
  </BrowserRouter>
);
