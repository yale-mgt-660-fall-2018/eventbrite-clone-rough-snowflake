const eventsModel = require('../models/events.js');
const analyticsModel = require('../models/analytics.js');

/**
 * @param  {Context} ctx - A Koa Context
 * @returns {Promise} - Returns a promise that resolves to undefined
 */
async function index(ctx) {
    const template = 'eventDetail.njk';
    const e = await eventsModel.getById(ctx.db,ctx.params.id);
    const eventDetails = e[0];
    const attendees = await eventsModel.getAttendees(ctx.db,ctx.params.id);
    const i = await analyticsModel.getSessionId(ctx, "event");
    const donateText = {"text":"Donate"};
    if (i % 2 == 0){
        donateText.text = "Support"; 
    }
    return ctx.render(template, { eventDetails , attendees, donateText});
}

async function index_p(ctx) {
    const template = 'eventDetail.njk';
    const e = await eventsModel.getById(ctx.db,ctx.params.id);
    const eventDetails = e[0];
    
    try{
    await eventsModel.addAttendee(ctx.db,[ctx.params.id,ctx.request.body.email]);
    }catch(e){
        const template = 'eventDetail.njk';
        const i = await analyticsModel.getSessionId(ctx, "add_attendee");
        const donateText = {"text":"Donate"};
        if (i % 2 == 0){
            donateText.text = "Support"; 
        }
        const attendees = await eventsModel.getAttendees(ctx.db,ctx.params.id);
        return ctx.render(template, { eventDetails , attendees, donateText, "error": "Invalid Email Address" });
    }
    const attendees = await eventsModel.getAttendees(ctx.db,ctx.params.id);
    const i = await analyticsModel.getSessionId(ctx, "add_attendee");
    const donateText = {"text":"Donate"};
    if (i % 2 == 0){
        donateText.text = "Support"; 
    }
    const confirm = eventsModel.getConfirmation(ctx.request.body.email);
    const confirm_text = "Confirmation Code: "+confirm;
    return ctx.render(template, { eventDetails , attendees , donateText, confirm_text});
}

module.exports = {
    index,
    index_p
};
