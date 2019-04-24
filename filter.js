const toArray = (iterable) => Array.prototype.slice.call(iterable)

const infoExtract = (infoStr) => {
	// debugger
	const info = infoStr.match(/^(?<length>\d+(\.\d+)? k?m) (?<type>(Return)|(One way)|(Circuit))(\n|↵)(?<time>((?<days>\d+) Days?)?((?<hours>\d+) hrs?)?( )?((?<minutes>\d+) mins?)?)$/i)
	return info && info.groups
}
const transportMap = {
	"http://www.wildwalks.com/wildwalks_custom/icons/white_car.png": "Car",
	"http://www.wildwalks.com/wildwalks_custom/icons/white_bus.png": "Bus",

}



const container = document.querySelector('.wt-boxes-container')
const routes = []
container.querySelectorAll('.ww-grid').forEach(box => {
	const [intro, info, _, difficulty] = box.querySelectorAll('p')

	routes.push({
		title: box.querySelector('.ww-box-htag-title').innerText,
		transport: toArray( box.querySelectorAll('.ww-info-box li img') ).map(op => transportMap[op.src] || op.src),
		elm: box,
		intro: intro.innerHTML,
		info1: (info.innerText),
		info: infoExtract(info.innerText),
		difficulty: difficulty.innerText,
		area: box.querySelector('a').href.split('/')[4].replace(/\-/g, ' ')
	})
})



// 60 m Return↵3 mins
// "5.3 km Return↵2 hrs 30 mins".match(/(\.)\n/)

