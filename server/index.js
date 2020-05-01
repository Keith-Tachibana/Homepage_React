require('dotenv/config');
const path = require('path');
const express = require('express');
const fetch = require('node-fetch');

const publicPath = path.join(__dirname, 'public/');
const staticMiddleware = express.static(publicPath);

const app = express();

app.use(staticMiddleware);
app.use(express.json());

app.get('/api/nasa', async (req, res, next) => {
  const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`);
  const json = await response.json();
  if (!json) {
    res.status(500).json({
      error: 'No response from server.'
    });
  } else {
    res.status(200).json({
      url: json.url,
      media: json.media_type,
      title: json.title,
      image: json.hdurl
		});
  }
});

app.get('/api/headlines', async (req, res, next) => {
  const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`);
  const json = await response.json();
  if (!json) {
    res.status(500).send('Internal server error occurred.');
  } else {
    const results = json.articles.map(result => {
      return {
        source: result.source.name,
        author: result.author,
        title: result.title,
        description: result.description,
        url: result.url,
        image: result.urlToImage,
        date: result.publishedAt,
        content: result.content
      };
    });
    res.status(200).json(results);
  }
});

app.get('/api/sports', async (req, res, next) => {
  const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=${process.env.NEWS_API_KEY}`);
  const json = await response.json();
  if (!json) {
    res.status(500).send('Internal server error occurred.');
  } else {
    const results = json.articles.map(result => {
      return {
        source: result.source.name,
        author: result.author,
        title: result.title,
        description: result.description,
        url: result.url,
        image: result.urlToImage,
        date: result.publishedAt,
        content: result.content
      };
    });
    res.status(200).json(results);
  }
});

app.get('/api/weather/:city', async (req, res, next) => {
  const { city } = req.params;
  if (city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?appid=${process.env.WEATHER_API_KEY}&q=${city}`);
    const json = await response.json();
    res.status(200).json({
      city: json.name,
      temp: json.main.temp,
      min: json.main.temp_min,
      max: json.main.temp_max,
      description: json.weather[0].description,
      wind: json.wind.speed,
      sunrise: json.sys.sunrise,
      sunset: json.sys.sunset,
      icon: json.weather[0].icon
    });
  } else {
    res.status(400).send('Weather for that city not found.')
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${process.env.PORT}`);
});
