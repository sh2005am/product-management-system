import express from "express"
import {protect} from "../middleware/authMiddleware.js"
import Product from "../models/Product.js"
const router = express.Router()
router.post("/", protect, async (req,res) => {
    try {
        const {name,price,image,stock,sku} = await req.body
        const product = new Product ({
            name,
            price,
            image,
            stock,
            sku,
            user: req.user.id
        })
        const createdProduct =await product.save()
        return res.status(201).json(createdProduct)
    }catch(error) {
        return res.status(500).json({message: error.messafe})
    }
})
router.put('/:id', protect, async (req, res) => {
    try {
        const { name, price, image, stock, sku } = req.body;
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        if (product.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        // FIX: Changed 'imageUrl' to 'image' to match your other code
        product.name = name || product.name;
        product.price = price || product.price;
        product.image = image || product.image; 
        product.stock = stock ?? product.stock; // Use ?? for numbers in case stock is 0
        product.sku = sku || product.sku;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});



router.get("/", protect, async (req,res) => {
        try {
            const product = await Product.find({user: req.user.id}).sort({createdAt: -1})
            return res.status(200).json(product)
        }catch (error) {
            return res.status(500).json({message: error.message})
        }
})


router.delete("/:id", protect, async (req,res) => {
    try {
        const product= await Product.findByIdAndDelete(req.params.id)
        return res.status(200).json(product)
    }catch (error) {
        return res.status(500).json({message: error.message})
    
    }
})
export default router;