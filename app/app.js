const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const questionRoutes = require('./routes/questionRoutes');
const mergedGQLSchema = require('../graphql/schema');
const mergedGQLResolver = require('../graphql/resolver');

// Create an Apollo Server
const server = new ApolloServer({
    typeDefs: mergedGQLSchema,
    resolvers: mergedGQLResolver,
    introspection: true
});

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api', userRoutes);
app.use('/api', questionRoutes);

server.applyMiddleware({ app });

// GraphQL endpoint
// app.use(
//   '/graphql',
//   graphqlHTTP({
//     userSchema,
//     rootValue: userResolvers,
//     graphiql: true,
//   })
// );

// app.use(
//     'graphql',
//     graphqlHTTP({
//         questionSchema,
//         rootValue: questionResolvers,
//         graphiql: true,
//     })
// );

module.exports = app;