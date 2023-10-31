const Question = require('../../app/models/question');

const questionResolvers = {
  Query: {
    getQuestions: async () => {
      try {
        const questions = await Question.find();
        return questions;
      } catch (error) {
        throw new Error('Failed to fetch questions');
      }
    },
  },
  Mutation: {
    createQuestion: async ({ category, content, parent_category }) => {
      try {
        const newQuestion = new Question({ category, content, parent_category });
        await newQuestion.save();
        return newQuestion;
      } catch (error) {
        throw new Error('Failed to create question');
      }
    },
  }
};

module.exports = questionResolvers;