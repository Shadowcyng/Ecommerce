const express = require('express');
const User = require('../models/userModel');
const { getToken } = require('../utill/utill');
const expressAsyncHandler = require('express-async-handler');
const { route } = require('./productRoute');
const { validateSignupData, validateLoginData } = require('../utill/validator');
const { isAuth } = require('../utill/auth');

const router = express.Router();

router.get(
	'/createadmin',
	expressAsyncHandler(async (req, res) => {
		try {
			const user = new User({
				name: 'satyam',
				email: 'satyam.singhania123@gmail.com',
				password: '123456',
				isAdmin: true,
			});
			const newUser = await user.save();
			res.json(newUser);
		} catch (error) {
			res.json({ message: error.message });
		}
	})
);

router.post(
	'/signin',
	expressAsyncHandler(async (req, res) => {
		const { valid, errors } = validateLoginData(req.body);
		if (!valid) {
			return res.status(401).json(errors);
		}
		const signinUser = await User.findOne({
			email: req.body.email,
			password: req.body.password,
		});
		if(signinUser) {
			return res.json({
				_id: signinUser.id,
				name: signinUser.name,
				email: signinUser.email,
				isAdmin: signinUser.isAdmin,
				token: getToken(signinUser),
			});
		} else {
			return res.status(401).json({ message: 'Invalid email or password' });
		}
	})
);

router.post(
	'/register',
	expressAsyncHandler(async (req, res) => {
		const { valid, errors } = validateSignupData(req.body);
		if (!valid) return res.status(401).json(errors);
		const user = new User({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
		});
		const newUser = await user.save();
		if (newUser) {
			return res.json({
				_id: newUser.id,
				name: newUser.name,
				email: newUser.email,
				isAdmin: newUser.isAdmin,
				token: getToken(newUser),
			});
		} else {
			return res.status(401).json({ message: 'Invalid User Data' });
		}
	})
);

router.put(
	'/:id',
	isAuth,
	expressAsyncHandler(async (req, res) => {
		try {
			const user = await User.findOne({ _id: req.params.id });
			console.log('user', user);
			if (user) {
				user.name = req.body.name ? req.body.name : user.name;
				user.email = req.body.email ? req.body.email : user.email;
				user.password = req.body.password ? req.body.password : user.password;
				const updatedUser = await user.save();
				if (updatedUser) {
					return res.status(201).send({
						_id: updatedUser._id,
						name: updatedUser.name,
						email: updatedUser.email,
						isAdmin: updatedUser.isAdmin,
						token: getToken(updatedUser),
					});
				}
			} else {
				return res.status(404).send({ message: 'user not found' });
			}
			return res.status(500).send({ message: 'Error in updating user' });
		} catch (e) {
			console.log('e', e);
		}
	})
);

module.exports = router;
