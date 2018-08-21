import React, { Component } from 'react';
import fetchJsonp from 'fetch-jsonp';

import logo from './logo.svg';
import axios from 'axios' ;
import './App.css';

import * as dataLocations from './locations.json';
import FilterLocations from './FilterLocations';
import InfoWindow from './InfoWindow';


class App extends Component {

  state = {

    venues : [],
    locations: dataLocations,
    map: '',
    markers: [],
    infoWindowIsOpen: false,
    currentMarker: {},
    infoContent: ''


  }

  componentDidMount(){
    this.getVenues()
   
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
      near : "Helsinki",
      v : "20180323",
      
    
    }

    axios.get( endPoint + new URLSearchParams(parameters))
    .then(response => {
      this.setState({
        venues : response.data.response.groups[0].items
     } , this.renderMap())
      console.log(response.data.response.groups[0].items)
    })
    .catch(error => {
      console.log("Error!!" + error)
    })

  }



  // Create a map
  initMap = () => {
    let controlledThis = this;
    const { locations, markers } = this.state;


    var map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 60.1699, lng: 24.9384},
      zoom: 8
    })
        /*
       // Create a info window
       
      var infowindow = new window.google.maps.InfoWindow({
      }); 

      

    //Display dynamic markers
    this.state.venues.map( myVenue => {


      var contentString = `${myVenue.venue.name}`

    
      // Create a Marker
      var marker = new window.google.maps.Marker({
        position: {lat: myVenue.venue.location.lat, lng: myVenue.venue.location.lng},
        map: map,
        title: myVenue.venue.name,
        animation: window.google.maps.Animation.DROP,
        
      });



      //Click on a marker!
      marker.addListener('click', function() {

        //Change the content
        infowindow.setContent(contentString)

        //Open an info window
        infowindow.open(map, marker);
      });

    }) */

    /* Keep state in sync */
    this.setState({
      map
    });

    /* Create a marker for each location in the locations.json file */
    for (let i = 0; i < locations.length; i++) {
      /* Define the values of the properties */
      var obj = locations[i];
      
      /* Create the marker itself */
      var marker = new window.google.maps.Marker({
        map: map,
        position: new window.google.maps.LatLng(obj.latitude, obj.longtitude),
        title: obj.title,
        id: obj.id
      });

      /* Get those markers into the state */
      markers.push(marker);

      /* Open infoWindow when click on the marker */
      marker.addListener('click', function () {
        controlledThis.openInfoWindow(marker);
      });
    }

    }
  
   

    openInfoWindow = (marker) => {
      this.setState({
        infoWindowIsOpen: true,
        currentMarker: marker
      });
     
    }

      closeInfoWindow = () => {
        this.setState({
          infoWindowIsOpen: false,
          currentMarker: {}
        });

  }



  render() {
    return (
      <div className="App">

        <FilterLocations
          locationsList={this.state.locations}
          markers={this.state.markers}
          openInfoWindow={this.openInfoWindow}
        />
       
        <div id="map" role="application"></div>
      </div>
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
