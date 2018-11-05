const Router = require('koa-router');
const indexControllers = require('../controllers/index.js');
const newEventControllers = require('../controllers/newEvent.js');
const eventDetailControllers = require('../controllers/eventDetail.js');

const router = new Router();
router.get('/', indexControllers.index);
router.get('/events/new', newEventControllers.index);
router.post('/events/new', newEventControllers.index1);
router.get('/events/:id', eventDetailControllers.index);
router.post('/events/:id', eventDetailControllers.index_p);

module.exports = router;
