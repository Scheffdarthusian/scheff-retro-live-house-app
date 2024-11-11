import React from "react";
import { createRoot } from "react-dom/client";
import HomePage from "./HomePage";

const App = () => {
  return (
    <div id="app">
      <HomePage />
      <div className="wallpaper" />
    </div>
  );
};

const appDiv = document.getElementById("app");
const root = createRoot(appDiv);
root.render(<App />);
