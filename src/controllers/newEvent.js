const eventsModel = require('../models/events.js');
const analyticsModel = require('../models/analytics.js');

/**
 * @param  {Context} ctx - A Koa Context
 * @returns {Promise} - Returns a promise that resolves to undefined
 */
async function index(ctx) {
    const template = 'newEvent.njk';
    await analyticsModel.getSessionId(ctx, "new_event");
    return ctx.render(template, { });
}

async function index1(ctx) {
    var month =  ctx.request.body.month;
    
    const monthsArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let monthAsNumber = '';
    for (let i = 0; i <= 11; i++) {
        if (monthsArray[i] == month) {
            monthAsNumber = i + 1;
        }
    }
    const date = monthAsNumber + '/' + ctx.request.body.day + '/' + ctx.request.body.year + ' ' + ctx.request.body.hour + ':' + ctx.request.body.minute;
    var r;
    if (ctx.request.body.title == "" || ctx.request.body.location == "" || ctx.request.body.image == ""){
        const template = 'newEvent.njk';
        await analyticsModel.getSessionId(ctx, "new_event");
        return ctx.render(template, { "error": "There was an error in your form" });
    }
    
    try{
        r = await eventsModel.insert(ctx.db,ctx.request.body.title,date,ctx.request.body.image,ctx.request.body.location);
    } catch(e){
         const template = 'newEvent.njk';
         await analyticsModel.getSessionId(ctx, "new_event");
         return ctx.render(template, { "error": "There was an error in your form" });
    }
    await analyticsModel.getSessionId(ctx, "create_event");
    ctx.redirect('/events/'+(r.id));
}

module.exports = {
    index,
    index1
};
