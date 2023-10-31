const { buildSchema } = require('graphql');

const questionSchema = buildSchema(`
  type Question {
    id: ID!
    category: String!,
    content: String!,
    parent_category: String,
  }

  type QuestionArray {
    items: [Question!]!,
    total_records: Int
  }

  type Query {
    questions: QuestionArray
  }

  type Mutation {
    createQuestion(category: String!, content: String!, parent_category: String): Question
  }
`);

module.exports = questionSchema;