export const toArray = iterable => Array.prototype.slice.call(iterable);
String.prototype.contains = function(str) {
  return this.indexOf(str) >= 0
}

const defaultInfo = {
  minutes: 0,
  days: 0,
  hours: 0,
  length: "",
  time: "",
  type: "Return"
};
export const isLongerOrEqual = (a, b) => {
  if (a.days < b.days) return false
  else {
    if (a.days > b.days) return true
    // a.days === b.days
    if (a.hours < b.hours) return false
    else {
      if (a.hours > b.hours) return true
      // a.days === b.days, a.hours === b.hours
      if (a.minutes >= b.minutes) return true
      else return false
    }
  }
}


/**
 * Compare length
 * 
 * @example isFurtherOrEqual({length: '1 km'}, {length: '900 m'})
 * @param {*} a 
 * @param {*} b 
 */
export const isFurtherOrEqual = (a, b) => {
  // isFurtherOrEqual
  const lengthA = a.length, lengthB = b.length
  return parseInt( lengthA ) * (lengthA.contains('k') ? 1000 : 1 ) >=
          parseInt( lengthB ) * (lengthB.contains('k') ? 1000 : 1 )

}

export const infoExtract = infoStr => {
  const info = infoStr.match(
    /^(?<length>\d+(\.\d+)? k?m) (?<type>(Return)|(One way)|(Circuit))(\n|↵)(?<time>((?<days>\d+) Days?)?((?<hours>\d+) hrs?)?( )?((?<minutes>\d+) mins?)?)$/i
  );
  return {
    ...defaultInfo,
    ...(info && info.groups)
  };
};

export const transportMap = {
  "http://www.wildwalks.com/wildwalks_custom/icons/white_car.png": "Car",
  "http://www.wildwalks.com/wildwalks_custom/icons/white_bus.png": "Bus",
  "http://www.wildwalks.com/wildwalks_custom/icons/white_train.png": "Train",
  "http://www.wildwalks.com/wildwalks_custom/icons/white_ferry.png": "Ferry"
};

export const arrToFn = (arr) => {
  const map = arr.reduce((o, i) => {o[i] = true; return o}, {})
  return i => !!map[i]
}