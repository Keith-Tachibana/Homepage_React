import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, CardFooter } from 'reactstrap';

class Sports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sports: [],
      sportIndex: 0,
      doneLoading: false
    };
    this.timerID = null;
    this.handlePrevious = this.handlePrevious.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleDot = this.handleDot.bind(this);
    this.renderDot = this.renderDot.bind(this);
    this.renderDate = this.renderDate.bind(this);
    this.getSports = this.getSports.bind(this);
  }

  startTimer() {
    this.timerID = setInterval(this.handleNext, 7500);
  }

  stopTimer() {
    clearInterval(this.timerID);
  }

  componentDidMount() {
    this.getSports();
  }

  componentDidUpdate() {
    this.stopTimer();
    this.startTimer();
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  handlePrevious() {
    this.setState(prevState => {
      if (prevState.sportIndex === 0) {
        return {
          sportIndex: this.state.sports.length - 1
        };
      } else {
        return {
          sportIndex: prevState.sportIndex - 1
        };
      }
    });
  }

  handleNext() {
    this.setState(prevState => {
      if (prevState.sportIndex === this.state.sports.length - 1) {
        return {
          sportIndex: 0
        };
      } else {
        return {
          sportIndex: prevState.sportIndex + 1
        };
      }
    });
  }

  handleDot(event) {
    this.setState({
      sportIndex: Number(event.target.id)
    });
  }

  async getSports() {
    try {
      const response = await fetch('/api/sports');
      const json = response.json();
      json.then(sports => {
        this.setState({
          sports
        }, () => {
          this.setState({
            doneLoading: true
          });
        });
      }).catch(err => console.error(err.message));
    } catch (error) {
      console.error(error.message);
    }
  }

  renderDot() {
    return (
      <React.Fragment>
        {this.state.sports.map((sport, index) => {
          let dot;
          const current = index === this.state.sportIndex;
          if (current) {
            dot = 'fas fa-circle mr-2';
          } else {
            dot = 'far fa-circle mr-2';
          }
          return <i className={dot} key={index} id={index} onClick={this.handleDot}></i>;
        })}
      </React.Fragment>
    );
  }

  renderDate(index) {
    const { sports } = this.state;
    if (this.state.doneLoading === true) {
      const dateSplit = sports[index].date.split('-');
      const month = dateSplit[1];
      const actualMonth = month < 10 ? month.slice(1) : month;
      const day = dateSplit[2].split('T')[0];
      const actualDay = day < 10 ? day.slice(1) : day;
      const year = dateSplit[0];
      return `${actualMonth}/${actualDay}/${year}`;
    }
  }

  render() {
    const cardImgStyle = {
      height: '25vh',
      objectFit: 'cover'
    };
    const { sports, sportIndex } = this.state;
    return (this.state.doneLoading && (
      <React.Fragment>
        <div className="carousel-sports" style={{ height: '500px' }}>
          <Card className="card-style">
            <CardImg top width="100%" style={cardImgStyle} src={sports[sportIndex].image} alt={sports[sportIndex].title} />
            <CardBody style={{ height: '300px', display: 'grid' }}>
              <CardTitle><h3>{sports[sportIndex].title}</h3></CardTitle>
              <CardSubtitle className="text-center"><em>Source:</em> {sports[sportIndex].source}</CardSubtitle>
              <CardSubtitle className="text-center"><em>By:</em> {sports[sportIndex].author}</CardSubtitle>
              <CardSubtitle className="text-center"><em>Published On:</em> {this.renderDate(sportIndex)}</CardSubtitle>
              <CardText><em>{sports[sportIndex].description}</em></CardText>
              <CardText style={{ alignSelf: 'end' }}><a href={sports[sportIndex].url} rel="noopener noreferrer" target="_blank">Click to read in full...</a></CardText>
            </CardBody>
            <CardFooter style={{ height: '50px' }}>
              <div className="footer-wrapper">
                <i className="previous fas fa-chevron-left" onClick={this.handlePrevious}></i>
                <div className="dot">
                  <this.renderDot />
                </div>
                <i className="next fas fa-chevron-right" onClick={this.handleNext}></i>
              </div>
            </CardFooter>
          </Card>
        </div>
      </React.Fragment>));
  }
}

export default Sports;
