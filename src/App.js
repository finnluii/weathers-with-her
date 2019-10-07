import React from 'react';
import './App.css';
// import { isoCountries } from './countryCodes.js'

class Location extends React.Component {

}

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
          <p>{this.props.city}</p>
          <p>{this.props.country}</p>
          <p>{this.props.temperature}</p>
          <p>{this.props.humidity}</p>
          <p>{this.props.low}</p>
          <p>{this.props.high}</p>
        </div>
      {
        // <div className="weatherInfo">
        //     <InfoBoard/>
        // </div>
        // <div className="weatherInfo">
        //     <InfoBoard/>
        // </div>
        // <div className="weatherInfo">
        //     <InfoBoard/>
        // </div>
        // <div className="weatherInfo">
        //     <InfoBoard/>
        // </div>
        // <div className="weatherInfo">
        //     <InfoBoard/>
        // </div>
        // <div className="weatherInfo">
        //     <InfoBoard/>
        // </div>
        // <div className="weatherInfo">
        //     <InfoBoard/>
        // </div>
      }
      </div>
      );
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

  // // Below doesn't work because you have to bind the function
  // async getWeather(event) {
  getWeather = async (event) => {

    // Don't refresh page
    event.preventDefault();

    const city = event.target.elements.city.value;
    const country = event.target.elements.country.value;
    var found = false;
    // Get cityID from city name
    const data = require('./city.list.json');
    const countryData = require('./countryCodes.json');
    var isMetric = true;

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

    // TODO: METRIC OR IMPERIAL???

    // TODO: update status "Are you sure the input is right?" error handling
    // if (found == false) {

    // }

    var call_str = 'http://api.openweathermap.org/data/2.5/weather?id='
          + cityId
          +'&appid=d801e2c4e7af34945bff26d22936710b';
    if (isMetric) {
      call_str = call_str + "&units=metric";
    } else {
      call_str = call_str + "&units=imperial";
    }
    const api_call = await fetch(call_str);
    
    const response = await api_call.json();
    // console.log(response.name);

    // Update state
    this.setState({
      city: response.name,
      country: response.sys.country,
      temperature: response.main.temp,
      humidity: response.main.humidity,
      low: response.main.temp_min,
      high: response.main.temp_max,
    });
    



    
    
  }

  // handleSubmit(event) {
  //   alert('The city ' + this.state.city + ' has been submitted!');
  //   event.preventDefault();
  // }

  

  render() {
    /* Note: do this instead of calling this.getWeather() (will get Type Error),
      Difference is: this.getWeather() = calling the function immediately.
      this.getWeather = passing the reference of the function to call on submit.
      */
  return (
    <div>
      <h1> Well, if it isn't the weather. </h1>

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
        /> 
    </div>


    );
}

  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;
