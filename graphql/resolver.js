const { mergeResolvers } = require('@graphql-tools/merge');

const userResolvers = require('./resolvers/userResolvers');
const questionResolvers = require('./resolvers/questionResolvers');

const mergedGQLResolver = mergeResolvers([userResolvers, questionResolvers]);

module.exports = mergedGQLResolver;