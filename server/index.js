var path = require('path'),
    express = require('express'),
    Server = require('http').Server;
    GameRoom = require('gameroom'),
    app = module.exports = express(),
    server = new Server(app);

app.gameroom = new GameRoom(server);

app.configure(['development', 'production'], function() {
    app.use(express.logger());
});

app.configure(function() {
    app.enable('trust proxy');

    app.set('port', process.env.PORT || 3000);

    app.use(express.static(path.join(__dirname, '..', 'public')));
    app.use(express.cookieParser());
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

