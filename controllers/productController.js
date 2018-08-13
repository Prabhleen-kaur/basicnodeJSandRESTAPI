const express = require('express')
const mongoose = require('mongoose')
const shortid = require('shortid');
const ProductModel = mongoose.model('Product')
const response = require('./../libs/responseLib')
const time = require('./../libs/timeLib');
const check = require('./../libs/checkLib')
const logger = require('./../libs/loggerLib')

let getAllProducts=(req,res)=>
{
    ProductModel.find()
    .lean()//to create into JS
    .exec((err,result)=>
    {
if(err)
{
  logger.error(err.message, 'product Controller: getAllProducts', 10)
  let apiResponse = response.generate(true,'Failed to find product detail',500,null)
   
    res.send(apiResponse)
}else if(check.isEmpty(result))
{
  logger.info('No product Found', 'product Controller: getAllProducts')
  let apiResponse = response.generate(true,'No product found',404,null)
  
    res.send(apiResponse);
}
else{
  let apiResponse = response.generate(false,'Product Detail Found',200,result)
    res.send(apiResponse)
}
    }
)} //end get all products
let viewByProductId=(req,res)=>
{
    ProductModel.findOne({ 'productId': req.params.productId },(err,result)=>
    {
if(err)
{
  logger.error(`Error Occured : ${err}`, 'Database', 10)
  let apiResponse = response.generate(true,'Failed to find product detail',500,null)
 
    res.send(apiResponse)
}else if(check.isEmpty(result))
{
  let apiResponse = response.generate(true,'No Blog Found',404,null) 
 
    res.send(apiResponse);
}
else{
 
  let apiResponse = response.generate(false,'Product Detail Found',200,result)
    res.send(apiResponse)
}
    }
 )}
 let viewByCategory = (req, res) => {

  ProductModel.find({ 'category': req.params.category }, (err, result) => {

      if (err) {
        let apiResponse = response.generate(true,'Failed to find product detail',500,null)
          console.log(err)
          res.send(apiResponse)
      } else if (result == undefined || result == null || result == '') {
        let apiResponse = response.generate(true,'No Blog Found',404,null)
          console.log('No Product Found')
          res.send(apiResponse)
      } else {
        let apiResponse = response.generate(false,'Product Detail Found',200,result)
          res.send(apiResponse)

      }
  })
}
let deleteProduct = (req, res) => {
  ProductModel.remove({ 'productId': req.params.productId }, (err, result) => {
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
let editProduct = (req, res) => {

  let options = req.body;
  console.log(options);
  ProductModel.update({ 'productId': req.params.productId }, options, { multi: true }).exec((err, result) => {

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
let createProduct = (req, res) => {
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
          res.send(result)

      }
  }) 
}


module.exports={
  getAllProducts:getAllProducts,
  viewByProductId:viewByProductId,
  viewByCategory:viewByCategory,
  deleteProduct:deleteProduct,
  editProduct:editProduct,
  createProduct:createProduct

}