const Router = require('express');
const router = new Router();

const userRoutes = require('./userRoutes');

router.use('/user', userRoutes);

module.exports = router;
