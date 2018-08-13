//importing mongoose
const mongoose = require('mongoose');
//import Schems
const Schema = mongoose.Schema;
let productSchema = new Schema (
 {   productId :{
type: String,
unique:true
    },
    Name:{
     type:String,
     default:''
    },
    description:{
        type:String,
        default:''
    },
    bodyHtml :{
        type:String,
        default:''
    },
  
    category:{
        type:String,
        default:''
    },
    brand:{
type:String,
default:''
    },
    manufacturedOn :{
        type:Date,
        default:Date.now
    },
    expiryDate:{
        type:Date,
        default:Date.now
    },
    price:{
type:Number,
default:''
    },
    rating:{
        type:Number,
        default:''
    },
    warranty:{
        type:String,
        default:''
    },
    cashOnDelivery:{
        type:Boolean,
        default:false
    }
  
 })
 mongoose.model('Product',productSchema);