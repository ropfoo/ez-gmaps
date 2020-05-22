const ezMap = {
  map: '',
  markers: [],
  imgURL: undefined,
  createMap(zoom, centerCoords, id, imgURL = undefined) {
    this.imgURL = imgURL;

    this.map = new google.maps.Map(document.getElementById(id), {
      zoom: zoom,
      center: centerCoords,
    });
  },
  addMarker(coords, icon, content) {
    const marker = new google.maps.Marker({
      position: coords,
      map: this.map,
      icon: icon,
    });
    if (content) {
      const infoWindow = new google.maps.InfoWindow({
        content: content,
      });
      marker.addListener('click', () => {
        infoWindow.open(this.map, marker);
      });
    }
  },
  addMarkerFromAdress() {},
  generateMarkersFromArray(markers) {
    markers.forEach((marker) => {
      this.addMarker(marker.coords, marker.icon, marker.content);
    });
  },
  loadInMarkersFromMarkup(id) {
    const markersImport = document.getElementById(id).children;
    Array.from(markersImport).forEach((markerImport) => {
      this.markers.push({
        icon: markerImport.dataset.icon
          ? markerImport.dataset.icon
          : this.imgURL,
        content: markerImport.dataset.content
          ? this.createMarkerConent(
              markerImport.dataset.title,
              markerImport.dataset.content
            )
          : null,
        coords: {
          lat: parseFloat(markerImport.dataset.lat),
          lng: parseFloat(markerImport.dataset.lng),
        },
      });
    });
    this.generateMarkersFromArray(this.markers);
  },
  createMarkerConent(title, content) {
    return `<h2>${title}</h2></br><p>${content}</p>`;
  },
};
