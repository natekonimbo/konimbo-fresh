var express = require('express'),
    path = require("path"),
    request = require('request'),
    btoa = require('btoa'),
    dotenv = require('dotenv'),
    compileSass = require('express-compile-sass'),
    app = express(),
    Raven = require('raven');
    
// Raven
Raven.config('https://29388f5c2ca84fe49b8f39995151cdb4:7f7af5e793ce4498a45cfe1eb937826c@sentry.io/141123').install()
app.use(Raven.requestHandler());
app.get('/', function mainHandler(req, res) {
    // example for throwing error which indicates in sentry.io
    // throw new Error('Broke!');
});
app.use(Raven.errorHandler());
app.use(function onError(err, req, res, next) {
    res.statusCode = 500;
    res.end(res.sentry + '\n');
});
// END Raven

// Compile SCSS
app.use(compileSass({
    debug: true,
    root: __dirname + '/public',
    sourceMap: true, // Includes Base64 encoded source maps in output css
    sourceComments: false, // Includes source comments in output css
    watchFiles: true, // Watches sass files and updates mtime on main files for each change
    logToConsole: true
}));

// TODO: Bundle css,js files

app.use(express.static(path.join(__dirname, 'public')));

// Port
app.set('port', (process.env.PORT || 5000));

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
            res.json({
                data
            }).end();
        }
    });
});

// get tasks
app.get('/tickets/:id', (req, res) => {
    var options = getFetchOptions(),
        id = req.params.id;
    options.url = "https://konimbo.freshdesk.com/helpdesk/tickets/view/" + id + ".json";
    request(options, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            data = JSON.parse(body);
            res.json({
                data
            }).end();
        }
    });
});

app.listen(app.get('port'), () => {
    console.log("Node app is running; http://localhost:" + app.get('port'))
});