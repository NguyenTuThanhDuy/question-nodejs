const express = require("express");
const cors = require("cors");
const winston = require("winston");
const morgan = require("morgan");
const DailyRotateFile = require('winston-daily-rotate-file');
const { format } = require('date-fns');
const path = require('path');
const bodyParser = require("body-parser");

const { ApolloServer } = require("apollo-server-express");
const userRoutes = require("./routes/userRoutes");
const questionRoutes = require("./routes/questionRoutes");
const mergedGQLSchema = require("../graphql/schema");
const mergedGQLResolver = require("../graphql/resolver");

// Define a custom colorizer function
const colorizer = winston.format.colorize();

const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Set up the Winston logger
const logger = winston.createLogger({
  level: "info", // Set the desired log level
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.printf((info) => {
      const { timestamp, level, message } = info;
      const coloredLevel = colorizer.colorize(level, level.toUpperCase());
      return `${timestamp} ${coloredLevel}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(), // Log to the console
    new DailyRotateFile({
      filename: path.join('./log', 'logs-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m', // Optional: maximum size for each log file
      maxFiles: '30d' // Optional: maximum number of log files to keep
    })
  ],
});

// Define a custom stream for Morgan to use the Winston logger
const stream = {
  write: function (message) {
    logger.info(message.trim());
  },
};

// Add the logging middleware to your Express application
app.use(morgan("combined", { stream }));

// Custom middleware to log request details
app.use((req, res, next) => {
  logger.info("Request Details", {
    ip: req.ip,
    url: req.originalUrl,
    method: req.method,
  });
  next();
});
app.use(bodyParser.json({ limit: "10mb" })); // Adjust the limit as per your requirements
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" })); // Adjust the limit as per your requirements
// Middleware
app.use(express.json());

// Routes
app.use("/api", userRoutes);
app.use("/api", questionRoutes);

async function startApolloServer(typeDefs, resolvers) {
  const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    introspection: true,
  });

  await server.start();
  server.applyMiddleware({ app, path: "/api/graphql" });
}
// Create an Apollo Server
startApolloServer(mergedGQLSchema, mergedGQLResolver);
module.exports = app;
