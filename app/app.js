const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const userRoutes = require('./routes/userRoutes');
const questionRoutes = require('./routes/questionRoutes');
const mergedGQLSchema = require('../graphql/schema');
const mergedGQLResolver = require('../graphql/resolver');

const app = express();
    
// Middleware
app.use(express.json());

// Routes
app.use('/api', userRoutes);
app.use('/api', questionRoutes);

async function startApolloServer(typeDefs, resolvers){
    const server = new ApolloServer({
        typeDefs: typeDefs,
        resolvers: resolvers,
        introspection: true
    });
    
    await server.start();
    server.applyMiddleware({ app, path: '/api/graphql' });
}
// Create an Apollo Server
startApolloServer(mergedGQLSchema, mergedGQLResolver);
module.exports = app;