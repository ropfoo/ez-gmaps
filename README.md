## Setup

1. The first step is to add a div for displaying the map.

```html
<!-- Google Map -->
<div id="map"></div>
<!-- ---------------- -->
```

You cann now feel free to size it via css.

> NOTE: By default an empty div has a size of 0 so make sure to set a height attribte.

2. Import _ez-gmaps.js_

```html
<script src="/ez-gmaps.js"></script>
```

3. Add a script tag to define the map

```html
<script>
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
  }
</script>
```

4. Import the Google Maps API

> You need to repalce **YOUR_API_KEY** with an actual API key from your Google Dev Account.
> [More information ](https://developers.google.com/maps/documentation/javascript/get-api-key)

```html
<script
  src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"
  async
  defer
></script>
```

### Create Markers wth Geo Coordinates

#### From Markup

One way to create google maps marker with _ez-gmaps_ is by adding them as data attributes in a div tag.
This might be usefull when having corresponding information to a maps marker in your html markup.

Add a div container with an id (e.g. 'markers').

```html
<div id="markers">
  . . .
</div>
```

All items in 'markers' will now be added as markers on your google map.
For that to happen, each marker needs two coordinates as data attributes (latitude and longitude).  
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

#### From Array

You can also add markers by defining them in an array like this with the **latitude** and **longitude** coordinates like this:
