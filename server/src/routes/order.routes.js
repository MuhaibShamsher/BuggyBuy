import { Router } from 'express'
// import verifyJWT from '../middlewares/auth.middleware.js'
import {
    addOrderItems,
    updateOrderToDeliver,
    getOrderById,
    updateOrderToPaid,
    getMyOrders,
    getOrders
} from '../controllers/order.controller.js'

const router = Router()

router.route('/')
    .post(addOrderItems)
    .get(getOrders)

router.route('/:id')
    .get(getOrderById)

router.route('/:id/deliver')
    .put(updateOrderToDeliver)

router.route('/:id/pay')
    .put(updateOrderToPaid)

router.route('/my-orders/:id')
    .get(getMyOrders)

    
export default router