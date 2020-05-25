- [Setup](#setup)
- [Create Markers from Geo Coordinates](#create-markers-from-geo-coordinates)
  - [From Markup](#from-markup)
  - [From Array](#from-array)

## Setup

#### 1. Add a div for displaying the map.

```html
<div id="map"></div>
```

You can now feel free to size it via css.

> **NOTE:** by default an empty div has a size of 0 so make sure to set a height attribute.

#### 2. Import '**_ez-gmaps.js_**'

```html
<script src="/ez-gmaps.js"></script>
```

#### 3. Add a script tag to define the map

The Google Maps API uses a callback function called _initMap()_ to send the map data to the google server.  
Inside the _initMap()_ function you can put the _ez-gmaps.js_ code. All functions need to be called on the **ezMap** object.  
Initially call the _createMap()_ function, to see your map beeing displayed in the div tag.

#### createMap() Parameters

| parameter   | description                                             |
| ----------- | ------------------------------------------------------- |
| zoom        | Map zoom level from **1** (World) to **20** (Buildings) |
| coordinates | Initial map location (**latitude** and **longitude**)   |
| id          | div id of google map (step 1)                           |
| icon        | replaces default map marker (_OPTIONAL_)                |

```html
<script>
  // callback function to send map data to the google server
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

#### 4. Import the Google Maps API

> You need to repalce **YOUR_API_KEY** with an actual API key from your Google Dev Account.  
> [More information ](https://developers.google.com/maps/documentation/javascript/get-api-key)

```html
<script
  src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"
  async
  defer
></script>
```

## Create Markers from Geo Coordinates

In order to create a marker from geo coordinates it needs the attributes for **latitude** and **longitude**

#### Required Attributes

| attribute | description |
| --------- | ----------- |
| lat       | latitude    |
| lng       | longitude   |

That's all the API **needs** to display them.  
There are however additional optional attributes to customize a marker

#### Optional Attributes

| attribute  | description                                                |
| ---------- | ---------------------------------------------------------- |
| icon       | Custom icon beeing only displayed for that specific marker |
| iconActive | Optional icon that displays on active state                |
| isActive   | Boolean for active state changing                          |
| title      | Title beeing displayed on click                            |
| content    | Content beeing displayed on click                          |

### From Markup

One way to create google maps marker with _ez-gmaps_ is by adding them as data attributes in a div tag.
This might be usefull when having corresponding information to a maps marker in your html markup.

Add a div container with an id (e.g. 'markers').

```html
<div id="markers">
  . . .
</div>
```

All items in 'markers' will now be added as markers on your google map.
For that to happen, each marker needs the lat lng attributes as stated above.  
In this case: **data-lat** and **data-lng**  
By default that's all you need to make it work

```html
<div id="markers">
  <div data-lat="50.885996456" data-lng="7.053166454">Porz</div>
  <div data-lat="50.89355" data-lng=" 6.99043 ">Rodenkirchen</div>
</div>
```

You can also define additional attributes the same way

```html
<div
  data-lat="50.967121"
  data-lng="6.889075"
  data-icon="/img/icon-special.svg"
  data-title="Nice title"
  data-content="Some very intersting stuff"
></div>
```

To add your markers to the map, call the _*loadInMarkersFromMarkup()*_ function below the _createMap()_ call and give it the _markers_ div id as a paramenter.

```html
<script>
  function initMap() {
    ezMap.createMap(
      .
      .
      .
    );

    ezMap.loadInMarkersFromMarkup('markers');

  }
</script>
```

That's it! Now your markers should show up on the map.

### From Array

Of course you can also add markers by defining them in an array with the **latitude** and **longitude** coordinates like this:

```javascript
const markers = [
  {
    coords: { lat: 50.885996456, lng: 7.053166454 },
  },
  {
    coords: { lat: 50.89355, lng: 6.99043 },
  },
];
```

Also with special attributes:

```javascript
const markers = [
  {
    title: 'Some nice place',
    content: "That's where the party starts!",
    coords: { lat: 50.885996456, lng: 7.053166454 },
    icon: '/img/icon-special.svg',
  },
  {
    coords: { lat: 50.89355, lng: 6.99043 },
  },
];
```

To add your markers to the map, call the _*loadInMarkersFromArray()*_ function below the _createMap()_ call and give it the _markers_ array as a paramenter.

```html
<script>
  function initMap() {
    ezMap.createMap(
      .
      .
      .
    );

    ezMap.loadInMarkersFromArray(markers);

  }
</script>
```

That's it! Now your markers should show up on the map.
