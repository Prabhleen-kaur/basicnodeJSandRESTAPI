const express = require('express');

const appConfig = require("./../config/appConfig")
const cartController = require('./../controllers/cartController')
const auth = require("./../middlewares/auth")

let setRouter = (app)=>
{
  let baseUrl = appConfig.apiVersion+'/cart';

	
  app.get(baseUrl+'/all',auth.isAuthenticated,cartController.getProducts);
   /**
     * @api {get} /api/v1/product/all Get all products
     * @apiVersion 0.0.1
     * @apiGroup read   
     * 
     * 
     * 
     * @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Product Details Found",
	    "status": 200,
	    "data": [
					{
						productId: "string",
            Name: "string",
            description:"string",
            bodyHtml:"string",
            category: "string",
              brand: "string",
                manufacturedOn: "date",
                expiryDate :"date"
            price: number,
            rating: number,
            warranty:"string",
            cashOnDelivery:boolean
					
				
					
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed To Find Product Details",
	    "status": 500,
	    "data": null
	   } */
     app.post(baseUrl+'/:productId/add',auth.isAuthenticated,cartController.addProductToCart);
 /**
     * @api {post} /api/v1/products/add Add a product
     * @apiVersion 0.0.1
     * @apiGroup create   
     * 
     * @apiParam {String} name the product name should be passed as the body parameter
     * @apiParam {String} description the product description should be passed as the body parameter
     * @apiParam {String} bodyHtml the product bodyHtml should be passed as the body parameter
     * @apiParam {String} category the product category should be passed as the body parameter
     * @apiParam {String} brand the product brand should be passed as the body parameter
     * @apiParam {Number} price the product price should be passed as the body parameter
     * @apiParam {Number} rating the product rating should be passed as the body parameter
     * @apiParam {String} warranty the product warranty should be passed as the body parameter
     * @apiParam {Boolean} cashOnDelivery the cashOnDelivery should be passed as the body parameter
     *
     * 
     * @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Product Details Found",
	    "status": 200,
	    "data": [
        {
		   productId: "string",
         Name: "string",
         description:"string",
         bodyHtml:"string",
         category: "string",
           brand: "string",
             manufacturedOn: "date",
             expiryDate :"date"
         price: number,
         rating: number,
         warranty:"string",
         cashOnDelivery:boolean
        }
                ]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed To Find Product Details",
	    "status": 500,
	    "data": null
	   }
	 */

app.post(baseUrl+'/:productId/delete',auth.isAuthenticated,cartController.deleteProduct);

  /**
     * @api {post} /api/v1/product/:productID/delete Delete a particular product 
     * @apiVersion 0.0.1
     * @apiGroup delete   
     * 
     * @apiParam {String} productID the productID should be passed as the URL parameter
     * 
     * @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Product Details Found",
	    "status": 200,
	    "data": []
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed To Find Product Details",
	    "status": 500,
	    "data": null
	   }
	 */
app.put(baseUrl + '/:productId/increaseQuantity',auth.isAuthenticated,  cartController.increaseQuantity);
 /**
* @api {get} /api/v1/product/:productId/increaseQuantity Update product
* @apiVersion 0.0.1
* @apiGroup read   
* 
* 
* 
* @apiSuccessExample {json} Success-Response:
*  {
 "error": false,
 "message": "Product Details Found",
 "status": 200,
 "data": [
     {
       productId: "string",
       Name: "string",
       description:"string",
       bodyHtml:"string",
       category: "string",
         brand: "string",
           manufacturedOn: "date",
           expiryDate :"date"
       price: number,
       rating: number,
       warranty:"string",
       cashOnDelivery:boolean
     
   
     
     }
     ]
   }
}
}
@apiErrorExample {json} Error-Response:
*
* {
 "error": true,
 "message": "Failed To Find Product Details",
 "status": 500,
 "data": null
}
*/
app.put(baseUrl + '/:productId/decreaseQuantity',auth.isAuthenticated,  cartController.decreaseQuantity);
 /**
* @api {get} /api/v1/product/:productId/deleteQuantity Update product
* @apiVersion 0.0.1
* @apiGroup read   
* 
* 
* 
* @apiSuccessExample {json} Success-Response:
*  {
 "error": false,
 "message": "Product Details Found",
 "status": 200,
 "data": [
     {
       productId: "string",
       Name: "string",
       description:"string",
       bodyHtml:"string",
       category: "string",
         brand: "string",
           manufacturedOn: "date",
           expiryDate :"date"
       price: number,
       rating: number,
       warranty:"string",
       cashOnDelivery:boolean
     
   
     
     }
     ]
   }
}
}
@apiErrorExample {json} Error-Response:
*
* {
 "error": true,
 "message": "Failed To Find Product Details",
 "status": 500,
 "data": null
}
*/
}
module.exports={
    setRouter:setRouter
}