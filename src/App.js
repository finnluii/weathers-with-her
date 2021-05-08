import React from 'react';
import './App.css';
// import cookie from "react-cookie";
import Weather from "./Weather";
import Checklist from "./Checklist";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      isMetric: true,
    };

    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(event) {
    // console.log("hello we're in handleChange()")
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
  getWeather = async (event) => {

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

        if (this.state.isMetric) {
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
        this.setState({
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
        this.setState({
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
          "of your city & country!",
        });
      }
    } else {
      this.setState({
        city: undefined,
        country: undefined,
        temperature: undefined,
        humidity: undefined,
        low: undefined,
        high: undefined,
        description: undefined,
        code: undefined,
        id: undefined,
        error: "Error. Please specify the city and country!",
      });
    }

  }

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

  saveLocation = (location) => {
    // Save location locally so users don't have to enter location every time
    // they visit.
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

  render() {
    return (
      <div id="main">
        <h1> Hey, Mother Nature. What should I wear today? </h1>
        {
        //    Note: do this instead of calling this.getWeather() (will get Type Error),
        // Difference is: this.getWeather() = calling the function immediately.
        // this.getWeather = passing the reference of the function to call on submit.
        
        }
        <form onSubmit={this.getWeather}>
          <label id="locationInput">
          
            <input class="inputBox" type="text" name="city" placeholder="City..."
            />

            <input class="inputBox" type="text" name="country" placeholder="Country..." 
            />

            <input id="findWeatherButton" type="submit" value="Search"/>
           
          </label>
        </form>

        <button onClick={() => this.saveLocation('test')}>Save Location</button>
        
        <Weather
          city={this.state.city}
          country={this.state.country}
          temperature={this.state.temperature}
          humidity={this.state.humidity}
          low={this.state.low}
          high={this.state.high}
          description={this.state.description}
          code={this.state.code}
          error={this.state.error}
        /> 

        <Checklist id="checklist"
          temperature={this.state.temperature}
          humidity={this.state.humidity}
          low={this.state.low}
          high={this.state.high}
          id={this.state.id}
        />
      </div>

    );
  }

}

export default App;
