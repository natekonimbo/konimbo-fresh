var express = require('express'),
    request = require('request'),
    btoa = require('btoa'),
    dotenv = require('dotenv')
var app = express()

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

// Define template engine
app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/tickets', (req, res) => {
    res.render('tickets')
})

// Get tickets
app.get('/t', (req, res) => {
    var getAccess = () => {
        dotenv.load();
        return process.env.FRESHDESK_API_PASSWORD;
    }

    var username = "support@konimbo.co.il",
        password = getAccess(),
        options = {
            url: 'https://konimbo.freshdesk.com/helpdesk/tickets/view/328121.json',
            headers: {
                'Authorization': 'Basic ' + btoa(username + ':' + password)
            }
        },
        data;

    request(options, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            data = JSON.parse(body);
            res.json({
                data
            }).end();
        }
    });
})

app.listen(app.get('port'), () => {
    console.log("Node app is running at localhost:" + app.get('port'))
})