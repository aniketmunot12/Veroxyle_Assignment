const puppeteer = require('puppeteer');
const express = require('express');
const { query } = require('express');
const app = express();
const port = 3000;

const searchDuck = async (searchQuery) => {
    const browser = await puppeteer.launch({headless:false});

    const page = await browser.newPage();
    await page.goto('https://duckduckgo.com');

    await page.type('input[name="q"]', searchQuery);
    
    await page.screenshot({path: 'example.png'});

    await browser.close();
};
app.get('search', (request, response) => {

    const searchQuery = request.query.searchquery;

    if (searchQuery != null) {

        searchDuck(searchQuery)
            .then(results => {
                response.status(200);
                response.json(results);
            });
    } else {
        response.end();
    }
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));

searchDuck(' http://localhost:3000/search?q=latest%20news');


module.exports = searchDuck;