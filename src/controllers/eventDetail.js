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
    analyticsModel.getSessionId(ctx, "event");
    return ctx.render(template, { eventDetails , attendees});
}

async function index_p(ctx) {
    const template = 'eventDetail.njk';
    const e = await eventsModel.getById(ctx.db,ctx.params.id);
    const eventDetails = e[0];
    await eventsModel.addAttendee(ctx.db,[ctx.params.id,ctx.request.body.email]);
    const attendees = await eventsModel.getAttendees(ctx.db,ctx.params.id);
    analyticsModel.getSessionId(ctx, "add_attendee");
    return ctx.render(template, { eventDetails , attendees});
}

module.exports = {
    index,
    index_p
};
