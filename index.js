var express = require('express'),
    path = require("path"),
    request = require('request'),
    btoa = require('btoa'),
    dotenv = require('dotenv'),
    app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

// Define template engine
app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/tickets', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/tickets.html'));
})

// configuration
function getFetchOptions() {
    return options = {
        url: '',
        headers: {
            'Authorization': 'Basic ' + btoa(username + ':' + password)
        }
    }
}
var getAccess = () => {
        dotenv.load();
        return process.env.FRESHDESK_API_PASSWORD;
    },
    username = "support@konimbo.co.il",
    password = getAccess();

// get tickets
app.get('/upcoming', (req, res) => {
    var options = getFetchOptions();
    options.url = "https://konimbo.freshdesk.com/helpdesk/tickets/view/328121.json";
    request(options, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            data = JSON.parse(body);
            res.json({data}).end();
        }
    });
});

// get tasks
app.get('/tasks', (req, res) => {
    var options = getFetchOptions();
    options.url = "https://konimbo.freshdesk.com/helpdesk/tickets/view/328122.json";
    request(options, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            data = JSON.parse(body);
            res.json({data}).end();
        }
    });
});

app.listen(app.get('port'), () => {
    console.log("Node app is running; http://localhost:" + app.get('port'))
})