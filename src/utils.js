export const toArray = iterable => Array.prototype.slice.call(iterable);

const defaultInfo = {
  minutes: 0,
  days: 0,
  hours: 0,
  length: "",
  time: "",
  type: "Return"
};
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
  "http://www.wildwalks.com/wildwalks_custom/icons/white_bus.png": "Bus"
};