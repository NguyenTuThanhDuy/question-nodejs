const app = require('./app/app');
const connectDB = require('./config/database');

// Connect to MongoDB
connectDB();

// Start the server
const port = 4000; // Change this if you want to use a different port
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});