//importing mongoose
const mongoose = require('mongoose');
//import Schems
const Schema = mongoose.Schema;
let cartSchema = new Schema ({
 customerId:{
     type:String,
     unique:true
 },
 productId:{
    type:String,
    unique:true
 },
 nameOfProduct:{
     type:String,
     unique:true
 },
 quantity:{
     type:Number,
     default:""
 }
})
mongoose.model('Cart',cartSchema);