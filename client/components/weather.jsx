import React, { Component } from 'react';

class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: [],
      search: '',
      city: localStorage.getItem('weather') ? this.getWeather(localStorage.getItem('weather')) : null,
      render: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async getWeather(city) {
    try {
      const response = await fetch(`/api/weather/${city}`);
      const json = response.json();
      json.then(weather => {
        this.setState({
          weather,
          render: true
        }, localStorage.setItem('weather', city));
      }).catch(err => console.error(err.message));
    } catch (error) {
      console.error(error.message);
    }
  }
    
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }
  
  handleSubmit(event) {
    event.preventDefault();
    this.getWeather(this.state.search);
    this.setState({
      search: ''
    });
  }
  
  render() {
    const { city, description, icon, max, min, sunrise, sunset, temp, wind } = this.state.weather;
    const tempF = ((temp - 273.15) * (9/5) + 32).toFixed(1);
    const minTempF = ((min - 273.15) * (9/5) + 32).toFixed(1);
    const maxTempF = ((max - 273.15) * (9/5) + 32).toFixed(1);
    const windMPH = (wind * 2.237).toFixed(2);
    const sunriseDate = new Date(sunrise * 1000);
    const sunriseHours = sunriseDate.getHours();
    const sunriseMinutes = '0' + sunriseDate.getMinutes();
    const sunriseSeconds = '0' + sunriseDate.getSeconds();
    const sunriseTime = `${sunriseHours}:${sunriseMinutes.substr(-2)}:${sunriseSeconds.substr(-2)} AM`;
    const sunsetDate = new Date(sunset * 1000);
    const sunsetHours = sunsetDate.getHours();
    const sunsetMinutes = '0' + sunsetDate.getMinutes();
    const sunsetSeconds = '0' + sunsetDate.getSeconds();
    const sunsetTime = `${sunsetHours - 12}:${sunsetMinutes.substr(-2)}:${sunsetSeconds.substr(-2)} PM`;
    const weatherIconSrc = `http://openweathermap.org/img/wn/${icon}.png`;
    return(
      <React.Fragment>
        <form className="form-inline" onSubmit={this.handleSubmit}>
          <div className="form-row">
            <input
              type="search"
              name="search"
              value={this.state.search}
              placeholder="Enter city for weather"
              onChange={this.handleChange}
              className="form-control" />
            <button type="submit" className="btn btn-sm btn-primary mr-4">Submit</button>
          </div>
          {this.state.render && (
            <div className="weather-container">
              <span className="weather">{city}: {description} <img src={weatherIconSrc} alt={description} /> Current: {tempF}ºF / Min: {minTempF}ºF / Max: {maxTempF}ºF, Wind: {windMPH} mph, Sunrise: {sunriseTime} / Sunset: {sunsetTime}</span>
            </div>
          )}          
        </form>
      </React.Fragment>
    );
  }
}

export default Weather;