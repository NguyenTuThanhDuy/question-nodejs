const express = require('express');
const { createUser, getUsers, login, updateUser } = require('../controllers/userController');

const router = express.Router();

router.get('/users', getUsers);
router.post('/signup', createUser);
router.post('/deactivate', updateUser);
router.post('/login', login);
module.exports = router;