mapboxgl.accessToken = 'pk.eyJ1IjoicmZveGFsbDMiLCJhIjoiY21uaTJ1emlwMDlkNDJwcHV0YXVxNHZlbCJ9.w9o60UF7L6nwMqTGzWGu0w';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/standard',
    config: {
      basemap: {
      showPedestrianRoads: false,
      showPointOfInterestLabels: false,
      showTransitLabels: false,
      show3dTrees: false,
      show3dLandmarks: false,
      showLandmarkIconLabels: false,
      showIndoorLabels: false
      }
    },
    center: [-73.97912, 40.71802],
    zoom: 10.05
});

const operatorColors = {
  'UPS': '#FFC400',
  'FedEx': '#4D148C',
  'Amazon': '#FD6100'
};

function buildPopupHTML(props) {
  // Build the popup table when a location is clicked
  // Also defines what information will be included
  // Structure of the function built by Claude and improved by me
  // Restyling of text/numbers built by Claude
  const rows = [
    ['Address', props.Address, v => v.toLowerCase().replace(/\b\w/g, c => c.toUpperCase())],
    ['Operator', props.OPERATOR],
    ['Lot Area', props.LotArea, v => `${Number(v).toLocaleString()} square feet`],
    ['Council District', props.Council]
  ];
  const rowsHTML = rows
    .filter(([, val]) => val != null) // skip missing fields
    .map(([label, val, fmt]) => `
        <tr>
          <td>${label}</td>
          <td>${fmt ? fmt(val) : val}</td>
        </tr>`)
    .join('');

  return `
      <div class="popup-header"><b>Warehouse Statistics</b></div>
      <table class="popup-table"><tbody>${rowsHTML}</tbody></table>
    `;
}

// Add zoom and other navigational controls to the map
map.addControl(new mapboxgl.NavigationControl());

// Data source: NYC PLUTO dataset, filtered to warehouse landuse type over 50k square feet and owner validated in Google Maps
// Tool for converting CSV to JSON: https://www.geeksforgeeks.org/utilities/csv-to-json-converter/ 
map.on('load', () => {
  map.addSource('all-warehouses', {
    type: 'geojson',
    data: './data/big3_coded.geojson'
  });
  
  map.addLayer({
        id: 'all-warehouses-fill',
        type: 'fill',
        source: 'all-warehouses',
        layout: {},
        paint: {
          'fill-color': ['match', ['get', 'OPERATOR'],
          'UPS', '#FFC400',
          'FedEx', '#4D148C',
          'Amazon', '#FD6100',
          'grey'// otherwise
          ],
          'fill-opacity': 0.5
        }
  });

// Add a black outline around the polygon
    map.addLayer({
      'id': 'outline',
      'type': 'line',
      'source': 'all-warehouses',
      'layout': {},
      'paint': {
        'line-color': 'grey',
        'line-width': 0.75
      }
    });
  // TODO Add a fill layer that changes the color a bit on hover

  // When someone clicks on a warehouse, open a popup at the location of the feature, with description HTML from its properties.
  // From MapBox example: https://docs.mapbox.com/mapbox-gl-js/example/popup-on-click/
  // HTML table popup added via Claude output
  map.addInteraction('warehouse-click-interaction', {
    type: 'click',
    target: { layerId: 'all-warehouses-fill' },
    handler: (e) => {
      // Copy coordinates array and information for the table
      // const coordinates = e.feature.geometry.coordinates.slice();
      const props = e.feature.properties;

      new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(buildPopupHTML(props))
        .addTo(map);
    }
  })
})

// DEPRECATED: MARKERS

// markerData.forEach((marker) => {
//     new mapboxgl.Marker({
//         color: boroughColors[marker.Borough]
//     })
//         .setLngLat([marker.Longitude, marker.Latitude])
//         .setPopup(
//             new mapboxgl.Popup({ offset: 25 })
//                 .setText(`This property is ${marker.LotArea} sq ft, was first built in ${marker.YearBuilt}, and is located at ${marker.Address}.`)
//         )
//         .addTo(map);
// });

// TODO create feature such that, when a marker is clicked, the map zooms in and changes the pitch to show nearby buildings
// preferred settings - bearing: 0 (due north), pitch: 71.50
// and, when the popup is closed, the map will zoom back out and reset the pitch to be flat
// TODO: check bearing relative to compass

// Create legend
const legend = document.createElement('div');
legend.className = 'legend';
legend.innerHTML = '<h4>Distribution Companies</h4>';

Object.entries(operatorColors).forEach(([operator, color]) => {
    const item = document.createElement('div');
    item.className = 'legend-item';
    item.innerHTML = `
        <span class="legend-circle" style="background-color: ${color}"></span>
        <span class="legend-label">${operator}</span>
    `;
    legend.appendChild(item);
});

document.body.appendChild(legend);

// Create header with information about this map and how it can be used
// Create header
const header = document.createElement('div');
header.className = 'header';
header.innerHTML = `
    <h1>Where does your package come from?</h1>
    <p class="description">Delivery distribution companies like Amazon, UPS, and FedEx deliver millions of packages each day. But where do these packages get sorted and processed, and which communities are most impacted by these operations?</p>
    <p class="call-to-action">Click the site footprints to learn more about warehouses in your community.</p>
`;

document.body.appendChild(header);