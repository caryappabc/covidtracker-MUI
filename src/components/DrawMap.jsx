import React from "react";
import { MapContainer as LeafletMap, TileLayer } from "react-leaflet";
import "./DrawMap.css";
import { showData } from "../utils";

function DrawMap({ countries, casesType, center, zoom }) {
	return (
		<div className="map">
			<LeafletMap center={center} zoom={zoom}>
				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				/>
				{showData(countries, casesType)}
			</LeafletMap>
		</div>
	);
}

export default DrawMap;
