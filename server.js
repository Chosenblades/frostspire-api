const express = require('express');
const dotenv = require('dotenv');
const errorHandler = require('./middleware/errorHandler');
const connectToDatabase = require('./config/db');
const users = require('./routes/users');
const highscores = require('./routes/highscores');

dotenv.config({ path: './config/config.env' });

const PORT = process.env.PORT || 5000;

connectToDatabase();

const app = express();

// Body parser
app.use(express.json());

app.use('/api/users', users);
app.use('/api/highscores', highscores);

app.use(errorHandler);

const server = app.listen(PORT, console.log(`Server started in ${process.env.NODE_ENV} mode on port ${PORT}`));

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1));
})