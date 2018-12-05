const eventsModel = require('../models/events.js');
const analyticsModel = require('../models/analytics.js');

/**
 * @param  {Context} ctx - A Koa Context
 * @returns {Promise} - Returns a promise that resolves to undefined
 */
async function index(ctx) {
    const template = 'index.njk';
    await analyticsModel.getSessionId(ctx, 'home');
    const events = await eventsModel.getAllEvents(ctx.db);
    return ctx.render(template, { events });
}

//api function
async function api(ctx) {
    const template = 'api.njk';
    //console.log(events);
    const searchValue = ctx.query.search;
    if (searchValue == null) {
        const events = await eventsModel.getAllEventsAndAttendees(ctx.db);
        const text = JSON.stringify(events);
        var eventsString = '{ "events" : ' + text + '}';
        console.log(eventsString);
        const newObj = JSON.parse(eventsString);
        console.log(newObj);
        return ctx.render(template, { newObj });
    } else {
        const events = await eventsModel.getAllEventsAndAttendeesWithSearch(ctx.db, searchValue);
        const text = JSON.stringify(events);
        var eventsString = '{ "events" : ' + text + '}';
        //console.log(ctx.query.search);   
        return ctx.render(template, { eventsString });
    }
}


module.exports = {
    index,
    api,
};
