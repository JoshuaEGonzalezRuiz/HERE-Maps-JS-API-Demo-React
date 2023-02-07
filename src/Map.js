import React from "react";
import H from "@here/maps-api-for-javascript";
import onResize from "simple-element-resize-detector";

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    // the reference to the container
    this.ref = React.createRef();
    // reference to the map
    this.map = null;
  }

  componentDidMount() {
    if (!this.map) {
      // instantiate a platform, default layers and a map as usual
      const platform = new H.service.Platform({
        apikey: "YOUR_API_KEY",
      });
      const layers = platform.createDefaultLayers();
      const map = new H.Map(this.ref.current, layers.vector.normal.map, {
        pixelRatio: window.devicePixelRatio,
        center: { lat: 0, lng: 0 },
        zoom: 2,
      });
      onResize(this.ref.current, () => {
        map.getViewPort().resize();
      });

      const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

      const ui = H.ui.UI.createDefault(map, layers, "es-ES");

      this.map = map;
    }
  }

  render() {
    return (
      <div
        style={{
          margin: "0px",
          width: "100%",
          height: "100%",
          position: "fixed",
          top: "0px",
          right: "0px",
          bottom: "0px",
          left: "0px",
        }}
        ref={this.ref}
      />
    );
  }
}
