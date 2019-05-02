export {uniqBy, uniq, debounce } from 'lodash'

String.prototype.contains = function(str, regex = false) {
  return regex ? (new RegExp(str, "i")).test(this) : (this.indexOf(str) >= 0)
}

export const toArray = iterable => Array.prototype.slice.call(iterable);


export function Time(info) {
  this.days = info.days
  this.hours = info.hours
  this.minutes = info.minutes
}
Time.prototype.toString = function() {
  const {days, hours, minutes} = this
  return (days && (days + 'days ')) + (hours && (hours + 'hours ')) + (minutes && (minutes + 'minutes '))
}
Time.prototype.valueOf = function() {
  const {days, hours, minutes} = this
  return (days && (days + 'days ')) + (hours && (hours + 'hours ')) + (minutes && (minutes + 'minutes '))
}
Time.prototype.isLongerOrEqual = (b) => {
  const a = this

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
export const isFurtherOrEqual = (lengthA, lengthB) => {
  return parseInt( lengthA ) * (lengthA.contains('k') ? 1000 : 1 ) >=
          parseInt( lengthB ) * (lengthB.contains('k') ? 1000 : 1 )
}

const defaultInfo = {
  minutes: 0,
  days: 0,
  hours: 0,
  length: "",
  time: "",
  type: "Return"
};
/**
 * Extract time, length and type information from string on DOM
 * @param {String} infoStr 
 */
export const infoExtract = infoStr => {
  const info = infoStr.match(
    /^(?<length>\d+(\.\d+)? k?m) (?<type>(Return)|(One way)|(Circuit))(\n|↵)(?<time>((?<days>\d+) Days?)?((?<hours>\d+) hrs?)?( )?((?<minutes>\d+) mins?)?)$/i
  );
  return info ? {
    minutes: info.groups.minutes || 0,
    days: info.groups.days || 0,
    hours:info.groups.hours || 0,
    length: info.groups.length || "",
    time: info.groups.time || "",
    type: info.groups.type || "Return"
  }: defaultInfo
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