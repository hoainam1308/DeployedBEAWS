const {getAllOrders, createOrder, getOrderById, getOrderByUserId, getOrderByEmail, updateOrder, deleteOrder, getDetailsByOrderId} = require('../services/orderServices');
const { CreateSuccessResponse, CreateErrorResponse } = require('../handlers/responseHandler');

const GetAllOrders = async (req, res) => {
    try {
        const orders = await getAllOrders();
        return CreateSuccessResponse(res, 200, orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        return CreateErrorResponse(res, 500, 'Internal server error');
    }
}

const CreateOrder = async (req, res) => {
    try {
        const user = req.user; // Assuming user is set by authentication middleware
        if (!user) {
            return CreateErrorResponse(res, 401, 'Unauthorized: User not authenticated');
        }
        // Set user ID from authenticated user
        const items = req.body.items; // Assuming items are sent in the request body
        if (!items || items.length === 0) {
            return CreateErrorResponse(res, 400, 'Bad Request: No items provided');
        }
        const newOrder = await createOrder(user._id, items);
        return CreateSuccessResponse(res, 201, newOrder);
    } catch (error) {
        console.error("Error creating order:", error);
        return CreateErrorResponse(res, 500, 'Internal server error');
    }
}

const GetOrderById = async (req, res) => {
    try {
        const orderId = req.params.id; // Assuming order ID is passed as a URL parameter
        const order = await getOrderById(orderId);
        if (!order) {
            return CreateErrorResponse(res, 404, 'Order not found');
        }
        return CreateSuccessResponse(res, 200, order);
    } catch (error) {
        console.error("Error fetching order by ID:", error);
        return CreateErrorResponse(res, 500, 'Internal server error');
    }
}

const GetOrderByUserId = async (req, res) => {
    try {
        const userId = req.params.userId; // Assuming user ID is passed as a URL parameter
        const orders = await getOrderByUserId(userId);
        if (!orders || orders.length === 0) {
            return CreateErrorResponse(res, 404, 'No orders found for this user');
        }
        return CreateSuccessResponse(res, 200, orders);
    } catch (error) {
        console.error("Error fetching orders by user ID:", error);
        return CreateErrorResponse(res, 500, 'Internal server error');
    }
}

const GetMyOrders = async (req, res) => {
    try {
        console.log("Fetching orders for user:", req.user);
        const userId = req.user._id; // Assuming user ID is passed as a URL parameter
        const orders = await getOrderByUserId(userId);
        if (!orders || orders.length === 0) {
            return CreateErrorResponse(res, 404, 'No orders found for this user');
        }
        return CreateSuccessResponse(res, 200, orders);
    } catch (error) {
        console.error("Error fetching orders by user ID:", error);
        return CreateErrorResponse(res, 500, 'Internal server error');
    }
}

const GetOrderByEmail = async (req, res) => {
    try {
        const email = req.params.email; // Assuming email is passed as a URL parameter
        const order = await getOrderByEmail(email);
        if (!order) {
            return CreateErrorResponse(res, 404, 'Order not found for this email');
        }
        return CreateSuccessResponse(res, 200, order);
    } catch (error) {
        console.error("Error fetching order by email:", error);
        return CreateErrorResponse(res, 500, 'Internal server error');
    }
}

const GetDetailsByOrderId = async (req, res) => {
    try {
        const orderId = req.params.id; // Assuming order ID is passed as a URL parameter
        const orderDetails = await getDetailsByOrderId(orderId);
        return CreateSuccessResponse(res, 200, orderDetails);
    } catch (error) {
        console.error("Error fetching order details by order ID:", error);
        return CreateErrorResponse(res, 500, 'Internal server error');
    }
}

const UpdateOrder = async (req, res) => {
    try {
        const orderId = req.params.id; // Assuming order ID is passed as a URL parameter
        const orderData = req.body; // Assuming updated order data is sent in the request body
        const updatedOrder = await updateOrder(orderId, orderData);
        if (!updatedOrder) {
            return CreateErrorResponse(res, 404, 'Order not found');
        }
        return CreateSuccessResponse(res, 200, updatedOrder);
    } catch (error) {
        console.error("Error updating order:", error);
        return CreateErrorResponse(res, 500, 'Internal server error');
    }
}

const DeleteOrder = async (req, res) => {
    try {
        const orderId = req.params.id; // Assuming order ID is passed as a URL parameter
        const deletedOrder = await deleteOrder(orderId);
        if (!deletedOrder) {
            return CreateErrorResponse(res, 404, 'Order not found');
        }
        return CreateSuccessResponse(res, 200, deletedOrder);
    } catch (error) {
        console.error("Error deleting order:", error);
        return CreateErrorResponse(res, 500, 'Internal server error');
    }
}
module.exports = {
    GetAllOrders,
    CreateOrder,
    GetOrderById,
    GetOrderByUserId,
    GetOrderByEmail,
    UpdateOrder,
    DeleteOrder,
    GetMyOrders,
    GetDetailsByOrderId
};