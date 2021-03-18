const express = require('express');

//mongo
const config = require('./utill/config');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const mongodburl = config.MONGODB_URL;
mongoose
	.connect(mongodburl, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.catch((error) => console.log(error));

app.use('/api/users/', userRoute);
app.use('/api/products/', productRoute);

app.use((err, req, res, next) => {
	const status = err.name && err.name == 'ValidationError' ? 400 : 500;
	res.status(status).json({ message: err.message });
});
app.listen(5000, config.LOCAL_ADDRESS, () => {
	// const address = app.addListener();
	console.log('server listening at 5000');
});
