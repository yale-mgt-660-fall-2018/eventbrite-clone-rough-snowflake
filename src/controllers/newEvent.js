const eventsModel = require('../models/events.js');
const analyticsModel = require('../models/analytics.js');

/**
 * @param  {Context} ctx - A Koa Context
 * @returns {Promise} - Returns a promise that resolves to undefined
 */
async function index(ctx) {
    const template = 'newEvent.njk';
    analyticsModel.getSessionId(ctx, "new_event");
    return ctx.render(template, { });
}

async function index1(ctx) {
    const r = {};
    try{
    const r = await eventsModel.insert(ctx.db,ctx.request.body.title,ctx.request.body.date,ctx.request.body.image,ctx.request.body.location);
    } catch(e){
        const template = 'newEvent.njk';
        analyticsModel.getSessionId(ctx, "new_event");
        return ctx.render(template, { "error": "There was an error in your form" });
    }
    analyticsModel.getSessionId(ctx, "create_event");
    ctx.redirect('/events/'+(r.id));
}

module.exports = {
    index,
    index1
};
