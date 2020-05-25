const ezMap = {
  map: '',
  markers: [],
  imgURL: undefined,
  apiURL: 'https://maps.googleapis.com/maps/api/geocode/json',
  apiKey: '',
  address: '',
  response: '',
  createMap(zoom, centerCoords, id, imgURL = undefined) {
    this.imgURL = imgURL;

    this.map = new google.maps.Map(document.getElementById(id), {
      zoom: zoom,
      center: centerCoords,
    });
  },
  addMarker(coords, icon, iconActive, title, content, active) {
    const marker = new google.maps.Marker({
      position: coords,
      map: this.map,
      active: active,
      iconActive: iconActive,
      icon: active ? iconActive : icon,
    });
    const infoWindow = new google.maps.InfoWindow({
      content: this.createMarkerContent(title, content),
    });

    google.maps.event.addListener(infoWindow, 'closeclick', function () {
      marker.setIcon(icon);
      active = false;
    });
    if (iconActive) {
      marker.addListener('mouseover', () => {
        marker.setIcon(iconActive);
      });
      marker.addListener('mouseout', () => {
        active ? '' : marker.setIcon(icon);
      });
      marker.addListener('click', () => {
        active = !active;
        if (active) {
          marker.setIcon(iconActive);
          infoWindow.open(this.map, marker);
        } else {
          marker.setIcon(icon);
          infoWindow.close();
        }
      });
    }
  },
  addMarkerFromAddress(address, apiKey) {
    this.address = address;
    this.apiKey = apiKey;
    APIRequest(formatURL(this.apiURL, this.address, this.apiKey))
      .then((posts) => {
        const responseData = JSON.parse(posts.response);
        this.response = responseData.results[0].geometry.location;
        console.log(this.response);
      })
      .catch((error) => console.log('oh no!', error));
  },
  generateMarkers(markers) {
    markers.forEach((marker) => {
      this.addMarker(
        marker.coords,
        marker.icon,
        marker.iconActive,
        marker.title,
        marker.content,
        marker.isActive
      );
    });
  },
  loadInMarkersFromArray(markers) {
    markers.forEach((marker) => {
      this.markers.push(marker);
    });
    this.generateMarkers(this.markers);
  },
  loadInMarkersFromMarkup(id) {
    const markersImport = document.getElementById(id).children;
    Array.from(markersImport).forEach((markerImport) => {
      this.markers.push({
        icon: markerImport.dataset.icon
          ? markerImport.dataset.icon
          : this.imgURL,
        iconActive: markerImport.dataset.iconactive,
        isActive: markerImport.dataset.isactive === 'true' ? true : false,
        title: markerImport.dataset.title,
        content: markerImport.dataset.content,
        coords: {
          lat: parseFloat(markerImport.dataset.lat),
          lng: parseFloat(markerImport.dataset.lng),
        },
      });
    });
    this.generateMarkers(this.markers);
  },
  createMarkerContent(title, content) {
    return `<b>${title}</b></br><p>${content}</p>`;
  },
};

const formatURL = (url, address, apiKey) => {
  return `${url}?address=${address.cityName}&key=${apiKey}`;
};

const APIRequest = (url, method) => {
  const request = new XMLHttpRequest();
  return new Promise((resolve, reject) => {
    request.onreadystatechange = () => {
      if (request.readyState !== 4) return;
      if (request.status >= 200 && request.status < 300) {
        resolve(request);
      } else {
        reject({ status: request.status, statusTest: request.statusText });
      }
    };
    request.open(method || 'GET', url, true);
    request.send();
  });
};
