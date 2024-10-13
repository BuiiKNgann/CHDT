const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const dbConnect = require('./config/dbConnect')
const cookieParser = require('cookie-parser')
dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

app.use(cors())
// Sử dụng middleware tích hợp của Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
// Định nghĩa routes
routes(app);

 
dbConnect()

// Lắng nghe cổng
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
