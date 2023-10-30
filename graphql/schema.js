const { mergeTypeDefs } = require('@graphql-tools/merge');

const userSchema = require('./schemas/userSchema');
const questionSchema = require('./schemas/questionSchema');

const mergedGQLSchema = mergeTypeDefs([userSchema, questionSchema]);

module.exports = mergedGQLSchema;