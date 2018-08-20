import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios' ;
import './App.css';


class App extends Component {

  state = {

    venues : [],


  }

  componentDidMount(){
    this.getVenues()
    this.renderMap()
  }

  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyBzyfjDfHwXK3fudwozn1eoCPSgSSv4KrA&callback=initMap")
    window.initMap = this.initMap
  }

  getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id : "B1JDVT55UR5DEOP3XTVYBBYIHOPZUA3L0VPHYMPSOW4LDTHM" ,
      client_secret : "5PVPA25PYYLPLAHIM0I4YQJVPDRKBJYVMMG4SAYCFHJIYC21" ,
      query : "food",
      near : "Sydney",
      v : "20180323",
      
    
    }

    axios.get( endPoint + new URLSearchParams(parameters))
    .then(response => {
      this.setState({
        venues : response.data.response.groups[0].items
      })
      console.log(response.data.response.groups[0].items)
    })
    .catch(error => {
      console.log("Error!!" + error)
    })

  }

  initMap = () => {
    var map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    })

    var marker = new google.maps.Marker({
      position: {lat: -34.397, lng: 150.644},
      map: map,
      title: 'Hello World!'
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
