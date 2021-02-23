const router = require('express').Router();
const { getUsers, getUserProfile, createUser } = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:id', getUserProfile);
router.post('/users', createUser);

module.exports = router;
