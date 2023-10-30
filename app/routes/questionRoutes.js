const express = require('express');
const { createQuestion, getQuestions } = require('../controllers/questionController');

const router = express.Router();

router.get('/questions', getQuestions);
router.post('/questions', createQuestion);

module.exports = router;