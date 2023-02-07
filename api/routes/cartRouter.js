const Router = require('express');
const cartContoller = require('../controllers/cartController');
const router = new Router();

router.post('/', cartContoller.addToBasket);
router.post('/delete', cartContoller.deleteFromBasket);
router.get('/', cartContoller.getBasket);

module.exports = router;
