import React from 'react';
import Forecast from './forecast';
import ApiKey from '../api/api';
const Timestamp = require('react-timestamp');

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      api: ApiKey,
      background: "Rainbow",
      zipcode: "",
      forecast: [],
      location: "",
      advice: "",
    }
  }

  fetchData() {
    const {api, zipcode, background, location, adviceData} = this.state;
    
    
    fetch(`http://api.openweathermap.org/data/2.5/forecast?zip=${zipcode},us&cnt=5&units=imperial&APPID=${api}`)
      .then(response => response.json())
      .then(parsedJSON => parsedJSON.list.map(data => ({
          date: `${data.dt}`,
          city: `${parsedJSON.city.name}`,
          weather: `${data.weather[0].main}`,
          weatherDescription: `${data.weather[0].description}`,
          tempF: Math.round(`${data.main.temp}`),
          tempC: Math.round((`${data.main.temp}`)-32/1.8)
      })))
      .then(forecast => this.setState ({forecast, background: forecast[0].weather, location: forecast[0].city, advice: this.clothingAdvice(Math.round(Math.random(0,2)), forecast[0].tempF, Math.round(Math.random(0,3)), forecast[0].weather)}))
      .catch(error => console.log("Parsing failed: " + error))

      this.setState({zipcode: ""})

      
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


  clothingAdvice(rand1, temp, rand2, weather) {
    const {advice} = this.state;

    console.log("temp: ", temp);
    let newAdvice = "";

    // Temp based statements
    if(temp <= 32) {
      const options = ["Burrrr! It be chilly out there. Remember your winter coat if you don't want to freeze. A hat and scarf would be a good idea too.  ", "Don't forget your hat, scarf, and gloves. You don't wanna turn into a human popsicle out there! "]
      newAdvice += options[rand1];
    }

    else if(temp > 32 && temp < 45) {
      const options = ["A fuzzy hat and scarf would probably be nice. ", "It's cold out today, so remember a warm jacket. "]
      newAdvice += options[rand1];
    }

    else if(temp >= 45 && temp < 65) {
      const options = ["A light jacket would be a good choice. ", "It's not too bad out there. "]
      newAdvice += options[rand1];
    }

    else if(temp >= 65 && temp < 85) {
      const options = ["It's pretty hot out there, remember to wear something light and airy. ", "Ahhhh, nice and toasty. No need for a jacket, it's plenty warm out there. "]
      newAdvice += options[rand1];
    }

    else if(temp > 85) {
      const options = ["It's hot out there! Something light and airy would be best to help you stay cool. And remember to stay hydrated!",]
      newAdvice += options[rand1];
    }

    // Weather based statements
    if(weather === "Rain") {
      const options = ["If you don't wanna get soggy, your should remember an umbrella or rain jacket. ", "It's pretty wet out there, you might want an umbrella. ", "Yup, that's definitely rain out there. Prepare to get wet! "]
      newAdvice += options[rand2];
    }

    else if(weather === "Clear") {
      const options = ["Go soak in some of those rays. ", "Enjoy the blue skies! ", "It'd be a great day to enjoy some time outdoors. "]
      newAdvice += options[rand2];
    }


    console.log(newAdvice);
    return newAdvice;
  }

  render(){
    // Get zip code and forecast from state
    const {zipcode, forecast, location, background, advice} = this.state;

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
          </div>


          <div className="search-container">
            <h1 className="zip-title">Enter a Zip Code!</h1>
            <input type="text" className="zip-input form-control" placeholder="zip code" value={zipcode} onChange={(e) => {this.onZipcodeChange(e);}}/>
            <button className="zip-btn btn btn-md btn-success" onClick={(e) => {this.fetchData();}}>Get Weather</button>
          </div>


        </div>
      </div>
    )
  }
}

export default App;