var app = module.exports = require('./server');

if (require.main === module) {
    var port = process.env.PORT || 3000;

    app.server.listen(port);
    console.log('Application listening on port %d in %s mode.', port, app.settings.env);
}