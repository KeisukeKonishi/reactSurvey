const express = require('express');
const path = require('path');
const logger = require('morgan');
const app = express();
const server = require("http").createServer(app);

server.listen(8080);

app.use(logger('dev'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'static')));
app.use("/js",express.static(__dirname + "/node_modules/popper.js/dist/umd/"));
app.use("/js",express.static(__dirname + "/node_modules/jquery/dist"));
app.use("/js",express.static(__dirname + "/node_modules/bootstrap/dist/js"));
app.use("/css",express.static(__dirname + "/node_modules/bootstrap/dist/css"));
app.use("/dist",express.static(path.join(__dirname,"dist")));


app.get("/", (req, res) => {
    res.render("index", { title: "Home" });
});