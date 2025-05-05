import { Router } from "express";
import {
    getReviewsByProductId
} from '../controllers/review.controller.js';


const router = Router()


router.route('/:id')
    .get(getReviewsByProductId)


export default router;