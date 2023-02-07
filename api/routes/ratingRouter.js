const Router = require('express');
const ratingContoller = require('../controllers/ratingController');
const router = new Router();

router.post('/', ratingContoller.create);

module.exports = router;
