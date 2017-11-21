import React from 'react';
import data from './data/Data'
import Navbar from './components/navbar'
import Forecast from './components/forecast'
import ApiKey from './api/api'
const Timestamp = require('react-timestamp');

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      zipcode: "",
      forecast: [],
      background: "",
      location: "",
      api: ApiKey
    }
  }

  fetchData() {
    const {api, zipcode, background, location} = this.state;
    
    fetch("http://api.openweathermap.org/data/2.5/forecast?zip="+zipcode+",us&cnt=8&units=imperial&APPID="+api)
      .then(response => response.json())
      .then(parsedJSON => parsedJSON.list.map(data => ({
          date: `${data.dt}`,
          city: `${parsedJSON.city.name}`,
          weather: `${data.weather[0].main}`,
          weatherDescription: `${data.weather[0].description}`,
          temp: Math.round(`${data.main.temp}`),
      })))
      .then(forecast => this.setState ({forecast, background: forecast[0].weather, location: forecast[0].city}))
      .catch(error => console.log("Parsing failed: " + error))
  }

  onZipcodeChange(e) {
    // Get zipcode from state
    const {zipcode} = this.state;

    // Get data from input
    const newZip = e.target.value;

    // update state with new zipcode
    this.setState({zipcode: newZip})

    // if(zipcode.length === 5) {
    //   this.fetchData();
    // }
  }


  clothingAdvice() {

    if(weather <= 32) {
      ["Burrrr! It be chilly out there. Remember your winter parka", "It's crazy cold out there. Don't forget your hat, scarf, and gloves. You don't wanna turn into a human popsicle out there!"]
    }

    if(weather > 32 && weather < 45) {
      ["A fuzzy hat and scarf would probably be nice", "Time to bring out the winter coat!"]
    }

    if(weather >= 45 && weather < 65) {
      ["A light jacked would be a good choice."]
    }

    if(weather >= 65 && weather < 85) {
      ["It's pretty hot out there, remember to wear something light and airy.", ]
    }

    if(weather > 85) {
      ["Dang, it be hot out there! You should head to the beach or something.", "It be crazy hot out there, remember to stay hydrated!"]
    }
  }

  render(){
    // Get zip code and forecast from state
    const {zipcode, forecast, location} = this.state;

    return (
      <div className="main-container">
        {/*<Navbar/>*/}
        
        <div className="white-container">
          <div className="search-container">
            <h1 className="zip-title">Enter a Zip Code!</h1>
            <input type="text" className="zip-input form-control" placeholder="zip code" onChange={(e) => {this.onZipcodeChange(e);}}/>
            <button className="zip-btn btn btn-md btn-success" onClick={(e) => {this.fetchData();}}>Get Weather</button>
          </div>

          <div className="results-container">
          {
            location ? <h1 className="city-title">{location}</h1> : null
          }

          {/*{
            <div>
              <h1>FIRST ELEMENT ONLY</h1>
              <h2>{this.state.forecast[0]}</h2>
            </div>
          }*/}

          {
            forecast ? forecast.map(singleForecast => {
              const {date, city, weather, weatherDescription, temp, icon} = singleForecast;

              return(
                <div key={date} className="weather-forecast">
                  {/*<h2>{weather}</h2>*/}
                  <img src={require(`../images/${weather}.png`)} alt={`Weather Forecast: ${weatherDescription}`} className="weather-img"/>
                  <h2 className="weather-description">{weatherDescription}</h2>
                  <p className="temperature">{temp}&deg;F</p>
                  <Timestamp time={date} format='full' className="date"/>
                  <hr/>
                </div>
              )
            }) : null
          }
          </div>
        </div>
      </div>
    )
  }
}

export default App;