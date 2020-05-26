const ezMap = {
  map: '',
  markers: [],
  imgURL: undefined,
  apiURL: 'https://maps.googleapis.com/maps/api/geocode/json',
  apiKey: '',
  address: '',
  response: undefined,
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
  markerBoilerPlate(markerImport, coords) {
    return {
      icon: markerImport.dataset.icon ? markerImport.dataset.icon : this.imgURL,
      iconActive: markerImport.dataset.iconactive,
      isActive: markerImport.dataset.isactive === 'true' ? true : false,
      title: markerImport.dataset.title,
      content: markerImport.dataset.content,
      coords: coords,
    };
  },
  loadInMarkersFromMarkup(id) {
    const markersImport = document.getElementById(id).children;
    Array.from(markersImport).forEach((markerImport) => {
      if (markerImport.dataset.address) {
        this.address = { location: markerImport.dataset.address };
        APIRequest(formatURL(this.apiURL, this.address, this.apiKey))
          .then((posts) => {
            const responseData = JSON.parse(posts.response);
            this.response = responseData.results[0].geometry.location;
            this.markers.push(
              this.markerBoilerPlate(markerImport, {
                lat: this.response.lat,
                lng: this.response.lng,
              })
            );
          })
          .then(() => {
            this.generateMarkers(this.markers);
          })
          .catch((error) => console.log('oh no!', error));
      } else {
        this.markers.push(
          this.markerBoilerPlate(markerImport, {
            lat: parseFloat(markerImport.dataset.lat),
            lng: parseFloat(markerImport.dataset.lng),
          })
        );
      }
    });
    this.generateMarkers(this.markers);
  },
  createMarkerContent(title, content) {
    return `<b>${title}</b></br><p>${content}</p>`;
  },
  setAPIKey(apiKey) {
    this.apiKey = apiKey;
  },
};
const formatURL = (url, address, apiKey) => {
  return `${url}?address=${address.location}&key=${apiKey}`;
};
function APIRequest(url, method) {
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
}
