const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const dateformat = require('dateformat')

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});


app.get('/', function(req, res) {
    const url = "https://www.metaweather.com/api/location/44418";
    fetch(url)
        .then(res => res.json())
        .then(wdata => {
            let todaysDate = wdata.consolidated_weather[1].applicable_date;
            todaysDate = dateformat(todaysDate, "ddd d, mmm");

            const fiveDays =[]
            for(var i=2; i<6; i++) {
                let aday = dateformat(wdata.consolidated_weather[i].applicable_date, "ddd d, mmm");
                fiveDays.push(aday)
            }
            res.render('index',{wdata: wdata, todaysDate: todaysDate, fiveDays: fiveDays})
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
                    
                    const fiveDays = []
                    for (var i = 2; i < 6; i++) {
                        let aday = dateformat(wdata.consolidated_weather[i].applicable_date, "ddd d, mmm");
                        fiveDays.push(aday)
                    }
                    res.render('index', { wdata: wdata, todaysDate: todaysDate, fiveDays: fiveDays })
                })
        );
})



app.listen(process.env.PORT || 3000, function() {
    console.log("Server is running on port 3000");
})