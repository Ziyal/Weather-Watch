import React from 'react';
import Timestamp from 'react-timestamp';


export default (props) => {
    return (
        <div>
            <Timestamp time={props.date} format='time' className="date"/>
            <img src={require(`../images/${props.weather}.png`)} alt={`Weather Forecast: ${props.weatherDescription}`} className="weather-img"/>
            <p className="weather-description">{props.weatherDescription}</p>
            <p className="temperature">{props.tempF}&deg;F/{props.tempC}&deg;C</p>
        </div>
    )
}