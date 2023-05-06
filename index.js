const express = require('express');
const axios = require('axios');
const path = require('path');
require('dotenv').config();
const app = express();

// Express body parser middleware
app.use(express.json());

// Configure static url
app.use('/static', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'templates/index.html'))
})

app.get('/about', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'templates/about.html'))
})

app.get('/category', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'templates/category.html'))
})

app.get('/search', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'templates/search.html'))
})

app.post('/getnews', async (req, res) => {
    const { query, search_query } = req.body;
    if (query == null && search_query == null) {
        const r = await axios(`https://newsapi.org/v2/top-headlines?country=in&pageSize=100&apiKey=${process.env.NEWS_API_KEY}`);
        res.status(200).json(r.data);
    } else if (search_query == null) {
        const r = await axios(`https://newsapi.org/v2/top-headlines?country=in&pageSize=100&category=${query}&apiKey=${process.env.NEWS_API_KEY}`);
        res.status(200).json(r.data);
    } else {
        const r = await axios(`https://newsapi.org/v2/top-headlines?country=in&pageSize=100&q=${search_query}&apiKey=${process.env.NEWS_API_KEY}`);
        res.status(200).json(r.data);
    }
})

app.listen(8080, () => {
    console.log('News App listening on http://localhost:8080');
})