import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallbackRender from "@/components/ErrorFallbackRender";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ErrorBoundary fallbackRender={ErrorFallbackRender}>
        <App />
      </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>
);
