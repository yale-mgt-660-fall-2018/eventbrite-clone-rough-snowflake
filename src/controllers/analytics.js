const analyticsModel = require('../models/analytics.js');

/**
 * @param  {Context} ctx - A Koa Context
 * @returns {Promise} - Returns a promise that resolves to undefined
 */
async function analytics(ctx) {
    const template = 'analytics.njk';
    const r = await analyticsModel.get_analytics(ctx.db);
    console.log(r);
    return ctx.render(template, { r });
}

module.exports = {
    analytics,
};
