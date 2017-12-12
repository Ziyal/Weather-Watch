import React from 'react';
import Forecast from './forecast';
import ApiKey from '../api/api';
import CreateCommentary from './commentary';

const Timestamp = require('react-timestamp');

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      api: ApiKey,
      background: "Rainbow",
      city: "",
      forecast: [],
      location: "",
      advice: "",
      commTemp: "",
      commWeather: ""
    }

    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  fetchData() {
    const {api, city, background, location, adviceData} = this.state;
    
    
    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city},us&cnt=5&units=imperial&APPID=${api}`)
      .then(response => response.json())
      .then(parsedJSON => parsedJSON.list.map(data => ({
          date: `${data.dt}`,
          city: `${parsedJSON.city.name}`,
          weather: `${data.weather[0].main}`,
          weatherDescription: `${data.weather[0].description}`,
          tempF: Math.round(`${data.main.temp}`),
          tempC: Math.round((`${data.main.temp}`)-32/1.8)
      })))
      .then(forecast => this.setState ({
        forecast, 
        background: forecast[0].weather, 
        location: forecast[0].city, 
        advice: this.createCommentary(forecast[0].tempF, forecast[0].weather),
        // advice: CreateCommentary(temp={forecast[0].tempF} weather={forecast[0].weather}),
        commTemp: forecast[0].tempF,
        commWeather: forecast[0].weather,
      }))
      .catch(error => console.log("Parsing failed: " + error))    
  }

  onCityChange(e) {
    // Get city from state
    const {city} = this.state;

    // Get data from input
    const newCity = e.target.value;

    // update state with new city
    this.setState({city: newCity})
  }

  onFormSubmit(event) { 
    // Prevents from submitting form action and redirecting
    event.preventDefault();
    
    // Make API call
    this.fetchData(this.state.city);
    // Set input to blank
    this.setState({ city: '' });
  }


  createCommentary(temp, weather) {
    const rand1 = Math.round(Math.random(0,2));
    const rand2 = Math.round(Math.random(0,2));

    let commentary = "";

    // Temp based statements
    if(temp <= 32) {
      const options = ["Burrrr! It be chilly out there. Remember your winter coat if you don't want to freeze. A hat and scarf would be a good idea too.  ", "Don't forget your hat, scarf, and gloves. You don't wanna turn into a human popsicle out there! "]
      commentary += options[rand1];
    }

    else if(temp > 32 && temp < 45) {
      const options = ["A fuzzy hat and scarf would probably be nice. ", "It's cold out today, so remember a warm jacket. "]
      commentary += options[rand1];
    }

    else if(temp >= 45 && temp < 65) {
      const options = ["A light jacket would be a good choice. ", "It's not too bad out there. "]
      commentary += options[rand1];
    }

    else if(temp >= 65 && temp < 85) {
      const options = ["It's pretty hot out there, remember to wear something light and airy. ", "Ahhhh, nice and toasty. No need for a jacket, it's plenty warm out there. "]
      commentary += options[rand1];
    }

    else if(temp > 85) {
      const options = ["It's hot out there! Something light and airy would be best to help you stay cool. And remember to stay hydrated!",]
      commentary += options[rand1];
    }

    // Weather based statements
    if(weather === "Rain") {
      const options = ["If you don't wanna get soggy, your should remember an umbrella or rain jacket. ", "It's pretty wet out there, you might want an umbrella. ", "Yup, that's definitely rain out there. Prepare to get wet! "]
      commentary += options[rand2];
    }

    else if(weather === "Clear") {
      const options = ["Go soak in some of those rays. ", "Enjoy the blue skies! ", "It'd be a great day to enjoy some time outdoors. "]
      commentary += options[rand2];
    }

    return commentary;
  }

  render(){
    // Get city and forecast from state
    const {city, forecast, location, background, advice, commTemp, commWeather} = this.state;

    return (
      <div className={`main-container ${background}`}>
        
        <h1 className="title">Weather Watch</h1>
        <div className="white-container">

          {
            location ? <h1 className="city-title">{location}</h1> : null
          }

          <div className="results-container">

          {
            forecast ? forecast.map(singleForecast => {
              const {date, city, weather, weatherDescription, tempF, tempC} = singleForecast;

              return(
                <div key={date} className="weather-forecast">
                  <Timestamp time={date} format='time' className="date"/>
                  <img src={require(`../images/${weather}.png`)} alt={`Weather Forecast: ${weatherDescription}`} className="weather-img"/>
                  <p className="weather-description">{weatherDescription}</p>
                  <p className="temperature">{tempF}&deg;F/{tempC}&deg;C</p>
                </div>
              )
            }) : null
          }
          </div>


          <div className="advice-container">
            { advice ? <p className="advice-text">{advice}</p> : null }
            {/*{ advice ? <CreateCommentary temp={commTemp} weather={commWeather} /> : null }*/}
          </div>

          <div className="search-container">
            <h1 className="city-title">Enter a City!</h1>
            <form onSubmit={this.onFormSubmit}>
              <input type="text" 
                className="city-input form-control"  
                value={city} 
                onChange={(e) => {this.onCityChange(e);}}/>
              <button type="submit" className="city-btn btn btn-md btn-success">Get Weather</button>
            </form>
          </div>

        </div>
      </div>
    )
  }
}

export default App;