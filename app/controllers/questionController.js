const Question = require('../models/question');

const getQuestions = async (req, res) => {
    try {
      const questions = await Question.find();
      res.status(200).json(questions);
    } catch (error) {
      console.error('Error fetching questions:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
};

const createQuestion = async (req, res) => {
  const { category, content, parent_category } = req.body;

  try {
    const newQues = new Question({ category, content, parent_category });
    await newQues.save();
    res.status(201).json({ message: 'Question created successfully' });
  } catch (error) {
    console.error('Error creating question:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
  
module.exports = { createQuestion, getQuestions };