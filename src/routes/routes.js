const Router = require('koa-router');
const indexControllers = require('../controllers/index.js');
const helloControllers = require('../controllers/hello.js');

const router = new Router();
router.get('/', indexControllers.index);
router.get('/hello', helloControllers.hello);

module.exports = router;
