const Order = require('../schemas/order');
const OrderDetail = require('../schemas/orderDetail'); // Assuming you have an OrderDetail schema
const Product = require('../schemas/product'); // Assuming you have a Product schema

const getAllOrders = async () => {
    try {
        const orders = await Order.find().populate('user', 'email');
        return orders;
    } catch (error) {
        throw new Error('Error fetching orders.');
    }
}

const createOrder = async (userid, items) => {
    try {
        if (!Array.isArray(items) || items.length === 0) {
            throw new Error('Empty order items');
        }

        const products = await Product.find({ _id: { $in: items.map(i => i.productId) } });
        const order = new Order({
            user: userid,
            totalPrice: 0 // tạm thời
        });
        await order.save();

        const orderDetails = items.map(item => {
            const product = products.find(p => p._id.equals(item.productId));
            const unitPrice = product?.price || 0;
            return {
                order: order._id,
                product: product._id,
                quantity: item.quantity,
                unitPrice: unitPrice,
                total: unitPrice * item.quantity
            };
        });
        const totalPrice = orderDetails.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
        order.totalPrice = totalPrice;
        await order.save(); // cập nhật tổng tiền

        await OrderDetail.insertMany(orderDetails);

        return order;
    } catch (error) {
        console.error('MongoDB Error:', error.message);
        throw new Error('Error creating order.');
    }
};


const getOrderById = async (id) => {
    try {
        const order = await Order.findById(id).populate('user', 'email');
        return order;
    } catch (error) {
        throw new Error('Error fetching order by ID.');
    }
}

const getDetailsByOrderId = async (orderId) => {
    try {
        const orderDetails = await OrderDetail.find({ order: orderId }).populate('product', 'productName price images');
        return orderDetails;
    } catch (error) {
        throw new Error('Error fetching order details by order ID.');
    }
}

const getOrderByUserId = async (userId) => {
    try {
        const orders = await Order.find({ user: userId }).populate('user', 'email');
        return orders;
    } catch (error) {
        throw new Error('Error fetching orders by user ID.');
    }
}

const getOrderByEmail = async (email) => {
    try {
        const order = await Order.findOne({ 'user.email': email }).populate('user', 'email');
        return order;   
    } catch (error) {
        throw new Error('Error fetching order by email.');
    }
}

const updateOrder = async (id, orderData) => {
    try {
        const order = await Order.findByIdAndUpdate(id, orderData, { new: true }).populate('user', 'email');
        return order;
    } catch (error) {
        throw new Error('Error updating order.');
    }
}

const deleteOrder = async (id) => {
    try {
        const order = await Order.findByIdAndDelete(id);
        return order;
    } catch (error) {
        throw new Error('Error deleting order.');
    }
}

module.exports = {
    getAllOrders,
    createOrder,
    getOrderById,
    updateOrder,
    deleteOrder,
    getOrderByUserId,
    getOrderByEmail,
    getDetailsByOrderId,
    // Add more order-related functions here as needed
};