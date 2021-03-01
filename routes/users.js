/* eslint-disable linebreak-style */
const router = require('express').Router();
const {
  getUsers, getUserProfile, createUser, updateUserInfo, updateAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:id', getUserProfile);
router.post('/users', createUser);
router.patch('/users/me', updateUserInfo);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
