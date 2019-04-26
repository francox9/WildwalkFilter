import { toArray, infoExtract, transportMap } from "./utils";

const container = document.querySelector(".wt-boxes-container");

const 
  _areas = new Set(), 
  _difficulties = new Set()

const routes = toArray(container.querySelectorAll(".ww-grid")).map(box => {
  const [intro, info, _, difficulty] = box.querySelectorAll("p");

  let area = box.querySelector("a").href.split("/")
  area = area.length > 4 ? area[4].replace(/\-/g, " ") : ''
  _areas.add(area)
  _difficulties.add(difficulty.innerText)
  
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
});



/**
 * Updates DOM
 * @argument {Object} filters - key-value filter pairs
 * @argument {boolean} reset - if reset options before 
 * 
 * @example
 * filter({area: 'blue mountain'}, true)
 */
const filter = ((_routes) => {
  const setVisible = elm => elm.style.display = 'block'
  const hide = elm => elm.style.display = 'none'  
  const resetElms = () => routes.forEach(r => setVisible(r.elm))
  const match = (filters, route) => {
    return Object.keys(filters).every(key => route[key].indexOf(filters[key]) >= 0)
  }

  const routes = _routes
  let savedFilters = {}
  return (filters, reset = false) => {
    let count = 0
    reset && (savedFilters = {})
    savedFilters = {...savedFilters, ...filters}

    resetElms()
    routes.forEach(r => match(savedFilters, r) ? count++ : hide(r.elm))
    return count
  }
})(routes)

// window.filter = filter

export default filter
export const areas = Array.from(_areas)
export const difficulties = Array.from(_difficulties)