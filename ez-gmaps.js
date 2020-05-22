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
  addMarker(coords, icon, title, content) {
    const marker = new google.maps.Marker({
      position: coords,
      map: this.map,
      icon: icon,
    });
    if (content) {
      const infoWindow = new google.maps.InfoWindow({
        content: this.createMarkerConent(title, content),
      });
      marker.addListener('click', () => {
        infoWindow.open(this.map, marker);
      });
    }
  },
  //addMarkerFromAdress() {},
  generateMarkers(markers) {
    markers.forEach((marker) => {
      this.addMarker(marker.coords, marker.icon, marker.title, marker.content);
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
  createMarkerConent(title, content) {
    return `<h2>${title}</h2></br><p>${content}</p>`;
  },
};
