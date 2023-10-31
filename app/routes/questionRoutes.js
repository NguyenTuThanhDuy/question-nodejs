const express = require('express');
const { createQuestion, createQuestions, getQuestions, deleteQuestion, deleteQuestions } = require('../controllers/questionController');

const router = express.Router();

router.get('/questions', getQuestions);
router.post('/questions', createQuestion);
router.post('/questions/create', createQuestions);
router.delete('/questions', deleteQuestion);
router.post('/questions/delete', deleteQuestions);

module.exports = router;