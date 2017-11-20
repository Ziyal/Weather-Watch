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
      api: ApiKey
    }
  }

  // componentDidMount() {
  //   this.fetchData();
  // }

  fetchData() {
    const {api, zipcode} = this.state;
    
    fetch("http://api.openweathermap.org/data/2.5/forecast?zip="+zipcode+",us&cnt=8&units=imperial&APPID="+api)
      .then(response => response.json())
      .then(parsedJSON => parsedJSON.list.map(data => ({
          date: `${data.dt}`,
          city: `${parsedJSON.city.name}`,
          weather: `${data.weather[0].main}`,
          weatherDescription: `${data.weather[0].description}`,
          temp: Math.round(`${data.main.temp}`),
      })))
      .then(forecast => this.setState ({forecast}))
      .catch(error => console.log("Parsing failed: " + error))
  }

  onZipcodeChange(e) {
    // Get zipcode from state
    const {zipcode} = this.state;

    // Get data from input
    const newZip = e.target.value;

    // update state with new zipcode
    this.setState({zipcode: newZip})
  }


  render(){
    // Get zip code and forecast from state
    const {zipcode, forecast} = this.state;

    return (
      <div>
        <Navbar/>
        <header>
          <h1>Weather Wear</h1>
        </header>
        <div className="content">
          <input type="text" placeholder="zip code" onChange={(e) => {this.onZipcodeChange(e);}}/>
          <button className="btn btn-lg btn-success" onClick={(e) => {this.fetchData();}}>Get Weather</button>
          {
            forecast ? forecast.map(singleForecast => {
              const {date, city, weather, weatherDescription, temp, icon} = singleForecast;

              return(
                <div key={date} className="weather-forecast">
                  {/*<h2>{weather}</h2>*/}
                  <img src={require(`../images/${weather}.png`)} alt={`Weather Forecast: ${weatherDescription}`}/>
                  <h2 className="weather-description">{weatherDescription}</h2>
                  <p className="temp">{temp}&deg;F</p>
                  <Timestamp time={date} format='full' className="date"/>
                  <hr/>
                </div>
              )
            }) : null
          }

        </div>
      </div>
    )
  }
}

export default App;