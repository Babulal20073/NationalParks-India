/* Initialization */
const midPoint = [25.70, 82.79]
const bound_lb = new L.LatLng(3, 65)
const bound_tr = new L.LatLng(39, 99)
const map = L.map('map', {
	minZoom: 4,
	maxZoom: 11,
	maxBounds: new L.LatLngBounds(bound_lb, bound_tr),
    attributionControl: false
}).setView(midPoint, 5);

/* Attribution prefix */
L.control.attribution({prefix: '&copy; Babu'}).addTo(map);

/* Tile Provider */
const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// const stamen_TerrainBackground = L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}{r}.png', {
// 	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
// 	subdomains: 'abcd',
// 	ext: 'png'
// });

const cartoDB_DarkMatter = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
});

const cartoDB_DarkMatterNoLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 20
});

const emptyLayer = L.tileLayer('')

emptyLayer.addTo(map)

/* Overlay - India */
const indiaBoundaryStyle = {
    "color": "#ff7800",
    "weight": 2,
    "opacity": 1,
	"fill": false
};

const indiaStateBoundary = L.geoJSON(indiaStates, {
    style: indiaBoundaryStyle
})

indiaStateBoundary.addTo(map);

/* Overlay - National Parks */
const npMarkerOptions = {
	radius: 5,
	weight: 2,
	color: 'green',
	fillOpacity: 0.5,
}

const npMarkers = L.geoJSON(nationalParks, {
	pointToLayer: function (feature, latlng) {
		return L.circleMarker(latlng, npMarkerOptions) 
	},
	onEachFeature: function (feature, layer) {
		layer.bindTooltip(feature.properties.name)
	}
})

npMarkers.addTo(map)

/* Layer Control */
const layerControl = L.control.layers(
	baseMaps = {
		"Clean Background": emptyLayer,
		"Physical Map": osm,
		// "Physical Map (without labels)": stamen_TerrainBackground,
		"Physical Map Dark": cartoDB_DarkMatter,
		"Physical Map Dark (without labels)": cartoDB_DarkMatterNoLabels,
	},
	overlayMaps = {
		"India": indiaStateBoundary,
		"National Parks": npMarkers,
	}
).addTo(map)

/* Caption */
const caption = L.control({
	position: 'bottomright'
})

caption.onAdd = function(_map) {
	this.section = L.DomUtil.create('section', 'caption')
	this.section.innerHTML = '<h1>National Parks of India</h1>'
	//this.section.innerHTML += '<p>Updated till FE, 2024</p>'
	return this.section
}

caption.addTo(map)