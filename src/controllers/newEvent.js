const eventsModel = require('../models/events.js');


/**
 * @param  {Context} ctx - A Koa Context
 * @returns {Promise} - Returns a promise that resolves to undefined
 */
async function index(ctx) {
    const template = 'newEvent.njk';
    return ctx.render(template, { });
}

async function index1(ctx) {
   
    const r = await eventsModel.insert(ctx.db,ctx.request.body.title,ctx.request.body.date,ctx.request.body.image,ctx.request.body.location);
    ctx.redirect('/events/'+(r.id));
}

module.exports = {
    index,
    index1
};
