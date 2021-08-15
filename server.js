const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

app.use(express.json());
app.use(morgan('dev'));

mongoose.connect(
    'mongodb://localhost:27017/poc',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    },
    () => console.log('Connected to the DB')
);

app.use('/api', require('./routes/productRouter.js'));

app.use((err, req, res, next) => {
    console.log(err);
    if (err.name === 'UnauthorizedError') {
        res.status(err.status);
    }
    return res.send({ errMsg: err.message });
});

app.listen(8005, () => {
    console.log(`Server is running on local port 8005`);
});
