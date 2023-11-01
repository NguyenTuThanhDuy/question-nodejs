const Question = require('../../app/models/question');

const questionResolvers = {
  Query: {
    questions: async () => {
      try {
        let questions = await Question.find();
        let total_records = await Question.countDocuments();
        let resp = {items: questions, total_records: total_records};
        return resp;
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