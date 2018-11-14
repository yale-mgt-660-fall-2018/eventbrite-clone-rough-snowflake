/**
 * @param  {Context} ctx - A Koa Context
 * @returns {Promise} - Returns a promise that resolves to undefined
 */
async function about(ctx) {
    const template = 'about.njk';
    return ctx.render(template, { });
}

function about (request, response) {
    console.log('in about function');
    
    nicknames = distinct-hyena, fair-barracuda, healthy-reindeer, cheerful-penguin

module.exports = {
    about,
};
