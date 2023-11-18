const mongoose = require('mongoose');

const connectDB = async (uri, dbName) => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //   useCreateIndex: true,
            //   useFindAndModify: false,
        });

        console.log('MongoDB Connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
