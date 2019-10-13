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
      <div className="weatherBlock">
        <div>
        {
          // Check if there is valid input before displaying weather info
        } {

          this.props.code &&
          <img src={"http://openweathermap.org/img/wn/"+ this.props.code + "@2x.png"} alt="weather icon"/>
        } {
          this.props.city && 
          <p> <span> City: </span> {this.props.city}</p>
        } {
          this.props.country &&
          <p> Country: {this.props.country}</p>
        } {
          this.props.temperature &&
          <p>Temperature: {this.props.temperature}°</p>
        } {
          this.props.humidity && 
          <p> Humidity: {this.props.humidity}</p>
        } {
          this.props.low &&
          <p>Low: {this.props.low}°</p>
        } {
          this.props.high &&
          <p>High: {this.props.high}°</p>
        } {
          this.props.description &&
          <div>
            <p>Description: {this.props.description}</p>
          </div>
        } {
          this.props.error &&
          <p>{this.props.error}</p>
        } 
        </div>
      </div>
      );
  }
}

class Checklist extends React.Component {
  render() {
    // Create checklist
    return null;
  }

  createList() {}
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

  // // Use arrow function to bind the function
  // async getWeather(event) {

  // Bind 'this' to its context, otherwise this (during setState) is null.
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
        console.log(response.weather[0].icon);

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
  //   alert('The city ' + this.state.city + ' has been submitted!');
  //   event.preventDefault();
  // }

  

  render() {
  return (
    <div>
      <h1> Hey, Mother Nature. What should I wear today? </h1>
      {
      //    Note: do this instead of calling this.getWeather() (will get Type Error),
      // Difference is: this.getWeather() = calling the function immediately.
      // this.getWeather = passing the reference of the function to call on submit.
      
      }
      <form onSubmit={this.getWeather}>
        <label>
        
          <input type="text" name="city" placeholder="City"
          />

          <input type="text" name="country" placeholder="Country" 
          />
        
        </label>
        <input type="submit" value="Find the weather for my city!"/>
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

      <Checklist
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
