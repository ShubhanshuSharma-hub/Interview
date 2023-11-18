require('dotenv').config();
const express = require('express');
const app = express();

const connectDB = require('./utils/connect');
const { authenticateToken } = require('./middleware/auth')

// routers
const servicesRouter = require('./routes/services');
const categoryRouter = require('./routes/category');
const authRouter = require('./routes/auth');

app.use(express.json());

// routes
app.use('/interview/service', authenticateToken, servicesRouter);
app.use('/interview/category', authenticateToken, categoryRouter);
app.use('/interview/auth', authRouter);
const port = 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server is listening on the port ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();
