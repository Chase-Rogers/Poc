const express = require('express');
const productRouter = express.Router();
const Product = require('../models/product.js');

// Get all
productRouter.get('/', (req, res, next) => {
    Product.find((err, product) => {
        if (err) {
            res.status(500);
            return next(err);
        }
        return res.status(200).send(product);
    });
});

//Get by id
productRouter.get('/:productId', (req, res, next) => {
    Product.findById(req.params.productId, (err, product) => {
        if (err) {
            if (err.name === 'CastError' || err.name === 'ValidationError') {
                return res.status(400).send(err);
            } else {
                return res.status(500).send(err);
            }
        }
        return res.status(200).send(product);
    });
});

// add new product
productRouter.post('/', (req, res, next) => {
    const newProduct = new Product(req.body);
    newProduct.save((err, savedProduct) => {
        if (err) {
            if (err.name === 'CastError' || err.name === 'ValidationError') {
                return res.status(400).send(err);
            } else {
                return res.status(500).send(err);
            }
        }
        return res.status(201).send(savedProduct);
    });
});

// Delete product by id
productRouter.delete('/:productId', (req, res, next) => {
    Product.findOneAndDelete(
        { _id: req.params.productId },
        (err, deletedProduct) => {
            if (err) {
                if (err.name === 'CastError' || err.name === 'ValidationError') {
                    return res.status(400).send(err);
                } else {
                    return res.status(500).send(err);
                }
            }
            return res.status(200).send(deletedProduct);
        }
    );
});

// edit product by id
productRouter.put('/:productId', async (req, res, next) => {
    Product.findOneAndUpdate(
        { _id: req.params.productId },
        req.body,
        { new: true, upsert: true, runValidators: true },
        (err, updatedProduct) => {
            if (err) {
                if (err.name === 'CastError' || err.name === 'ValidationError') {
                    return res.status(400).send(err);
                } else {
                    return res.status(500).send(err);
                }
            }
            return res.status(200).send(updatedProduct);
        }
    );
});

module.exports = productRouter;
