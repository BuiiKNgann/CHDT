const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const routes = require('./routes');

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

// Sử dụng middleware tích hợp của Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Định nghĩa routes
routes(app);

// Kết nối đến MongoDB
mongoose.connect(`${process.env.MONGO_DB}`)
    .then(() => {
        console.log('Connect DB success!');
    })
    .catch((err) => {
        console.log(err);
    });

// Lắng nghe cổng
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
