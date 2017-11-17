import React from 'react';
import data from './data/Data'
import Navbar from './components/navbar'
import ApiKey from './api/api'

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
    
    fetch("http://api.openweathermap.org/data/2.5/forecast?zip="+zipcode+",us&APPID="+api)
      .then(response => response.json())
      .then(parsedJSON => parsedJSON.list.map(data => ({
          city: `${data.main.temp_min}`,
          weather: `${data.weather[0].main}`,
          weatherDescription: `${data.weather[0].description}`,
          minTemp: `${data.main.temp_min}`,
          maxTemp: `${data.main.temp_max}`,
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
    const {zipcode} = this.state;

    return (
      <div>
        <Navbar/>
        <header>
          <h1>Weather Wear</h1>
        </header>
        <div className="content">
          
          <input type="text" placeholder="zip code" onChange={(e) => {this.onZipcodeChange(e);}}/>
          <button className="btn btn-lg btn-success" onClick={(e) => {this.fetchData();}}>Get Weather</button>
          <h3>{zipcode}</h3>

        </div>
      </div>
    )
  }
}

export default App;