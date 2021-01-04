

var express = require('express');
var app = express();

// var http = require('http').Server(app);
// var io = require('socket.io')(http);

var cors = require('cors')


app.use(cors());


var mysql = require('mysql');

var myfun = require('./sql');

var con = mysql.createConnection({
    host: "localhost",
    user: "dev",
    password: "secret",
    database: "DB1",
    port: "3406"
})

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/process_post', function (req, res) {
    res.send(JSON.stringify(req.body));
    var getuser = (JSON.stringify(req.body))
    console.log("Request received successfully");

    myfun(req.body, con);
});
app.get('/userlist', (req, res) => {
    con.query("SELECT * FROM users", (err, result, data) => {
        if (err) {
            console.log(err);
            res.json({ "error": true });
        }
        else {
            console.log(result);
            res.send(result);
        }
    });

});

//Whenever someone connects this gets executed
// io.on('connection', function(socket) {
//     console.log('A user connected');
 
//     //Whenever someone disconnects this piece of code executed
//     socket.on('disconnect', function () {
//        console.log('A user disconnected');
//     });
//  });


app.listen(3000, () => {
    console.log("Example app listening at http://localhost:3000");
})


