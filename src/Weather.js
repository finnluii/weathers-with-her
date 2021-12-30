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
        props.weather.weather &&
        <div>
          <p>{props.weather.weather.error}</p>
          {
            /* Only show weather deets if there is no error */
            !props.weather.weather.error &&
            <div>
              <img src={"http://openweathermap.org/img/wn/"+ props.weather.weather.code + "@2x.png"} alt="weather avatar"/>
              <p><b>City:</b> {props.weather.weather.city}</p>
              <p><b>Country: </b> {props.weather.weather.country}</p>
              <p><b>Temperature:</b>  {props.weather.weather.temperature}°C</p>
              <p><b>Low: </b> {props.weather.weather.low}°C</p>
              <p><b>High: </b> {props.weather.weather.high}°C</p>
              <p><b>Humidity: </b> {props.weather.weather.humidity}</p>
              <p><b>Description: </b> {props.weather.weather.description}</p>
            </div>
          }
        </div>
      }
    </div>
    );
}


export default Weather;