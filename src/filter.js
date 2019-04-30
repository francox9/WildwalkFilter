import { toArray, infoExtract, transportMap } from "./utils";

/**
 * Creates  a controlling filter instance from extracted routes' info
 * @argument {Object} filters - key-value filter pairs
 * @argument {boolean} reset - if reset options before
 *
 * @example
 * filter({area: 'blue mountain'}, true)
 */
const createFilterFromRoutes = _routes => {
  const setVisible = elm => (elm.style.display = "block");
  const hide = elm => (elm.style.display = "none");
  const resetElms = () => routes.forEach(r => setVisible(r.elm));
  const match = (filters, route) => {
    return Object.keys(filters).every(
      key => route[key].indexOf(filters[key]) >= 0
    );
  };

  const routes = _routes;
  let savedFilters = {};
  return (filters, reset = false) => {
    let count = 0;
    reset && (savedFilters = {});
    savedFilters = { ...savedFilters, ...filters };

    resetElms();
    routes.forEach(r => (match(savedFilters, r) ? count++ : hide(r.elm)));
    return count;
  };
};

/**
 * Creates a controlling filter instance from a container box element
 * @param {Element} elm
 * @return {Function}
 */
export const createFilter = elm => {
  const container = elm;

  const areas = new Set(), difficulties = new Set();

  const routes = toArray(container.querySelectorAll(".ww-grid")).map(box => {
    const [intro, info, _, difficulty] = box.querySelectorAll("p");

    let area = box.querySelector("a").href.split("/");
    area = area.length > 4 ? area[4].replace(/\-/g, " ") : "Unknown";
    areas.add(area);
    difficulties.add(difficulty.innerText);

    return {
      title: box.querySelector(".ww-box-htag-title").innerText,
      transport: toArray(box.querySelectorAll(".ww-info-box li img")).map(
        op => transportMap[op.src] || op.src
      ),
      elm: box,
      intro: intro.innerHTML,
      info1: info.innerText,
      info: infoExtract(info.innerText),
      difficulty: difficulty.innerText,
      area
    };
  })

  return {
    filter: createFilterFromRoutes(routes),
    areas: Array.from(areas),
    difficulties: Array.from(difficulties)
  }
}
