/**
 * @param  {Context} ctx - A Koa Context
 * @returns {Promise} - Returns a promise that resolves to undefined
 */
async function hello(ctx) {
    const template = 'hello.njk';
    
    return ctx.render(template, {});
}

module.exports = {
    hello,
};
