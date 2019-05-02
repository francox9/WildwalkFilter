import { observer, Provider, inject, connect } from "mobx-preact";
import { observable, action, autorun, computed } from "mobx";
import {debounce} from './utils'


const match = (route, filters) => {
    const {title, area, difficulty} = filters
    if (title && !(new RegExp(title, 'i') ).test(route.title) ) return false
    if (area && area != route.area) return false
    if (difficulty && difficulty != route.difficulty) return false

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
    }
  });


// const debounced = (filterFn) => debounce(() => filterDOM(filterFn), 500)()
  autorun(s => {
    const { filterFn } = store
    // debounced(filterFn)
    filterDOM(filterFn)

    // console.log(
    //   "in autorun",
    //   debounce(() => filterDOM(filterFn), 500)
    // );
  });

  return store;
};

export default createStore;
