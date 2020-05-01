import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, CardFooter } from 'reactstrap';

class Headlines extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headlines: [],
      headlineIndex: 0,
      doneLoading: false
    };
    this.timerID = null;
    this.handlePrevious = this.handlePrevious.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleDot = this.handleDot.bind(this);
    this.renderDot = this.renderDot.bind(this);
    this.renderDate = this.renderDate.bind(this);
    this.getHeadlines = this.getHeadlines.bind(this);
  }

  startTimer() {
    this.timerID = setInterval(this.handleNext, 7500);
  }
  
  stopTimer() {
    clearInterval(this.timerID);
  }
  
  componentDidMount() {
    this.getHeadlines();
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
      if (prevState.headlineIndex === 0) {
        return {
          headlineIndex: this.state.headlines.length - 1
        };
      } else {
        return {
          headlineIndex: prevState.headlineIndex - 1
        };
      }
    });
  }
  
  handleNext() {
    this.setState(prevState => {
      if (prevState.headlineIndex === this.state.headlines.length - 1) {
        return {
          headlineIndex: 0
        };
      } else {
        return {
          headlineIndex: prevState.headlineIndex + 1
        };
      }
    });
  }
  
  handleDot(event) {
    this.setState({
      headlineIndex: Number(event.target.id)
    })
  }

  async getHeadlines() {
    try {
      const response = await fetch('/api/headlines');
      const json = response.json();
      json.then(headlines => {
        this.setState({
          headlines
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
        {this.state.headlines.map((headline, index) => {
          let dot;
          const current = index === this.state.headlineIndex;
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
    const { headlines } = this.state;
    if (this.state.doneLoading === true) {
      const dateSplit = headlines[index].date.split('-');
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
    const { headlines, headlineIndex } = this.state;    
    return (this.state.doneLoading && (
      <React.Fragment>
        <div className="carousel-headlines">
          <Card className="card-style">
            <CardImg top width="100%" style={cardImgStyle} src={headlines[headlineIndex].image} alt={headlines[headlineIndex].title} />
            <CardBody style={{ maxHeight: '500px' }}>
              <CardTitle><h3>{headlines[headlineIndex].title}</h3></CardTitle>
              <CardSubtitle><em>Source:</em> {headlines[headlineIndex].source}</CardSubtitle>
              <CardSubtitle><em>By:</em> {headlines[headlineIndex].author}</CardSubtitle>
              <CardSubtitle><em>Published On:</em> {this.renderDate(headlineIndex)}</CardSubtitle>
              <br />
              <CardText><em>{headlines[headlineIndex].description}</em></CardText>
              <hr />
              <CardText>{headlines[headlineIndex].content}</CardText>
              <CardText><a href={headlines[headlineIndex].url} target="_blank">Click to read in full...</a></CardText>
            </CardBody>
            <CardFooter style={{ minHeight: '50px', maxHeight: '50px' }}>
              <i className="previous fas fa-chevron-left" onClick={this.handlePrevious}></i>             
              <div className="dot">
                <this.renderDot />
              </div>                  
              <i className="next fas fa-chevron-right" onClick={this.handleNext}></i>              
            </CardFooter>
          </Card>
        </div>
      </React.Fragment>));
  }
}

export default Headlines;
