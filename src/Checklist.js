import React from 'react';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@mui/material/Paper';
import { FormGroup } from '@mui/material';

/* TODO: 
    * Celebrate after completing the to-do list with https://www.npmjs.com/package/react-confetti 
*/
const createList = (props) => {
    // Always wear sunscreen! Or else the UV rays will give you wrinkles >:(
    var itemsToBring = ["SUNSCREEN!"]; 

    // If it's raining, bring an umbrella!
    const id = props.weatherDetails.weather.Id;
    var rain_pattern = /^[2,3,5][0-9]{2}$/;

    if (rain_pattern.test(id)) { 
        itemsToBring.push("Umbrella"); 
    }

    // Add clothes depending on temperature ranges
    const temp = props.weatherDetails.weather.Temperature;
    if (temp >= 25) {
        itemsToBring.push("t-shirt", "shorts/shorts/skirt", "sandals");
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
    return itemsToBring;
}

function Checklist(props) {

    if (props.weatherDetails.weather && !props.weatherDetails.weather.error) {
        const itemsToBring = createList(props);

        // arrow function
        const checklist = itemsToBring.map((x) => {
            return (
                <FormControlLabel
                key={x}
                control={<Checkbox name={x} />} 
                label={x} 
                color="palette.secondary.light"
                />
            )
        });

        // return checklist
        return (
            <Box color="palette.secondary.light" component={Paper} maxWidth={300}>
                <FormGroup>
                    {checklist}
                </FormGroup>
            </Box>
        );
    }
    return null;
}

export default Checklist;