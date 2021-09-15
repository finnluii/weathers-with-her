import React, { useState }from 'react';
// import './App.css';
// import cookie from "react-cookie";
import { Button, TextField, Box } from '@material-ui/core';
import Weather from "./Weather";
import Checklist from "./Checklist";

import { createStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles'
import theme from './theme'

function App() {
  // States
  const [allValues, setAllValues] = useState({
    city: undefined,
    country: undefined,
    temperature: undefined,
    humidity: undefined,
    low: undefined,
    high: undefined,
    description: undefined,
    code: undefined,
    id: undefined,
    error: undefined,
    isMetric: true
  });
  const handleChange = (event) => {
    console.log("I'm here.");
    console.log("hello" + event.target.value);
    // this.setState({city: event.target.value});

  }

  /* Declaring the async function like this doesn't bind 'this' to its context/
  when we call getWeather(), it rescopes 'this', so it doesn't know what is 
  this.state/this.props (they're undefined)
  async getWeather(event) {
  , have to bind it in the constructor:
  this.getWeather = this.getWeather.bind(this); */


  // Use arrow function instead, otherwise this (during setState) is null.
  // This works because arrow functions maintain 'this' from their declaring scope, ie the 
  // App component & constructor
  // more info: https://medium.com/@joespinelli_6190/using-arrow-functions-to-avoid-binding-this-in-react-5d7402eec64
  const getWeather = async (event) => {

    // Don't refresh page
    event.preventDefault();

    const city = event.target.elements.city.value;
    const country = event.target.elements.country.value;
    var found = false;
    // Get cityID from city name
    const data = require('./resources/city.list.json');
    const countryData = require('./resources/countryCodes.json');
    if (city && country) {
      // Find country code from country name.
      for (var j=0;j<countryData.length; j++) {
        if (countryData[j].name.toLowerCase() === country.toLowerCase()) {
          var countryCode = countryData[j].code;
          break;
        }
      }

      for (var i=0; i<data.length; i++) {
        if (data[i].name.toLowerCase() === city.toLowerCase() && 
          countryCode &&
          data[i].country.toLowerCase() === countryCode.toLowerCase()){
          found = true;
          var cityId = data[i].id;
          break;
        }
      }
      if (cityId) {

        // save user's city, country so that they don't have to enter their location
        // every time they visit the site: 
        // localStorage data is only cleared when there is some user 
        // intervention/expiration date.  
        localStorage.setItem('savedLocations', 'Tom');
        console.log("localStorage: " + localStorage.getItem('savedLocations'));

        // TODO: METRIC OR IMPERIAL???
      
        var callStr = 'http://api.openweathermap.org/data/2.5/weather?id='
              + cityId
              +`&appid=${process.env.REACT_APP_WEATHER_KEY}`;

        // var callStr = 'http://api.openweathermap.org/data/2.5/weather?' +
        // 'lat=43.582259199999996&lon=-79.683584'+'&appid=${process.env.REACT_APP_WEATHER_KEY}';;

        if (allValues.isMetric) {
          callStr = callStr + "&units=metric";
        } else {
          callStr = callStr + "&units=imperial";
        }

        const apiCall = await fetch(callStr)
            .catch(err => alert("Failed promise..."));
      
        
        const response = await apiCall.json();
        console.log(response);
        // console.log(response.weather[0].icon);

        // TODO: update status "Are you sure the input is right?" error handling
        // Update state
        setAllValues({
          city: response.name,
          country: response.sys.country,
          temperature: response.main.temp,
          humidity: response.main.humidity,
          low: response.main.temp_min,
          high: response.main.temp_max,
          description: response.weather[0].description,
          code: response.weather[0].icon,
          id: response.weather[0].id,
          error: undefined,
        });     
      } else {
        setAllValues({
          city: undefined,
          country: undefined,
          temperature: undefined,
          humidity: undefined,
          low: undefined,
          high: undefined,
          description: undefined,
          code: undefined,
          id: undefined,
          error: "Error. Please make sure your spelling is correct/Enter the full name " +
          "of your city & country!"
        });
      }
    } else {
      setAllValues({
        city: undefined,
        country: undefined,
        temperature: undefined,
        humidity: undefined,
        low: undefined,
        high: undefined,
        description: undefined,
        code: undefined,
        id: undefined,
        error: "Error. Please specify the city and country!"
      });

    }

  };

  // // handleSubmit(event) {
  //   handleSubmit = (event) => {
  //   event.preventDefault();
  //   alert('The city ' + this.state.city + ' has been submitted!');
  //   console.log('handleSubmit')
    
  // }

  
  // getLocation = (event) => {
  //   // Don't refresh page
  //   console.log("I clicked.");
  //   event.preventDefault();
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     alert('Longitude: ' + position.coords.longitude
  //       + ', Latitude: ' + position.coords.latitude);
  //   })

  //   var callStr = 'http://api.openweathermap.org/data/2.5/weather?' +
  //       'lat=${position.coords.latitude}&lon=${position.coords.longitude}'+
  //       '&appid=${process.env.REACT_APP_WEATHER_KEY}';;
  // }

  const saveLocation = (location) => {
    // TODO: Catch if location == null;
    // Save location locally so users don't have to enter location every time
    // they visit.
    console.log('location:' + location);
    if (location == null) {
      return;
    }
    var existingLocations = localStorage.getItem('savedLocations');
    existingLocations.add(location)
    localStorage.setItem('savedLocations', existingLocations);
    // console.log("localStorage: " + localStorage.getItem('savedLocations'));

  }

  // componentDidMount() {
  //   // Check that current position has been enabled. 
  // Edit: This is BUGGY. the permissions API may not always work since
  // OS level permissions may prevent this code from accessing the geolocation
  // permissions, even if the browser itself allows it. For ex. This didn't
  // work on Mac if you don't allow browsers from tracking you from 
  // System Preferences. 
  //   console.log("I'm in componentDidMount()")
  //   navigator.permissions.query({name:'geolocation'}).then(result => {
  //     console.log("result.state: ")
  //     console.log(result.state)
  //     if (result.state == "granted") {
  //       this.setState({geolocation: true});
  //     } else if (result.state == "denied") {
  //       this.setState({Geolocation: false});
  //     } 
  //   });
  // }

  // createStyles({
  //   input: {
  //     margin: theme.spacing(1),
  //     height: 38
  //   }
  // })

  const useStyles = makeStyles((theme) =>
    createStyles({
      root: {
        margin: theme.spacing(1),
        height: 38
      }
    })
  );

  const classes = useStyles();

  console.log(classes.root);
  return (
    <ThemeProvider theme={theme}>
      <div id="main">
        <h1> Hey, Mother Nature. What should I wear today? </h1>
        {
        //    Note: do this instead of calling this.getWeather() (will get Type Error),
        // Difference is: this.getWeather() = calling the function immediately.
        // this.getWeather = passing the reference of the function to call on submit.
        
        }
        <form onSubmit={getWeather}>
          <label id="locationInput">
            <TextField id="filled-basic" label="City" variant="filled" name="city"/>
            <TextField id="filled-basic" label="Country" variant="filled" name="country"/>
            <Button variant="contained" color="primary" type="submit">
              Search
            </Button>
          
          </label>
        </form>


        <Box bgcolor="secondary.main" color="primary.contrastText" p={2}>
          primary.main
        </Box>

        <Button 
          onClick={() => saveLocation('test')} 
          color="primary" 
          variant="contained">Save Location</Button>
        
        <Weather
          city={allValues.city}
          country={allValues.country}
          temperature={allValues.temperature}
          humidity={allValues.humidity}
          low={allValues.low}
          high={allValues.high}
          description={allValues.description}
          code={allValues.code}
          error={allValues.error}
        /> 

        <Checklist id="checklist"
          temperature={allValues.temperature}
          humidity={allValues.humidity}
          low={allValues.low}
          high={allValues.high}
          id={allValues.id}
        />
      </div>
    </ThemeProvider>
  );
}


export default App;
