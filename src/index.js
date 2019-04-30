import { h, render } from "preact";
import "./style.scss";
import App from "./App.jsx";
import {createFilter} from './filter'


document.querySelectorAll(".wt-boxes-container").forEach(box => {
  const container = document.createElement("div")
  const filterInfo = createFilter(box)

  box.insertBefore(container, box.firstChild);

  render(<App filterInfo={filterInfo}/>, container);
})