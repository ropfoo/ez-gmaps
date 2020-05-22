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
  addMarker(coords, icon, iconActive, title, content, active) {
    const marker = new google.maps.Marker({
      position: coords,
      map: this.map,
      active: active,
      icon: icon,
      iconActive: iconActive,
    });
    if (content) {
      const infoWindow = new google.maps.InfoWindow({
        content: this.createMarkerContent(title, content),
      });
      marker.addListener('click', () => {
        infoWindow.open(this.map, marker);
      });
    }
    if (iconActive) {
      marker.addListener('click', () => {
        active ? marker.setIcon(iconActive) : marker.setIcon(icon);
        active = !active;
      });
    }
  },
  //addMarkerFromAdress() {},
  generateMarkers(markers) {
    markers.forEach((marker) => {
      this.addMarker(
        marker.coords,
        marker.icon,
        marker.iconActive,
        marker.title,
        marker.content
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
    return `<h2>${title}</h2></br><p>${content}</p>`;
  },
};
