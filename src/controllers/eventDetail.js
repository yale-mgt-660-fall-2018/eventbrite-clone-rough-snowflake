const eventsModel = require('../models/events.js');
const analyticsModel = require('../models/analytics.js');

/**
 * @param  {Context} ctx - A Koa Context
 * @returns {Promise} - Returns a promise that resolves to undefined
 */
async function index(ctx) {
    const template = 'eventDetail.njk';
    const e = await eventsModel.getById(ctx.db,ctx.params.id);
    const eventDetails = e[0];
    const attendees = await eventsModel.getAttendees(ctx.db,ctx.params.id);
    const i = await analyticsModel.getSessionId(ctx, "event");
    const donateText = {"text":"Donate"};
    console.log(i);
    if (i % 2 == 0){
        donateText.text = "Support"; 
    }
    return ctx.render(template, { eventDetails , attendees, donateText});
}

async function index_p(ctx) {
    const template = 'eventDetail.njk';
    const e = await eventsModel.getById(ctx.db,ctx.params.id);
    const eventDetails = e[0];
    await eventsModel.addAttendee(ctx.db,[ctx.params.id,ctx.request.body.email]);
    const attendees = await eventsModel.getAttendees(ctx.db,ctx.params.id);
    const i = await analyticsModel.getSessionId(ctx, "add_attendee");
    const donateText = {"text":"Donate"};
    if (i % 2 == 0){
        donateText.text = "Support"; 
    }
    return ctx.render(template, { eventDetails , attendees , donateText});
}

module.exports = {
    index,
    index_p
};
