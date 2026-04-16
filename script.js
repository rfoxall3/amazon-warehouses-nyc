mapboxgl.accessToken = 'pk.eyJ1IjoicmZveGFsbDMiLCJhIjoiY21uaTJ1emlwMDlkNDJwcHV0YXVxNHZlbCJ9.w9o60UF7L6nwMqTGzWGu0w';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/standard',
    center: [-73.97912, 40.71802],
    zoom: 10.05
});

// Add zoom and other navigational controls to the map
map.addControl(new mapboxgl.NavigationControl());

// Data source: NYC PLUTO dataset, filtered to warehouse landuse type over 50k square feet and owner validated in Google Maps
// Tool for converting CSV to JSON: https://www.geeksforgeeks.org/utilities/csv-to-json-converter/ 
const markerData = [
  {
    "Borough": "SI",
    "Council": 50,
    "ZipCode": 10314,
    "Address": "566 GULF AVENUE",
    "ZoneDist1": "M3-1",
    "OwnerName": "MATRIX/PPF STATEN ISLAND LOT2 LLC.",
    "LotArea": 1448801,
    "BldgArea": 450000,
    "ComArea": 450000,
    "AssessLand": 11409300,
    "AssessTot": 35050500,
    "YearBuilt": 2019,
    "YearAlter1": 0,
    "YearAlter2": 0,
    "Latitude": 40.616369,
    "Longitude": -74.1892962,
    "Shape_Area": 1508602.179
  },
  {
    "Borough": "SI",
    "Council": 50,
    "ZipCode": 10314,
    "Address": "546 GULF AVENUE",
    "ZoneDist1": "M3-1",
    "OwnerName": "STATEN ISLAND GLOBAL LOGISTIC PARK LOT 3 LLC",
    "LotArea": 2122958,
    "BldgArea": 904400,
    "ComArea": 904400,
    "AssessLand": 16718400,
    "AssessTot": 58639500,
    "YearBuilt": 2018,
    "YearAlter1": 0,
    "YearAlter2": 0,
    "Latitude": 40.6191952,
    "Longitude": -74.1881947,
    "Shape_Area": 1916117.812
  },
  {
    "Borough": "SI",
    "Council": 50,
    "ZipCode": 10314,
    "Address": "526 GULF AVENUE",
    "ZoneDist1": "M3-1",
    "OwnerName": "MATRIX/PPF STATEN ISLAND LOT 4 HOLDINGS LLC",
    "LotArea": 2549173,
    "BldgArea": 975000,
    "ComArea": 975000,
    "AssessLand": 860400,
    "AssessTot": 44018550,
    "YearBuilt": 2020,
    "YearAlter1": 0,
    "YearAlter2": 0,
    "Latitude": 40.6209492,
    "Longitude": -74.1847128,
    "Shape_Area": 2522730.23
  },
  {
    "Borough": "BX",
    "Council": 17,
    "ZipCode": 10474,
    "Address": "1080 LEGGETT AVENUE",
    "ZoneDist1": "M1-2",
    "OwnerName": "CENTERPOINT LEGGETT LLC",
    "LotArea": 209700,
    "BldgArea": 140348,
    "ComArea": 140348,
    "AssessLand": 3087900,
    "AssessTot": 19999800,
    "YearBuilt": 1931,
    "YearAlter1": 2019,
    "YearAlter2": 0,
    "Latitude": 40.8111862,
    "Longitude": -73.8965603,
    "Shape_Area": 206352.021
  },
  {
    "Borough": "BX",
    "Council": 17,
    "ZipCode": 10474,
    "Address": "511 BARRY STREET",
    "ZoneDist1": "M1-2",
    "OwnerName": "CENTERPOINT BARRY LLC",
    "LotArea": 200600,
    "BldgArea": 108986,
    "ComArea": 108986,
    "AssessLand": 562500,
    "AssessTot": 18862200,
    "YearBuilt": 1961,
    "YearAlter1": 1977,
    "YearAlter2": 0,
    "Latitude": 40.809698,
    "Longitude": -73.8959738,
    "Shape_Area": 199600.5315
  },
  {
    "Borough": "BX",
    "Council": 17,
    "ZipCode": 10474,
    "Address": "1301 RYAWA AVENUE",
    "ZoneDist1": "M3-1",
    "OwnerName": "HUNTS POINT WH LLC",
    "LotArea": 141000,
    "BldgArea": 120775,
    "ComArea": 120775,
    "AssessLand": 1842300,
    "AssessTot": 10759500,
    "YearBuilt": 1963,
    "YearAlter1": 2017,
    "YearAlter2": 0,
    "Latitude": 40.8059481,
    "Longitude": -73.8838066,
    "Shape_Area": 140053.4055
  },
  {
    "Borough": "BX",
    "Council": 13,
    "ZipCode": 10461,
    "Address": "1502 BASSETT AVENUE",
    "ZoneDist1": "M1-1",
    "OwnerName": "RLF II BASSETT LLC",
    "LotArea": 524200,
    "BldgArea": 366375,
    "ComArea": 366375,
    "AssessLand": 7076700,
    "AssessTot": 24759900,
    "YearBuilt": 1951,
    "YearAlter1": 2005,
    "YearAlter2": 2019,
    "Latitude": 40.8525843,
    "Longitude": -73.840764,
    "Shape_Area": 778362.1296
  },
  {
    "Borough": "BK",
    "Council": 38,
    "ZipCode": 11231,
    "Address": "537 COLUMBIA STREET",
    "ZoneDist1": "M1-1",
    "OwnerName": "GRINNEL REALTY HOLDINGS LLC",
    "LotArea": 88000,
    "BldgArea": 95787,
    "ComArea": 95787,
    "AssessLand": 1024650,
    "AssessTot": 12839850,
    "YearBuilt": 2019,
    "YearAlter1": 0,
    "YearAlter2": 0,
    "Latitude": 40.6733965,
    "Longitude": -74.0073326,
    "Shape_Area": 93040.40853
  },
  {
    "Borough": "BK",
    "Council": 38,
    "ZipCode": 11231,
    "Address": "640 COLUMBIA STREET",
    "ZoneDist1": "M3-1",
    "OwnerName": "640 COLUMBIA OWNER LLC",
    "LotArea": 176041,
    "BldgArea": 478268,
    "ComArea": 478268,
    "AssessLand": 3194100,
    "AssessTot": 33258600,
    "YearBuilt": 2020,
    "YearAlter1": 2019,
    "YearAlter2": 0,
    "Latitude": 40.6710002,
    "Longitude": -74.0094881,
    "Shape_Area": 173442.7252
  },
  {
    "Borough": "BK",
    "Council": 38,
    "ZipCode": 11231,
    "Address": "280 RICHARDS STREET",
    "ZoneDist1": "M3-1",
    "OwnerName": "TERRENO 280 RICHARDS LLC",
    "LotArea": 666600,
    "BldgArea": 150977,
    "ComArea": 150977,
    "AssessLand": 2509650,
    "AssessTot": 16556850,
    "YearBuilt": 2021,
    "YearAlter1": 2020,
    "YearAlter2": 0,
    "Latitude": 40.6728276,
    "Longitude": -74.0152707,
    "Shape_Area": 682870.8669
  },
  {
    "Borough": "QN",
    "Council": 26,
    "ZipCode": 11378,
    "Address": "56-85 49 STREET",
    "ZoneDist1": "M3-1",
    "OwnerName": "TERRENO 14605 MILLER AVE LLC",
    "LotArea": 94842,
    "BldgArea": 17320,
    "ComArea": 17320,
    "AssessLand": 1060200,
    "AssessTot": 2057400,
    "YearBuilt": 1966,
    "YearAlter1": 0,
    "YearAlter2": 0,
    "Latitude": 40.7249666,
    "Longitude": -73.9183265,
    "Shape_Area": 93704.08761
  },
  {
    "Borough": "QN",
    "Council": 30,
    "ZipCode": 11378,
    "Address": "55-15 GRAND AVENUE",
    "ZoneDist1": "M3-1",
    "OwnerName": "55-15 GRAND AVENUE PROPERTY LP",
    "LotArea": 384695,
    "BldgArea": 857715,
    "ComArea": 857715,
    "AssessLand": 4712400,
    "AssessTot": 55920600,
    "YearBuilt": 2021,
    "YearAlter1": 2021,
    "YearAlter2": 0,
    "Latitude": 40.7198364,
    "Longitude": -73.9141481,
    "Shape_Area": 385891.5308
  },
  {
    "Borough": "QN",
    "Council": 22,
    "ZipCode": 11377,
    "Address": "26-15 BROOKLYN QUEENS EXPRESSWAY",
    "ZoneDist1": "M1-1",
    "OwnerName": "TERRENO WOODSIDE LLC",
    "LotArea": 160049,
    "BldgArea": 92344,
    "ComArea": 0,
    "AssessLand": 2160450,
    "AssessTot": 7939350,
    "YearBuilt": 1960,
    "YearAlter1": 1987,
    "YearAlter2": 0,
    "Latitude": 40.7624163,
    "Longitude": -73.9011917,
    "Shape_Area": 179454.9591
  }
]

// Color library for boroughs
// TODO: change to color library for owner (Amazon, FedEx, UPS)
const boroughColors = {
    "SI": "#1f77b4",
    "BX": "#ff7f0e",
    "BK": "#2ca02c",
    "QN": "#d62728",
    "MN": "#9467bd"
};

markerData.forEach((marker) => {
    new mapboxgl.Marker({
        color: boroughColors[marker.Borough]
    })
        .setLngLat([marker.Longitude, marker.Latitude])
        .setPopup(
            new mapboxgl.Popup({ offset: 25 })
                .setText(`This property is ${marker.LotArea} sq ft, was first built in ${marker.YearBuilt}, and is located at ${marker.Address}.`)
        )
        .addTo(map);
});

// TODO create feature such that, when a marker is clicked, the map zooms in and changes the pitch to show nearby buildings
// preferred settings - bearing: 0 (due north), pitch: 71.50
// and, when the popup is closed, the map will zoom back out and reset the pitch to be flat
// TODO: check bearing relative to compass
// TODO: remove annoying landmark markers when zoomed in

// Create legend
// TODO: Update borough names to full names for clarity
const legend = document.createElement('div');
legend.className = 'legend';
legend.innerHTML = '<h4>Boroughs</h4>';

Object.entries(boroughColors).forEach(([borough, color]) => {
    const item = document.createElement('div');
    item.className = 'legend-item';
    item.innerHTML = `
        <span class="legend-circle" style="background-color: ${color}"></span>
        <span class="legend-label">${borough}</span>
    `;
    legend.appendChild(item);
});

document.body.appendChild(legend);

// Create header with information about this map and how it can be used
// Create header
const header = document.createElement('div');
header.className = 'header';
header.innerHTML = `
    <h1>Amazon Warehouses in NYC</h1>
    <p class="description">This map uses NYC property tax lots and Google Maps designations to explore and visualize the impacts of Amazon warehouses in NYC.</p>
    <p class="call-to-action">Click the markers to understand how large these warehouses are!</p>
`;

document.body.appendChild(header);