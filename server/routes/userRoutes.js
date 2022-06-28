const Router = require('express');
const router = new Router();
const UserController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/registration', UserController.registration);
router.post('/login', UserController.login);
router.get('/auth', authMiddleware, UserController.check);

router.get('/scores', UserController.getAllScores);
router.get('/:id', UserController.getUserInfoById);
router.post('/score', UserController.getAllScores);

module.exports = router;
