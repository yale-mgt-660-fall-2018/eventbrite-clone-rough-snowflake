const Router = require('koa-router');
const indexControllers = require('../controllers/index.js');
const helloControllers = require('../controllers/hello.js');
const aboutControllers = require('../controllers/about.js');

const router = new Router();
router.get('/', indexControllers.index);
router.get('/hello', helloControllers.hello);
router.get('/about', aboutControllers.about);

module.exports = router;
