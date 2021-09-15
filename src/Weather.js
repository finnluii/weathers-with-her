import React from 'react';

function Weather(props) {
  return (
    <div bgcolor="blue" id="weatherBlock">
      {
        /* Check if there is valid input before displaying weather info using 
          'Conditional rendering'

        Later, need to check of props is undefined or else when temperature == 0,
        it will return falsy
        */
      } {

        props.code &&
        <img src={"http://openweathermap.org/img/wn/"+ props.code + "@2x.png"} alt="weather icon"/>
      } {
        props.city && 
        <p> <span> <b> City:</b> </span> {props.city}</p>
      } {
        props.country &&
        <p> <b>Country: </b> {props.country}</p>
      } {
        (props.temperature !== undefined) &&
        <p><b>Temperature:</b>  {props.temperature}°C</p>
      } {
        props.humidity && 
        <p> <b>Humidity: </b> {props.humidity}</p>
      } {
        (props.low !== undefined) &&
        <p><b>Low: </b> {props.low}°C</p>
      } {
        (props.high !== undefined) &&
        <p><b>High: </b> {props.high}°C</p>
      } {
        props.description &&
        <div>
          <p><b>Description: </b> {props.description}</p>
        </div>
      } {
        props.error &&
        <p>{props.error}</p>
      } 
    </div>
    );
}


export default Weather;