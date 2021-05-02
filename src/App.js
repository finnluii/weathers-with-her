import React from 'react';
import './App.css';
import cookie from "react-cookie";
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
        // TODO: METRIC OR IMPERIAL???
      
        var call_str = 'http://api.openweathermap.org/data/2.5/weather?id='
              + cityId
              +'&appid=d801e2c4e7af34945bff26d22936710b';

        // var call_str = 'http://api.openweathermap.org/data/2.5/weather?' +
        // 'lat=43.582259199999996&lon=-79.683584'+'&appid=d801e2c4e7af34945bff26d22936710b';;

        if (this.state.isMetric) {
          call_str = call_str + "&units=metric";
        } else {
          call_str = call_str + "&units=imperial";
        }

        const api_call = await fetch(call_str)
            .catch(err => alert("Failed promise..."));
      
        
        const response = await api_call.json();
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

  
  getLocation = (event) => {
    // Don't refresh page
    console.log("I clicked.");
    console.log(navigator.geolocation.getCurrentPosition());
    event.preventDefault();
    navigator.geolocation.getCurrentPosition((position) => {
      alert('Longitude: ' + position.coords.longitude
        + ', Latitude: ' + position.coords.latitude);
    })

    var call_str = 'http://api.openweathermap.org/data/2.5/weather?' +
        'lat=43.582259199999996&lon=-79.683584'+
        '&appid=${process.env.REACT_APP_WEATHER_KEY}';;
  }

  render() {
    console.log(navigator.geolocation)
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

        { navigator.geolocation  && <button onClick={this.getLocation}>Find my location!
                </button>}
        {/* <h2>{navigator.geolocation}</h2> */}
        
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
