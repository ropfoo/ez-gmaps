## Create Markers

### From Markup (work in progress)

Add a div container like 'markers'.

```html
<div id="markers">
  . . .
</div>
```

All items in 'markers' will be added as markers on your google map.
When generated from markup (html), each marker needs two coordinates as data attributes.  
In this case: **data-lat** and **data-lng**  
By default that's all you need to make it work

```html
<div id="markers">
  <div data-lat="50.885996456" data-lng="7.053166454">Porz</div>
  <div data-lat="50.89355" data-lng=" 6.99043 ">Rodenkirchen</div>
</div>
```

However you can also define additional attributes like a special icon or some text that's beeing displayed when clicking on the marker.

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
