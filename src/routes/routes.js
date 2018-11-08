const Router = require('koa-router');
const indexControllers = require('../controllers/index.js');
const newEventControllers = require('../controllers/newEvent.js');
const eventDetailControllers = require('../controllers/eventDetail.js');
const aboutControllers = require('../controllers/about.js');
const donateControllers = require('../controllers/donate.js');
const analyticsControllers = require('../controllers/analytics.js');


const router = new Router();
router.get('/', indexControllers.index);
router.get('/events/new', newEventControllers.index);
router.post('/events/new', newEventControllers.index1);
router.get('/events/:id', eventDetailControllers.index);
router.post('/events/:id', eventDetailControllers.index_p);
router.get('/about', aboutControllers.about);
router.get('/donate', donateControllers.donate);
router.get('/analytics', analyticsControllers.analytics);

module.exports = router;
