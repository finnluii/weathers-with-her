import React from 'react';
import './App.css';
// import { isoCountries } from './countryCodes.js'

// class Location extends React.Component {

// }

class InfoBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      high: null,
      low: null,
      pop: null,
    }
  }
  render() {
    return(
      <div>
        <ol>HIGH</ol>
        <ol>LOW</ol>
        <ol>P.O.P.</ol>
      </div>
      );
  }
}

class Weather extends React.Component {
  render() {



    return (
      <div id="weatherBlock">
        {
          /* Check if there is valid input before displaying weather info using 
           'Conditional rendering'

          Later, need to check of props is undefined or else when temperature == 0,
          it will return falsy
          */
        } {

          this.props.code &&
          <img src={"http://openweathermap.org/img/wn/"+ this.props.code + "@2x.png"} alt="weather icon"/>
        } {
          this.props.city && 
          <p> <span> <b> City:</b> </span> {this.props.city}</p>
        } {
          this.props.country &&
          <p> <b>Country: </b> {this.props.country}</p>
        } {
          (this.props.temperature != undefined) &&
          <p><b>Temperature:</b>  {this.props.temperature}°C</p>
        } {
          this.props.humidity && 
          <p> <b>Humidity: </b> {this.props.humidity}</p>
        } {
          (this.props.low != undefined) &&
          <p><b>Low: </b> {this.props.low}°C</p>
        } {
          (this.props.high != undefined) &&
          <p><b>High: </b> {this.props.high}°C</p>
        } {
          this.props.description &&
          <div>
            <p><b>Description: </b> {this.props.description}</p>
          </div>
        } {
          this.props.error &&
          <p>{this.props.error}</p>
        } 
      </div>
      );
  }
}

class Checklist extends React.Component {
  // createList() {
  //   // Add items to wear to list depending on range of temperature.
  //   var itemsToBring = [];

  //   // If it's raining, bring an umbrella!
  //   const id = (this.props.id).toString();
  //   var rain_pattern = /^[2,3,5][0-9]{2}$/;
  //   var result = id.match(rain_pattern);
  //   console.log(result);
  //   if (result) { console.log('Bring an umbrella!'); }
  // }

  render() {
    // Always wear sunscreen! Or else the UV rays will give you wrinkles >:(
    if (this.props.id) { 
      var itemsToBring = ["SUNSCREEN!"]; 
    

      // If it's raining, bring an umbrella!
      const id = this.props.id;
      var rain_pattern = /^[2,3,5][0-9]{2}$/;

      if (rain_pattern.test(id)) { 
        itemsToBring.push("Umbrella"); 
      }

      // Add clothes depending on temperature ranges
      const temp = this.props.temperature;
      if (temp >= 25) {
        itemsToBring.push("t-shirt", "shorts/summer, short skirt", "sandals");
      } else if (temp >= 18 && temp < 25) {
        itemsToBring.push("short/long-sleeve t-shirt", "pants/jeans/short-midi skirt");
      } else if (temp >= 10 && temp < 18) {
        itemsToBring.push("sweater/fall jacket", "pants/jeans/midi skirt");
      } else if (temp >= 4 && temp < 10) {
        itemsToBring.push("fall jacket", "sweater", "pants/jeans/warm, long skirt", "booties",
          "winter hat");
      } else if (temp >= -10 && temp < 4) {
        itemsToBring.push("winter jacket", "long-sleeve shirt", "pants/jeans/warm, long skirt", 
          "winter boots", "winter hat");
      } else if (temp < -10) {
        itemsToBring.push("winter jacket", "sweater", "pants/jeans/warm, long skirt", "winter boots",
          "thick socks", "winter hat", "gloves", "scarf");
      }

      console.log(itemsToBring);
      // arrow function
      const checklist = itemsToBring.map((x) => {
        return <div key={x}><p><input type="checkbox"/>{x}</p></div>
      });

      // return checklist
      return (
        <div id="checklist">
          {checklist}
        </div>
        );
    }
    return null;
  }

  
}

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
    const data = require('./city.list.json');
    const countryData = require('./countryCodes.json');
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

        if (this.state.isMetric) {
          call_str = call_str + "&units=metric";
        } else {
          call_str = call_str + "&units=imperial";
        }
        const api_call = await fetch(call_str);
        
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

  // handleSubmit(event) {
    handleSubmit = (event) => {
    event.preventDefault();
    alert('The city ' + this.state.city + ' has been submitted!');
    console.log('handleSubmit')
    
  }

  

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
