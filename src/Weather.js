import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function Weather(props) {
  // A table representation of weather deets
  const weatherDetails = (props) => (
      /* We use map() & filter() opposed to Object.forEach() because it does not return an array, unlike map/filter/reduce.
      According to the MDN docs,
      "forEach() executes the callbackFn function once for each array element; 
      unlike map() or reduce() it always returns the value undefined and is not chainable."
      Returning something like the following works though!:
        [<TableRow>
          <TableCell>F</TableCell>
          <TableCell>L</TableCell>
        </TableRow>, <TableRow>
          <TableCell>R</TableCell>
          <TableCell>L</TableCell>
        </TableRow>] */
      // Object.entries(props.weatherDetails.weather).map(([key, value]) => (
      //   <TableRow>
      //     <TableCell>{key}</TableCell>
      //     <TableCell>{value}</TableCell>
      //   </TableRow>
      // ))
      Object.entries(props.weatherDetails.weather)
      .filter(([key]) => key != "Code" && key != "Id")
      .map(([key, value]) => (
        <TableRow>
          <TableCell>{key}</TableCell>
          <TableCell>{value}</TableCell>
        </TableRow>
      ))
  );

  return (
    <div bgcolor="blue" id="weatherBlock">
      {
        /* Check if there is valid input before displaying weather info using 
          'Conditional rendering'
        */
      } {
        props.weatherDetails.weather &&
        <div>
          <p>{props.weatherDetails.weather.error}</p>
          {
            /* Only show weather deets if there is no error */
            !props.weatherDetails.weather.error &&
            <TableContainer 
            component={Paper} 
            sx={{ width: 300 }}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell><img src={"http://openweathermap.org/img/wn/"+ props.weatherDetails.weather.Code + "@2x.png"} alt="weather avatar"/></TableCell>
                  </TableRow>
                  {weatherDetails(props)}
                </TableBody>
              </Table>
            </TableContainer>
          }
        </div>
      }
    </div>
  );
}

export default Weather;