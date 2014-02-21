var path = require('path'),
    GameRoom = require('gameroom'),
    express = require('express'),
    app = module.exports = express(),
    server = require('http').Server(app);

app.server = server;
app.gameroom = new GameRoom(server);

app.configure('development', function() {
    app.use(express.logger());
    app.use(express.static(path.join(__dirname, '..', 'app')));
});

app.configure('production', function() {
    app.use(express.logger());
    app.use(express.static(path.join(__dirname, '..', 'public')));
});

app.configure(function() {
    app.enable('trust proxy');

    //app.use(express.cookieParser());
    app.use(express.bodyParser());

    app.use(app.router);
});

app.configure('development', function() {
    app.use(express.errorHandler({
        dumpExceptions: true,
        showMessage: true,
        showStack: true
    }));
});

app.configure('production', function() {
    app.use(express.errorHandler({
        dumpExceptions: true
    }));
});

