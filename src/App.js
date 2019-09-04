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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(event) {
    this.setState({location: event.target.value});


  }

  handleSubmit(event) {
    alert('The city ' + this.state.location + ' has been submitted!');
    event.preventDefault();
  }

  render() {
  return (
    <div>
      <h1> It's the weather. </h1>
      <form onSubmit={this.handleSubmit}>
        <label>
          City:
          <input type="text" name="title" value={this.state.location} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Find the weather for my city!"/>
      </form>
      


      <div className="weatherBlock">
        <div className="weatherInfo">
            <InfoBoard className="weatherInfo"/>
        </div>
        <div className="weatherInfo">
            <InfoBoard/>
        </div>
        <div className="weatherInfo">
            <InfoBoard/>
        </div>
        <div className="weatherInfo">
            <InfoBoard/>
        </div>
        <div className="weatherInfo">
            <InfoBoard/>
        </div>
        <div className="weatherInfo">
            <InfoBoard/>
        </div>
        <div className="weatherInfo">
            <InfoBoard/>
        </div>
      </div>
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
