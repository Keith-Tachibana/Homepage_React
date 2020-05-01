import React, { Component } from 'react';

class Nasa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nasaPicture: null,
      nasaTitle: '',
      nasaVideo: null,
      nasaMedia: '',
      time: new Date().toLocaleString()
    };
    this.timeID = null;    
  }

  componentDidMount() {
    this.getNasa();
    this.timeID = setInterval(() => this.tick(), 1000);
    this.getDate();    
  }

  componentWillUnmount() {
    clearInterval(this.timeID);
  }  
  
  getDate() {
    const d = new Date();
    let day = d.getDay();
    switch(day) {
      case 0:
        day = 'Sunday';
        break;
      case 1:
        day = 'Monday';
        break;
      case 2:
        day = 'Tuesday';
        break;
      case 3:
        day = 'Wednesday';
        break;
      case 4:
        day = 'Thursday';
        break;
      case 5:
        day = 'Friday';
        break;
      case 6:
        day = 'Saturday';
        break;
    }
    let month = d.getMonth();
    switch(month) {
      case 0:
        month = 'January';
        break;
      case 1:
        month = 'February';
        break;
      case 2:
        month = 'March';
        break;
      case 3:
        month = 'April';
        break;
      case 4:
        month = 'May';
        break;
      case 5:
        month = 'June';
        break;
      case 6:
        month = 'July';
        break;
      case 7:
        month = 'August';
        break;
      case 8:
        month = 'September';
        break;
      case 9:
        month = 'October';
        break;
      case 10:
        month = 'November';
        break;
      case 11:
        month = 'December';
        break;
    }
    const fullDate = d.toDateString();
    const splitFullDate = fullDate.split(' ');
    const calendarDay = splitFullDate[2];
    const year = d.getFullYear();
    const currentDate = `${day}, ${month} ${calendarDay}, ${year}`;
    return currentDate;
  }
  /*
  getTime() {
    const d = new Date();
    let hours = d.getHours() > 12 ? d.getHours() - 12 : d.getHours();
    if (hours === 0) {
      hours = 12;
    }
    const minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
    const seconds = d. getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
    const suffix = d.getHours() >= 12 ? 'PM' : 'AM';
    const currentTime = `${hours}:${minutes}:${seconds} ${suffix}`;
    return currentTime;
  }    
  */
  
  tick() {
    this.setState({
      time: new Date().toLocaleString()
    });
  }
  
  async getNasa() {
    try {
      const response = await fetch('/api/nasa');
      const json = response.json();
      json.then(nasa => {
        this.setState({
          nasaPicture: nasa.image,
          nasaTitle: nasa.title,
          nasaVideo: nasa.url,
          nasaMedia: nasa.media
        });
      }).catch(err => console.error(err.message));
    } catch (error) {
      console.error(error.message);
    }
  }
  
  render() {
    const nasaStyle = {
      minWidth: '100vw',
      backgroundImage: `url(${this.state.nasaPicture})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      height: '35vh'
    };
    return (
      <React.Fragment>
          {this.state.nasaMedia === 'video' && (
          <React.Fragment>
            <div className="w-100">
              <span className="text-white bg-dark d-inline">
                <span>NASA Video of the Day: "{this.state.nasaTitle}"</span>
                <span className="text-center">{this.getDate()}</span>
                <span className="text-center">{this.state.time}</span>              
              </span>
            </div>
            <header>
              <div className="overlay"></div>
              <iframe src={this.state.nasaVideo} frameBorder="0"></iframe>
              <div className="container h-100">
                <div className="d-flex h-100 text-center align-items-center">
                </div>
              </div>
             </header>
          </React.Fragment>
          )}
          {this.state.nasaMedia === 'image' && (
          <div style={nasaStyle}>
            <span className="text-white bg-dark d-inline">
              <span>NASA Pic of the Day: "{this.state.nasaTitle}"</span>
              <span className="text-center">{this.getDate()}</span>
              <span className="text-center">{this.state.time}</span>
            </span>
          </div>
          )}
      </React.Fragment>
    );
  }
}

export default Nasa;
