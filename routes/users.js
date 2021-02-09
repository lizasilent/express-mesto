const router = require('express').Router();
const {getUsers, getUserProfile} = require("../controllers/users");


router.get('/', getUsers);
router.get('/:id', getUserProfile);

module.exports = router;