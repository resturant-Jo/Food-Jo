'use strict';

const express = require('express');
const dataModules = require('../models');
const bearerAuth = require('../middleware/bearerAuth');

const router = express.Router();

router.param('model', (req, res, next) => {
    const modelName = req.params.model;
    if (dataModules[modelName]) {
        req.model = dataModules[modelName];
        next();
    } else {
        next('Invalid Model');
    }
});

router.get('/:model', bearerAuth, handleGetAll);
router.get('/:model/:id', bearerAuth, handleGetOne);
router.get('/:model/items/:id', bearerAuth, handleGetCartItemsById);
router.post('/:model', bearerAuth, handleCreate);
router.put('/:model/:id', bearerAuth, handleUpdate);
router.delete('/:model/:id', bearerAuth, handleDelete);

async function handleGetAll(req, res) {

    let allRecords = await req.model.get();
    let cart = [];
    await Promise.all(allRecords.map(async (ele) => {
        let cartData = [];
        let totalPrice = 0;
        const cartItems = await dataModules.cartItems.getItemsByCartId(ele.id);
        cartItems.forEach(Item => {
            cartData.push({
                foodId: Item.dataValues.foodId,
                qty: Item.dataValues.qty,
                price: Item.dataValues.price
                
            })
            totalPrice += Item.dataValues.qty * Item.dataValues.price
        });
        cart.push({
            id: ele.id,
            userId: ele.userId,
            status: ele.status,
            totalPrice,
            cartData
        })
    }))

    res.status(200).json(cart)
}


async function handleGetOne(req, res) {
    const id = req.params.id;
    let allRecords = await req.model.get(id);
    console.log(dataModules.cart);

    res.status(200).json(allRecords);
}

async function handleGetCartItemsById(req, res) {
    const id = req.params.id;
    let allRecords = await dataModules.cartItems.getItemsByCartId(id);
    res.status(200).json(allRecords);
}



async function handleCreate(req, res) {
    const { userId, food } = req.body;
    let cart = await req.model.create({ userId });
    console.log(dataModules.cartItems);
    let totalPrice = 0;
    await Promise.all(food.map(async ele => {
        const obj = {
            foodId: ele.foodId,
            qty: ele.qty,
            price: ele.price,
            cartId: cart.id
        }
        await dataModules.cartItems.create(obj);
        totalPrice += ele.price * ele.qty;
    }));

    let Items = await dataModules.cartItems.getItemsByCartId(cart.id);
    res.status(201).json({ userId, cartId: cart.id, totalPrice, Items: Items });
}

async function handleUpdate(req, res) {
    const id = req.params.id;
    const obj = req.body;
    let updatedRecord = await req.model.update(id, obj)
    res.status(200).json(updatedRecord);
}

async function handleDelete(req, res) {
    let id = req.params.id;
    let deletedRecord = await req.model.delete(id);
    res.status(200).json(deletedRecord);
}


module.exports = router;