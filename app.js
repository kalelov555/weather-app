const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const dateformat = require('dateformat')

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get('/', function(req, res) {
    const url = "https://www.metaweather.com/api/location/44418";
    fetch(url)
        .then(res => res.json())
        .then(wdata => {
            let todaysDate = wdata.consolidated_weather[1].applicable_date;
            todaysDate = dateformat(todaysDate, "ddd d, mmm");
            res.render('index',{wdata: wdata, todaysDate: todaysDate})
        })
})


app.post('/', function(req, res) {
    const url = "https://www.metaweather.com/api/location/search/?query=" + req.body.cityName;
    fetch(url)
        .then(res => res.json())
        .then(json =>
            fetch("https://www.metaweather.com/api/location/" + json[0].woeid)
                .then(response => response.json())
                .then(wdata => {
                    let todaysDate = wdata.consolidated_weather[1].applicable_date;
                    todaysDate = dateformat(todaysDate, "ddd d, mmm");
                    res.render('index', { wdata: wdata, todaysDate: todaysDate})
                })
        );
})



app.listen(3000, function() {
    console.log("Server is running on port 3000");
})