const analyticsModel = require('../models/analytics.js');

/**
 * @param  {Context} ctx - A Koa Context
 * @returns {Promise} - Returns a promise that resolves to undefined
 */
async function about(ctx) {
    const template = 'about.njk';
    await analyticsModel.getSessionId(ctx, "about");
    return ctx.render(template, { });
}

module.exports = {
    about,
};
