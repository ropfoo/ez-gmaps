### Setup

### From Markup

```html
<div
  data-lat="50.967121"
  data-lng="6.889075"
  data-icon="/img/icon-special.svg"
  data-title="Nice title"
  data-content="Some very intersting stuff"
></div>
```

```javascript
function initMap() {
  // create Map (zoom, start coordinates, document map id, default icon (optional))
  ezMap.createMap(
    11, // <- zoom level
    {
      lat: 50.9375, // <- start lat
      lng: 6.9603, // <- start long
    },
    'map', // <- id of google maps div
    '/img/icon-default.svg' // <- (OPTIONAL) - set own default icon
  );

  ezMap.loadInMarkersFromMarkup('markers');
}
```
