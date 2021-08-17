import React from 'react';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

class Checklist extends React.Component {
    // createList() {
    //   // Add items to wear to list depending on range of temperature.
    //   var itemsToBring = [];

    //   // If it's raining, bring an umbrella!
    //   const id = (this.props.id).toString();
    //   var rain_pattern = /^[2,3,5][0-9]{2}$/;
    //   var result = id.match(rain_pattern);
    //   console.log(result);
    //   if (result) { console.log('Bring an umbrella!'); }
    // }

    render() {
        // Always wear sunscreen! Or else the UV rays will give you wrinkles >:(
        // TODO Maybe it is better to keep all the items in a list and render them using
        // map()
        if (this.props.id) { 
        var itemsToBring = ["SUNSCREEN!"]; 
        

        // If it's raining, bring an umbrella!
        const id = this.props.id;
        var rain_pattern = /^[2,3,5][0-9]{2}$/;

        if (rain_pattern.test(id)) { 
            itemsToBring.push("Umbrella"); 
        }

        // Add clothes depending on temperature ranges
        const temp = this.props.temperature;
        if (temp >= 25) {
            itemsToBring.push("t-shirt", "shorts/summer, short skirt", "sandals");
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

        console.log(itemsToBring);
        // arrow function
        const checklist = itemsToBring.map((x) => {
            // return <div key={x}><p><input type="checkbox"/>{x}</p></div>
            return (
                <FormControlLabel
                control={<Checkbox name={x} />} label={x} color="palette.secondary.light"
                />
            )
        });

        // return checklist
        return (
            <Box color="palette.secondary.light">
            {checklist}
            </Box>
            );
        }
        return null;
    }
}

export default Checklist;