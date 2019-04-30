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
    const usePrimitiveCompare = arrToFn(['title', 'area', 'difficulty', 'type'])
    return Object.keys(filters).every(
      key => {
        switch (true) {
          case usePrimitiveCompare(key): return route[key].contains(filters[key], true)
          case key === 'transport': {
            return !filters[key] || route[key].indexOf(filters[key]) >= 0
          }
          case key === 'time': {
            debugger
            if (!filters.time) return true
            const [minTime, maxTime] = filters.time
            return isLongerOrEqual(route.info, minTime) &&
              isLongerOrEqual(maxTime, route.info) 
          }
          case key === 'length': {
            if (!filters.length) return true
            const [minL, maxL] = filters.length
            return isFurtherOrEqual(route.info, minL) &&
              isFurtherOrEqual(maxL, route.info) 
          } 
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

  const areas = new Set(), difficulties = new Set(), types = new Set(), transports = new Set();

  const routes = toArray(container.querySelectorAll(".ww-grid")).map(box => {
    const [intro, rawInfo, _, difficulty] = box.querySelectorAll("p");

    /** Name of the route */
    const title = box.querySelector(".ww-box-htag-title").innerText
    /** Transport methods */
    const transport = toArray(box.querySelectorAll(".ww-info-box li img")).map(
      op => transportMap[op.src] || op.src
    )
    /** Information: length, time, type, */
    const info = infoExtract(rawInfo.innerText)

    /** Type of the route */
    const type = info.type

    /** Aggretation: areas, difficulties, types, times, transports */
    let area = box.querySelector("a").href.split("/");
    area = area.length > 4 ? area[4].replace(/\-/g, " ") : "Unknown";
    areas.add(area);
    difficulties.add(difficulty.innerText);
    types.add(info.type)
    transport.forEach(t => transports.add(t))

    return {
      title,
      transport,
      elm: box,
      intro: intro.innerHTML,
      // info1: info.innerText,
      info,
      difficulty: difficulty.innerText,
      area,
      type
    };
  })

  const times = routes.map(r => ({
    days: r.info.days,
    hours: r.info.hours,
    minutes: r.info.minutes
  }))

  return {
    filter: createFilterFromRoutes(routes),
    areas: Array.from(areas),
    difficulties: Array.from(difficulties),
    types: Array.from(types),
    transports: Array.from(transports),
    routes,
    times
  }
}
