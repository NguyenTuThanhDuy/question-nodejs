const express = require('express');
const {
    createQuestion,
    createQuestions,
    getQuestions,
    deleteQuestion,
    deleteQuestions,
    getSelectedQuestions,
    updateQuestion,
    exportCSV,
} = require('../controllers/questionController');

const router = express.Router();

router.get('/questions', getQuestions);
router.post('/questions', createQuestion);
router.post('/questions/create', createQuestions);
router.post('/questions/selected', getSelectedQuestions);
router.put('/questions/:question_id', updateQuestion);
router.delete('/questions', deleteQuestion);
router.post('/questions/delete', deleteQuestions);
router.post('/questions/export', exportCSV);

module.exports = router;