const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get('/', function(req, res) {
    res.render('index')
})

app.post('/', function(req, res) {
    
})


app.listen(3000, function() {
    console.log("Server is running on port 3000");
})