import { observable, autorun } from "mobx";
import { debounce, isFurtherOrEqual } from "./utils";

const match = (route, filters) => {
  const { title, area, difficulty, type, transport, length } = filters;
  if (title && !new RegExp(title, "i").test(route.title)) return false;
  if (area && area != route.area) return false;
  if (difficulty && difficulty != route.difficulty) return false;
  if (type && type != route.type) return false;
  if (transport && route.transport.indexOf(transport) < 0) return false;
  if (length) {
    const [min, max] = length;
    const { info: {length: l} } = route;
    if ( (min && !isFurtherOrEqual(l, min)) || (max && !isFurtherOrEqual(max, l)) ) return false
  }

  return true;
};

const createStore = filterDOM => {
  var store = observable({
    /**
     * States
     */
    criterias: {},
    filteredAmount: 0,
    /**
     * Computed values
     */
    get filterFn() {
      const { criterias } = this;
      return route => {
        return match(route, criterias);
      };
    },
    /**
     * Functions
     */
    updateFilter(filter, reset = false) {
      reset && (this.criterias = {});
      this.criterias = {
        ...this.criterias,
        ...filter
      };
    },
    resetFilter() {
      store.updateFilter({}, true);
    }
  });

  /**
   * Auto update DOM
   */
  autorun(s => {
    const { filterFn } = store;
    store.filteredAmount = filterDOM(filterFn);
  });

  return store;
};

export default createStore;
