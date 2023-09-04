import React from "react";

import "assets/css/nucleo-icons.css";
import "assets/css/blk-design-system-react.css";
import "assets/css/demo.css";

import App from "./App.js";

import { createRoot } from "react-dom/client";
const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);
