/**
 * @param  {Context} ctx - A Koa Context
 * @returns {Promise} - Returns a promise that resolves to undefined
 */
async function donate(ctx) {
    const template = 'donate.njk';
    return ctx.render(template, { });
}

module.exports = {
    donate,
};
