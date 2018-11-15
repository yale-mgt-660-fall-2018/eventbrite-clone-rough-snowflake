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

module.exports = {
    index,
};
