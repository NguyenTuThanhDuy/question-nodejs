const express = require('express');
const multer = require('multer');
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
const { authenticateToken } = require('../controllers/userController');

const upload = multer();
const router = express.Router();
router.use(authenticateToken);
router.get('/questions', getQuestions);
router.post('/questions', createQuestion);
router.post('/questions/upload', upload.single('csvFile'), createQuestions);
router.post('/questions/selected', getSelectedQuestions);
router.put('/questions/:question_id', updateQuestion);
router.delete('/questions/:question_id', deleteQuestion);
router.post('/questions/delete', deleteQuestions);
router.post('/questions/export', exportCSV);

module.exports = router;