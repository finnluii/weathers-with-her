import React from 'react';


class Weather extends React.Component {
  render() {
    return (
      <div bgcolor="blue" id="weatherBlock">
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
          (this.props.temperature !== undefined) &&
          <p><b>Temperature:</b>  {this.props.temperature}°C</p>
        } {
          this.props.humidity && 
          <p> <b>Humidity: </b> {this.props.humidity}</p>
        } {
          (this.props.low !== undefined) &&
          <p><b>Low: </b> {this.props.low}°C</p>
        } {
          (this.props.high !== undefined) &&
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

export default Weather;