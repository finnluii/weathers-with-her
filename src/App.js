import React from 'react';
import './App.css';

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
    // this.state = {
    //   city: '',
    //   // country: '',
    // };

    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(event) {
    // console.log("hello we're in handleChange()")
    console.log("I'm here.");
    console.log("hello" + event.target.value);
    // this.setState({city: event.target.value});

  }


  async getWeather(event) {
    // Don't refresh page
    event.preventDefault();

    const city = event.target.elements.city.value;
    const country = event.target.elements.country.value;
    var found = false;
    // Get cityID from city name
    const data = require('./city.list.json');
    
    for (var i=0; i<data.length; i++) {
      if (data[i].name.toLowerCase() == city.toLowerCase() && 
        data[i].country.toLowerCase() == country.toLowerCase()){
        found = true;
        var cityId = data[i].id;
        console.log(cityId);

        // alert('The city ' + this.state.city + ' has been submitted!');
      }
    }

    // TODO: update status "Are you sure the input is right?"
    // if (found == false) {

    // }

    const api_call = await fetch('http://api.openweathermap.org/data/2.5/forecast?id='
          + cityId
          +'&appid=d801e2c4e7af34945bff26d22936710b');
    const response = await api_call.json();
    console.log(response);
    


    
    
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
      
      <Weather/> 
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
