import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./app/styles/index.css";
import "../src/shared/i18n/i18n.ts";

createRoot(document.getElementById("root")!).render(<App />);
