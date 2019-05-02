
import { toArray, infoExtract, transportMap, arrToFn, isLongerOrEqual, isFurtherOrEqual, Time } from "./utils";

/**
 * Creates a controlling filter instance from a container box element
 * @param {Element} elm
 * @return {Function}
 */
export const createFilter = elm => {
  const container = elm;

  const areas = new Set(), difficulties = new Set(), types = new Set(), 
    transports = new Set(), lengths = new Set(), times = []

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

    /**
     * Time of the route
     */
    const time = new Time(info)

    /** Aggretation: areas, difficulties, types, times, transports */
    let area = box.querySelector("a").href.split("/");
    area = area.length > 4 ? area[4].replace(/\-/g, " ") : "Unknown";
    areas.add(area);
    difficulties.add(difficulty.innerText);
    types.add(info.type)
    transport.forEach(t => transports.add(t))
    lengths.add(info.length)
    times.push(time)

    return {
      title,
      transport,
      elm: box,
      intro: intro.innerHTML,
      info,
      time,
      difficulty: difficulty.innerText,
      area,
      type
    };
  })


  const setVisible = elm => (elm.style.display = "block");
  const hide = elm => (elm.style.display = "none");

  const filterDOM = (filterFn) => {
    let count = 0
    routes.forEach(r => {
      filterFn(r) ? (setVisible(r.elm), count++) : hide(r.elm)
    });

    return count
  }

  return {
    filterDOM,
    data: {
      areas: Array.from(areas),
      difficulties: Array.from(difficulties),
      types: Array.from(types),
      transports: Array.from(transports),
      lengths: Array.from(lengths),
      routes,
      times
    }
  }
}
