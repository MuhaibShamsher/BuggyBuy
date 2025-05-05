import Order from '../models/order.modal.js';


// @desc     Create new order
// @method   POST
// @endpoint /api/v1/orders
// @access   Private
const addOrderItems = async (req, res) => {
    const {
        userID,
        cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
        return res.status(400).json({ message: 'No order items.' });
    }

    try {
        const order = new Order({
            user: userID,
            orderItems: cartItems.map(item => ({
                ...item,
                product: item._id,
            })),
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });

        const createdOrder = await order.save();

        return res.status(201).json(createdOrder);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


// @desc     Update order to delivered
// @method   PUT
// @endpoint /api/v1/orders/:id/deliver
// @access   Private/Admin
const updateOrderToDeliver = async (req, res) => {
    try {
        const { id: orderId } = req.params;

        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found!' });
        }

        order.isDelivered = true;
        order.deliveredAt = new Date();

        const updatedDeliver = await order.save();

        res.status(200).json(updatedDeliver);
    } catch (error) {
        res.status(500).json({ message: 'Server error while updating delivery status.' });
    }
};


// @desc     Get order by ID
// @method   GET
// @endpoint /api/v1/orders/:id
// @access   Private
const getOrderById = async (req, res) => {
    try {
        const { id: orderId } = req.params;

        const order = await Order.findById(orderId).populate('user', 'name email');

        if (!order) {
            return res.status(404).json({ message: 'Order not found!' });
        }

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Server error while fetching order.' });
    }
};


// @desc     Update order to paid
// @method   PUT
// @endpoint /api/v1/orders/:id/pay
// @access   Private
const updateOrderToPaid = async (req, res) => {
    try {
        const { id: orderId } = req.params;
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found!' });
        }

        order.isPaid = true;
        order.paidAt = new Date();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.updateTime,
            email_address: req.body.email,
        };

        const updatedOrder = await order.save();

        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: 'Server error while updating payment status.' });
    }
};


const getMyOrders = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const orders = await Order.find({ user: req.params.id });

        if (!orders.length) {
            return res.status(404).json({ message: 'No orders found for this user.' });
        }

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error fetching orders.' });
    }
};


export {
    addOrderItems,
    updateOrderToDeliver,
    getOrderById,
    updateOrderToPaid,
    getMyOrders
}