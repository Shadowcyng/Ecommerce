const express = require('express');
const Product = require('../models/productModel');
const { getToken } = require('../utill/utill');
const { isAuth, isAdmin } = require('../utill/auth');
const { validateProductForm } = require('../utill/validator');
const expressAsyncHandler = require('express-async-handler');

const router = express.Router();

//get Products
router.get(
	'/',
	expressAsyncHandler(async (req, res) => {
		console.log('object');
		const products = await Product.find({});
		return res.json(products);
	})
);

//get Product
router.get(
	'/product/:id',
	expressAsyncHandler(async (req, res) => {
		const product = await Product.findOne({ _id: req.params.id });
		if (product) {
			res.status(201).json(product);
		} else {
			res.status(404).json({ message: 'Product not found' });
		}
	})
);
router.post(
	'/search',
	expressAsyncHandler(async (req, res) => {
		let filteredProduct = [];
		const product = await Product.find({});
		if (product) {
			product.map((p) => {
				if (
					p.name.toLowerCase().indexOf(req.body.searchInput.toLowerCase()) !=
						-1 ||
					p.category
						.toLowerCase()
						.indexOf(req.body.searchInput.toLowerCase()) != -1
				) {
					// console.log(`p`, p);
					filteredProduct.push(p);
				}
			});
			// console.log(`search`, req.body.searchInput);
			// console.log(`filteredProduct`, filteredProduct);
			if (filteredProduct) {
				res.status(201).json(filteredProduct);
			} else {
				res.status(404).json({ message: 'No Product Found' });
			}
		}
	})
);

//Create Product
router.post(
	'/product',
	isAuth,
	isAdmin,
	expressAsyncHandler(async (req, res) => {
		const { valid, errors } = validateProductForm(req.body);
		if (!valid) return res.status(401).json(errors);
		const product = new Product({
			name: req.body.name,
			price: req.body.price,
			image: req.body.image,
			brand: req.body.brand,
			category: req.body.category,
			countInStock: req.body.countInStock,
			description: req.body.description,
			rating: req.body.rating,
			numReviews: req.body.numReviews,
		});
		const newProduct = await product.save();
		if (newProduct) {
			return res
				.status(201)
				.json({ message: 'New Product Created', data: newProduct });
		} else {
			return res.status(500).json({ message: 'Error in creating product' });
		}
	})
);
//Update Product
router.put(
	'/product/:id',
	isAuth,
	isAdmin,
	expressAsyncHandler(async (req, res) => {
		const productId = req.params.id;
		const product = await Product.findById(productId);
		if (product) {
			product._id = product._id;
			product.name = req.body.name;
			product.price = req.body.price;
			product.image = req.body.image;
			product.brand = req.body.brand;
			product.category = req.body.category;
			product.countInStock = req.body.countInStock;
			product.description = req.body.description;
			product.rating = product.rating;
			product.numReviews = product.numReviews;
			const updatedProduct = await product.save();
			if (updatedProduct) {
				return res
					.status(201)
					.json({ message: 'Product Updated', data: updatedProduct });
			}
		}
		return res.status(500).json({ message: 'Error in updating product' });
	})
);

//Delete Product
router.delete(
	'/product/:id',
	isAuth,
	isAdmin,
	expressAsyncHandler(async (req, res) => {
		const productId = req.params.id;
		const deletedProduct = await Product.findById(productId);
		if (deletedProduct) {
			await deletedProduct.remove();
			return res
				.status(201)
				.json({ message: 'Product Deleted', data: deletedProduct });
		}
		return res.status(500).json({ message: 'Error in deletion' });
	})
);

module.exports = router;
