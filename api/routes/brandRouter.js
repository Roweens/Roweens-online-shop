const Router = require('express');
const brandContoller = require('../controllers/brandController');
const router = new Router();
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole('ADMIN'), brandContoller.create);

router.get('/', brandContoller.getAll);

module.exports = router;
