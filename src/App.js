import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios' ;
import './App.css';


class App extends Component {

  componentDidMount(){
    this.renderMap()
  }

  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyBzyfjDfHwXK3fudwozn1eoCPSgSSv4KrA&callback=initMap")
    window.initMap = this.initMap
  }

  getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore"
    const parameters = {
      client_id : "" ,
      client_secret : "" ,
      query : "food",
      near : "Sydney"
    }

    axios.get( endPoint + new URLSearchParams(parameters))

  }

  initMap = () => {
    var map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });
  }



  render() {
    return (
      <main>
      <div id="map"></div>
      </main>
    );
  }
}


/*

<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"
    async defer></script>

    */

function loadScript(url){
  var index = window.document.getElementsByTagName("script")[0]
  var script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script,index)


}   


export default App;
