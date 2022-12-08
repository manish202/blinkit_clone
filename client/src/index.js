import React from 'react';
import ReactDom from "react-dom/client";
import App from "./App";
import "./components/css/global.css";
const root = ReactDom.createRoot(document.getElementById("root"));
root.render(<App />);