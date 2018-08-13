const express = require('express')
const mongoose = require('mongoose')
const CartModel = mongoose.model('Cart')
const response = require('./../libs/responseLib')
const time = require('./../libs/timeLib');
const check = require('./../libs/checkLib')
const logger = require('./../libs/loggerLib')



let getProducts=(req,res)=>
{
    CartModel.find()
    .lean()//to create into JS
    .exec((err,result)=>
    {
if(err)
{
    logger.error(err.message, 'product Controller: getAllProducts', 10)
    let apiResponse = response.generate(true,'Failed to find product detail',500,null)
    console.log(err)
    res.send(apiResponse)
}else if(check.isEmpty(result))
{
    let apiResponse = response.generate(true,'No Product Found',404,null)
    console.log('No product found');
    res.send(apiResponse);
}
else{
    let apiResponse = response.generate(false,'Product Detail Found',200,result)
    res.send(apiResponse)
}
    }
)} //end get  products
let addProductToCart = (req, res) => {
    var today = Date.now()
    let productId = shortid.generate()
  
    let newProduct = new ProductModel({
  
        productId: productId,
      name: req.body.name,
        description: req.body.description,
        bodyHtml: req.body.blogBody,
        category: req.body.category,
        brand: req.body.brand,
        manufacturedOn: time.now(),
        expiryDate: today,
        price: req.body.price,
        rating: req.body.rating,
        warranty:req.body.warranty,
        cashOnDelivery:req.body.cashOnDelivery
  
    }) 
  
    newProduct.save((err, result) => {
        if (err) {
            logger.error(`Error Occured : ${err}`, 'Database', 10)
          let apiResponse = response.generate(true,'Failed to find product detail',500,null)
            console.log(err)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false,'Product Detail Found',200,result)
            res.send(apiResponse)
  
        }
    }) 
  }
  
 
 let deleteProduct = (req, res) => {
    CartModel.remove({ 'productId': req.params.blogId }, (err, result) => {
        if (err) {
            logger.error(`Error Occured : ${err}`, 'Database', 10)
            let apiResponse = response.generate(true,'Failed to find product detail',500,null)
            console.log(err)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            let apiResponse = response.generate(true,'No Product Found',404,null)
            console.log('No Product Found')
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false,'Product Detail Found',200,result)
            res.send(apiResponse)

        }
    })
}
let increaseQuantity = (req, res) => {

    let options = req.body;
    console.log(options);
    CartModel.update({ 'productId': req.params.blogId }, options, { multi: true }).exec((err, result) => {

        if (err) {
            logger.error(`Error Occured : ${err}`, 'Database', 10)
            let apiResponse = response.generate(true,'Failed to find product detail',500,null)
            console.log(err)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            let apiResponse = response.generate(true,'No Product Found',404,null)
            console.log('No Product Found')
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false,'Product Detail Found',200,result)
            res.send(apiResponse)

        }
    })
}
let decreaseQuantity = (req, res) => {

    let options = req.body;
    console.log(options);
    CartModel.update({ 'productId': req.params.ProductId }, options, { multi: true }).exec((err, result) => {

        if (err) {
            logger.error(`Error Occured : ${err}`, 'Database', 10)
            let apiResponse = response.generate(true,'Failed to find product detail',500,null)
            console.log(err)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            let apiResponse = response.generate(true,'No Blog Found',404,null)
            console.log('No Product Found')
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false,'Product Detail Found',200,result)
            res.send(apiResponse)

        }
    })
}
module.exports={
   getProducts:getProducts,
addProductToCart:addProductToCart,
   deleteProduct:deleteProduct,
   increaseQuantity:increaseQuantity,
   decreaseQuantity:decreaseQuantity
}