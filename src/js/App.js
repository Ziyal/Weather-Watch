import React from 'react';
import Navbar from './components/navbar'
import Forecast from './components/forecast'
import ApiKey from './api/api'
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
    
    
    fetch("http://api.openweathermap.org/data/2.5/forecast?zip="+zipcode+",us&cnt=5&units=imperial&APPID="+api)
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
      const options = ["Burrrr! It be chilly out there. Remember your winter parka. ", "It's crazy cold out there. Don't forget your hat, scarf, and gloves. You don't wanna turn into a human popsicle out there! "]
      newAdvice += options[rand1];
    }

    else if(temp > 32 && temp < 45) {
      const options = ["A fuzzy hat and scarf would probably be nice. ", "Time to bring out the winter coat! ", "It be chilly out there! "]
      newAdvice += options[rand1];
    }

    else if(temp >= 45 && temp < 65) {
      const options = ["A light jacked would be a good choice. ", "It's not too bad out there. "]
      newAdvice += options[rand1];
    }

    else if(temp >= 65 && temp < 85) {
      const options = ["It's pretty hot out there, remember to wear something light and airy. ", "Remember the sunscreen! It's warm out there.", "Ahhhh, nice and toasty. No need for a jacket, it's plenty warm out there. ", "Time to break out your favorite pair of shorts! Booyah! "]
      newAdvice += options[rand1];
    }

    else if(temp > 85) {
      const options = ["Dang, it be hot out there! You should head to the beach or something. ", "It be crazy hot out there, remember to stay hydrated! "]
      newAdvice += options[rand1];
    }

    // Weather based statements
    if(weather === "Rain") {
      const options = ["If you don't wanna become a soggy pancake, your should remember your rain jacket. ", "An umbrella might be a good choice today. ", "Yup, that's definitely rain out there. Prepare to get wet! "]
      newAdvice += options[rand2];
    }

    else if(weather === "Clear") {
      const options = ["Ahhhh, nice and sunny out there! Go soak in some of those rays. ", "A beautiful clear day out there. ", "'I'm walking on sunshine, and don't it feel good!' ", "Those blue skies sure are shining on me! "]
      newAdvice += options[rand2];
    }

    if(weather === "Clouds") {
      const options = ["The sky is filled with clouds out there. ", "Not much blue left in the sky today. ", "There's white fluffy stuff up in the sky today. "]
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
        {/*<Navbar/>*/}
        
        <h1 className="title">Weather Wear</h1>
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