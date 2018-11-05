const eventsModel = require('../models/events.js');

/**
 * @param  {Context} ctx - A Koa Context
 * @returns {Promise} - Returns a promise that resolves to undefined
 */
async function index(ctx) {
    const template = 'index.njk';
    const events = await eventsModel.getAllEvents(ctx.db);
    return ctx.render(template, { events });
}

module.exports = {
    index,
};
