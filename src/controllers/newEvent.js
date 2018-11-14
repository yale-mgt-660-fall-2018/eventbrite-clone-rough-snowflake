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
    var month = ctx.request.body.month;
    const monthsArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let monthAsNumber = '';
    for (let i = 0; i <= 11; i++) {
        if (monthsArray[i] == month) {
            monthAsNumber = i + 1;
        }
    }
    const date = monthAsNumber + '/' + ctx.request.body.day + '/' + ctx.request.body.year + ' ' + ctx.request.body.hour + ':' + ctx.request.body.minute;
    console.log(date);
    const r = await eventsModel.insert(ctx.db,ctx.request.body.title,date,ctx.request.body.image,ctx.request.body.location);
    ctx.redirect('/events/'+(r.id));
}

async function getMonth(month) {
    const monthsArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    for (let i = 0; i <= 11; i++) {
        if (monthsArray[i] == month) {
            return i + 1;
        }
    }
}

module.exports = {
    index,
    index1
};
