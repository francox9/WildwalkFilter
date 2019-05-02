import { observable, autorun } from "mobx";
import {debounce} from './utils'


const match = (route, filters) => {
    const {title, area, difficulty, type, transport} = filters
    if (title && !(new RegExp(title, 'i') ).test(route.title) ) return false
    if (area && area != route.area) return false
    if (difficulty && difficulty != route.difficulty) return false
    if (type && type != route.type) return false
    if (transport && route.transport.indexOf(transport) < 0) return false

    return true
}

const createStore = filterDOM => {
  var store = observable({
    get filterFn() {
      const { criterias } = this;
      return (route) => {
        return match(route, criterias)
      };
    },
    updateFilter(filter, reset = false) {
      reset && (this.criterias = {});
      this.criterias = {
        ...this.criterias,
        ...filter
      };
    },
    criterias: {
      title: "Blue"
    },
    filteredAmount: 0
  });

  autorun(s => {
      console.log('~~~')
    const { filterFn } = store
    store.filteredAmount = filterDOM(filterFn)
  });

  return store;
};

export default createStore;
