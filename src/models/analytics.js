async function getSessionId(ctx, page) {
   const x = await get_user(ctx.db, ctx.session.user);
   if (x.length==0) {
        const r = await insert_user(ctx.db, ctx.headers.referer || 'null');
        await insert_pageview(ctx.db, r.id, page);
        ctx.session.user = r.id;
        // console.log("inserted user "+r.id+" and pageview "+page);
        // user has not logged in
    } 
    else {
        await insert_pageview(ctx.db, ctx.session.user, page);
        // console.log("inserted pageview "+page+" for user "+ctx.session.user);
        // user has already logged in
    } 
    return ctx.session.user;
}

async function insert_user(db, referer) {
    // Notice that our JavaScript variables are CamelCase
    // and our SQL variables are snake_case. This is a
    // common convention.
    const stmt = `
        INSERT INTO users (referer)
        VALUES ($1)
        RETURNING id, referer
    `;
    return db.one(stmt, [referer]);
}

async function get_user(db, id) {
    // Notice that our JavaScript variables are CamelCase
    // and our SQL variables are snake_case. This is a
    // common convention.
    const stmt = `
        SELECT * FROM users WHERE id = $1
    `;
    return db.any(stmt, [id]);
}

async function insert_pageview(db, user_id, page) {
    // Notice that our JavaScript variables are CamelCase
    // and our SQL variables are snake_case. This is a
    // common convention.
    const stmt = `
        INSERT INTO pageviews (user_id, p)
        VALUES ($1, '$2:value') 
        RETURNING user_id, p
    `;
    return db.one(stmt, [user_id, page]);
}

async function get_analytics(db){
    const stmt = `
        SELECT referer , mod(users.id,2) AS case,SUM(CASE WHEN p='home' THEN 1 ELSE 0 END) AS count_home, SUM(CASE WHEN p='event' THEN 1 ELSE 0 END) AS count_event ,  
        SUM(CASE WHEN p='new_event' THEN 1 ELSE 0 END) AS count_newevent, SUM(CASE WHEN p='about' THEN 1 ELSE 0 END) AS count_about,
        SUM(CASE WHEN p='donate' THEN 1 ELSE 0 END) AS count_donate, SUM(CASE WHEN p='create_event' THEN 1 ELSE 0 END) AS count_createevent,
        SUM(CASE WHEN p='add_attendee' THEN 1 ELSE 0 END) AS count_addattendee
        FROM users LEFT JOIN pageviews on users.id = pageviews.user_id
        GROUP BY referer, mod(users.id,2);
    `;
    return db.any(stmt, []);
}

module.exports = {
    getSessionId,
    insert_user,
    insert_pageview,
    get_user,
    get_analytics
};
