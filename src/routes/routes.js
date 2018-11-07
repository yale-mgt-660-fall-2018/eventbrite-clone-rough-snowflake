const Router = require('koa-router');
const indexControllers = require('../controllers/index.js');
const aboutControllers = require('../controllers/about.js');
const donateControllers = require('../controllers/donate.js');

const router = new Router();
router.get('/', indexControllers.index);
router.get('/about', aboutControllers.about);
router.get('/donate', donateControllers.donate);

module.exports = router;
