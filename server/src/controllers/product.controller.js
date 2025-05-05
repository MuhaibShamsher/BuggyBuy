import Product from '../models/product.model.js';
import Review from '../models/review.modal.js';
import { uploadOnCloudinary, deleteOnCloudinary } from '../utilis/cloudinary.js';


// @desc     Fetch All Products
// @method   GET
// @endpoint /api/v1/products?limit=2&skip=0&search=shoes
// @access   Public
const getAllProducts = async (req, res) => {
    const maxLimit = parseInt(process.env.PAGINATION_MAX_LIMIT) || 20;
    const total = await Product.countDocuments();

    const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), maxLimit);
    const skip = Math.max(parseInt(req.query.skip) || 0, 0);
    const search = req.query.search?.trim() || '';

    try {
        const query = search
            ? {
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { brand: { $regex: search, $options: 'i' } }
                ]
            }
            : {};

        const products = await Product.find(query)
            .limit(limit)
            .skip(skip);

        return res.status(200).json({
            success: true,
            message: products.length > 0 ? 'Products fetched successfully' : 'No products found',
            data: {
                products,
                currentCount: products.length,
                total,
                limit,
                skip,
                maxLimit,
            }
        });
    } catch (error) {
        console.error('Error fetching products:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Server error while fetching products',
        });
    }
};


// @desc     Fetch Single Product
// @method   GET
// @endpoint /api/v1/products/:id
// @access   Public
const getProduct = async (req, res) => {
    try {
        const { id: productId } = req.params;
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found!' });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};


// @desc     Create product
// @method   POST
// @endpoint /api/v1/products
// @access   Private/Admin
const createProduct = async (req, res) => {
    try {
        const { name, description, brand, category, price, countInStock } = req.body;

        if (!name || !description || !brand || !category || !price || !countInStock) {
            return res.status(400).json({ message: 'All required fields must be provided' });
        }

        let imageUploaded = "";
        if (req.file) {
            imageUploaded = await uploadOnCloudinary(req.file.path);
        }

        const product = new Product({
            name,
            image: imageUploaded === ""
                ? "https://res.cloudinary.com/dsankxd9a/image/upload/v1746212742/Vulnerable%20Web%20App/zsz0ayqlsis4muffvhsl.jpg"
                : imageUploaded.url,
            description,
            brand,
            category,
            price,
            countInStock,
        });

        const createdProduct = await product.save();

        res.status(200).json({ message: 'Product created successfully', createdProduct });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};


// @desc     Update product
// @method   PUT
// @endpoint /api/v1/products/:id
// @access   Private/Admin
const updateProduct = async (req, res) => {
    try {
        const { name, description, brand, category, price, countInStock } = req.body;
        const { id: productId } = req.params;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found!' });
        }

        const previousImage = product.image;

        product.name = name || product.name;
        product.description = description || product.description;
        product.brand = brand || product.brand;
        product.category = category || product.category;
        product.price = price || product.price;
        product.countInStock = countInStock || product.countInStock;

        let imageUploaded = previousImage;
        if (req.file) {
            imageUploaded = await uploadOnCloudinary(req.file.path);
            product.image = imageUploaded.url;

            if (previousImage !== "https://res.cloudinary.com/dsankxd9a/image/upload/v1746212742/Vulnerable%20Web%20App/zsz0ayqlsis4muffvhsl.jpg") {
                deleteOnCloudinary(previousImage);
            }
        }

        const updatedProduct = await product.save();

        res.status(200).json({ message: 'Product updated successfully', updatedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};


// @desc    Delete product
// @method   DELETE
// @endpoint /api/v1/products/:id
// @access   Admin
const deleteProduct = async (req, res) => {
    const { id: productId } = req.params;

    try {
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found!' });
        }

        if (product.image !== "https://res.cloudinary.com/dsankxd9a/image/upload/v1746212742/Vulnerable%20Web%20App/zsz0ayqlsis4muffvhsl.jpg") {
            try {
                const deleted = deleteOnCloudinary(product.image);

                if (!deleted) {
                    return res.status(500).json({ message: 'Failed to delete!' });
                }
            } catch (fileErr) {
                console.warn('Image deletion failed:', fileErr.message);
            }
        }

        await Product.deleteOne({ _id: product._id });
        return res.status(200).json({ message: 'Product deleted successfully' });

    } catch (err) {
        return res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};


// @desc    Create product review
// @method   POST
// @endpoint /api/v1/products/reviews/:id
// @access   Admin
const createProductReview = async (req, res) => {
    try {
        const { id: productId } = req.params;
        const { rating, name, userId } = req.body;
        
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found!' });
        }
        
        // Get all existing reviews for this product
        const reviews = await Review.find({ _id: { $in: product.reviews } });
        
        // Create a new review
        const newReview = await Review.create({
            user: userId,
            name,
            rating: Number(rating)
        });


        // Add review reference to product
        product.reviews.push(newReview._id);

        // Recalculate rating
        const allRatings = [...reviews.map(r => r.rating), newReview.rating];
        product.rating = allRatings.reduce((a, b) => a + b, 0) / allRatings.length;
        product.numReviews = allRatings.length;

        await product.save();

        res.status(201).json({ message: 'Review added' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
}