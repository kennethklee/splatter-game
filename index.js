var app = module.exports = require('./server');

if (require.main === module) {
    app.listen(app.get('port'), function() {
        console.log('Application listening on port %d in %s mode.', app.get('port'), app.settings.env);
    });
}