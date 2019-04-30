import { toArray, infoExtract, transportMap, arrToFn, isLongerOrEqual, isFurtherOrEqual } from "./utils";

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

  /**
   * Decide whether a route matches the filters
   * 
   * @example filters object
   * {
   *    title: {String}, // case insensitive
   *    area: {String},
   *    difficulty: {String},
   *    type: {String},
   *    transport: {String}, // Enum {Bus, Ferry, Train, Car}
   *    time: {null | Array<Number>},
   *    length: {null | Array<String>}
   * }
   * 
   * @param {*} filters 
   * @param {*} route 
   */
  const match = (filters, route) => {
    const usePrimitiveCompare = arrToFn(['title', 'area', 'difficulty', 'transport', 'type'])
    return Object.keys(filters).every(
      key => {
        switch (true) {
          case usePrimitiveCompare(key): return route[key].indexOf(filters[key]) >= 0
          case key === 'time': return !filters.time || (isLongerOrEqual(route.info, filters.time[0]) && isLongerOrEqual(filters.time[1], route.info))
          case key === 'length': return !filters.length || (isFurtherOrEqual(route.info, filters.length[0]) && isFurtherOrEqual(filters.length[1], route.info))
        }
      } 
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
