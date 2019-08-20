import React from 'react';
import './App.css';

class InfoBoard extends React.Component {
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
  render() {
  return (
    <div>
      <h1> It's the weather. </h1>
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
