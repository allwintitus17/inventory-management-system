const express=require('express');
const auth=require('../middleware/auth');
const router=new express.Router();
const {createProducts,getProducts,getProduct,updateProduct,deleteProduct}=require('../controllers/productsControllers')

router.post('/',auth,createProducts);
router.get('/',auth,getProducts);
router.get('/:id',auth,getProduct);
router.put('/:id',auth,updateProduct)
router.delete('/:id',auth,deleteProduct)
module.exports=router;