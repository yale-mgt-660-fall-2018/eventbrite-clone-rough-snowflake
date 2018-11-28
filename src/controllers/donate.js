const analyticsModel = require('../models/analytics.js');

/**
 * @param  {Context} ctx - A Koa Context
 * @returns {Promise} - Returns a promise that resolves to undefined
 */
async function donate(ctx) {
    const template = 'donate.njk';
    await analyticsModel.getSessionId(ctx, "donate");
    return ctx.render(template, { });
}

module.exports = {
    donate,
};
