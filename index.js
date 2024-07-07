const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/joke', async (req, res) => {
    try {
        const name = req.query.name || 'Stranger';
        const response = await axios.get(`https://v2.jokeapi.dev/joke/Any?name=${name}`);
        const joke = response.data.joke || `${response.data.setup} - ${response.data.delivery}`;
        res.render('index', { joke, name });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching the joke');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
