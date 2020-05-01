import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Nasa from './nasa';
import Weather from './weather';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.timeID = null;
  }
  
  componentDidMount() {  
    this.timeID = setInterval(() => this.getTime(), 1000);
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
  
  render() {
    return (
      <React.Fragment>
        <div>
          <Nasa />
        </div>        
        <nav className="d-flex justify-content-between">
          <Link to="/">
            <h4>Home</h4>
          </Link>
          <Weather />
        </nav>
      </React.Fragment>
    );
  }
}

export default Navbar;
