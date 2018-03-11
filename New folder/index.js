var app = require('express')();
var mongojs = require('./db');
var db = mongojs.connect;
var users = require('./users');
var bodyParser = require('body-parser');
var port = process.env.PORT || 7777;

app.get('/', function (req, res) {
    res.send('<h1>Hello Node.js</h1>');
});

app.get('/user', function (req, res) {
    db.users.find(function (err, docs) {
        res.json(docs);
    });
});

app.get('/user/:id', function (req, res) {
    var id = parseInt(req.params.id);

    db.users.findOne({ id: id }, function (err, docs) {
        res.json(docs);
    });
});

app.post('/newuser', function (req, res) {
    var json = req.body;
    res.send('Add new ' + json.name + ' Completed!');
});

app.listen(port, function () {
    console.log('Starting node.js on port ' + port);
});

// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
