import React, { Component } from "react";
import { compose, withProps } from "recompose";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker} from "react-google-maps";
import MapIcon from "../../assets/img/mapMarker.jpg"
const { MarkerWithLabel } = require("react-google-maps/lib/components/addons/MarkerWithLabel");
const dotenv = require('dotenv');

const APIKEY = process.env.REACT_APP_GOOGLE_API_KEY;

    

const MyMapComponent = compose(
    withProps({
      /**
       * Note: create and replace your own key in the Google console.
       * https://console.developers.google.com/apis/dashboard
       * The key "AIzaSyBkNaAGLEVq0YLQMi-PYEMabFeREadYe1Q" can be ONLY used in this sandbox (no forked).
       */
      googleMapURL:
        "https://maps.googleapis.com/maps/api/js?key="+APIKEY+"&v=3.exp&libraries=geometry,drawing,places",
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `100%` }} />,
      mapElement: <div style={{ height: `100%` }} />
    }),
    withScriptjs,
    withGoogleMap
  )(props => (
    <GoogleMap defaultZoom={9} defaultCenter={{ lat: 39.09814, lng: -94.62191 }}>

    
        {

            props.markerArray.map((result,index) => {
                return <Marker
                key={index}
                title={"The markers title"}
                name={"SOMA"}
                position={{lat: result.lat, lng : result.lng}}
                onClick= {() => props.getMarker(result)}
                />
            })

        }
     
    </GoogleMap>
  ));

  export default MyMapComponent;
 