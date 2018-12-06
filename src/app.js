const Koa = require('koa');
const pgp = require('pg-promise')();
const views = require('koa-views');
const bodyParser = require('koa-bodyparser');
const path = require('path');
const router = require('./routes/routes.js');
const nunjucks = require('nunjucks');
const nunjucksEnvironment = new nunjucks.Environment(
    new nunjucks.FileSystemLoader(path.join(__dirname, './views'))
);
const init = require('./models/init.js');
const session = require('koa-session');
const serve = require('koa-static');


/**
 * createApp - returns a Koa application given a config
 * @param  {object} config - the config for the app
 * @returns {app} A Koa application
 */
function createApp(config) {
    // Create our app
    const app = new Koa();

    app.use(bodyParser());

    // Add the database to the app's context prototype.
    // This will make the db available in all controllers.
    app.context.db = pgp(config.databaseURL);
    init.createSchema(app.context.db);
    // Set the port for the app
    app.context.port = config.port;
    
    app.use(session(app));
    app.keys = ['secret', 'key'];
    
    // Add view/template engine
    app.use(views(path.join(__dirname, 'views'), {
        extension: 'njk',
        options: {
            nunjucksEnv: nunjucksEnvironment
        },
        map: { njk: 'nunjucks' },
    }));


    // Attach our routes.
    app.use(router.routes());
    app.use(serve('./src/static'));
    return app;
}

// This module exports a function that must
// be called to get an app. It is passed a
// configuration object, as indicated above.
module.exports = createApp;
