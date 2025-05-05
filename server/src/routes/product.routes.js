import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

import {
    createProduct,
    getProduct,
    updateProduct,
    getAllProducts,
    deleteProduct,
    createProductReview
} from '../controllers/product.controller.js';


const router = Router()


router.route('/')
    .post(upload.single('image'), createProduct)
    .get(getAllProducts)

router.route('/:id')
    .get(getProduct)
    .post(upload.single('image'), updateProduct)
    .delete(deleteProduct)

router.route('/reviews/:id')
    .post(createProductReview)
    

export default router