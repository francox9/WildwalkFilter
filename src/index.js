import { h, render } from "preact";
import "./style.scss";
import App from "./App.jsx";
import { createFilter } from "./filter";
// import withData from "./components/withData";
import createStore from './store'
import {  Provider } from "mobx-preact";

document.querySelectorAll(".wt-boxes-container").forEach(box => {
  /**
   * Insert the filter component to the top of the box container
   */
  const container = document.createElement("div");
  box.insertBefore(container, box.firstChild);
  /**
   * A filter controller created with info from DOM
   */
  const { filterDOM, data } = createFilter(box);

  // import {observable, autorun, action} from "mobx";
  const store = createStore(filterDOM)

  render(
    <Provider store={store}>
      <App data={data} />
    </Provider>,

    container
  );
});
