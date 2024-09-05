const Product=require('../models/products');
const User=require('../models/users')
const mongoose=require('mongoose')
const createProducts=async(req,res)=>{
        
        const product=new Product({
            
            ...req.body,
            user:req.user._id
            
        })
        try{
            await product.save()
            res.status(200).send(product)
        }catch(e){
            res.status(400).send(e)
        }

    }


const getProducts = async (req, res) => {
    try {
        const products = await Product.find({ user: req.user._id });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const getProduct = async (req, res) => {
    try {
        // Check if user exists
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // Check if product exists
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Return the product
        res.status(200).json(product);
    } catch (error) {
        // Handle server error
        res.status(500).json({ message: 'Server error' });
    }
};




const updateProduct = async (req, res) => {
    try {
        // Validate user
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // Validate product ID
        const productId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: 'Invalid product ID format' });
        }

        // Validate product
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check authorization
        if (product.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        // Update product
        const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product update failed' });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};




const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Ensure the product belongs to the authenticated user
        if (product.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        // Remove the product using findByIdAndDelete
        await Product.findByIdAndDelete(req.params.id);

        return res.status(200).json({ success: true, id: product._id, message: 'Product deleted successfully' });

    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};



module.exports={
    createProducts,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
}