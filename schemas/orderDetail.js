const mongoose = require('mongoose');

const orderDetailSchema = new mongoose.Schema({
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true }, // khóa ngoại
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // liên kết tới bảng Product
    quantity: { type: Number, required: true }, // số lượng sản phẩm
    unitPrice: { type: Number, required: true }, // giá đơn vị của sản phẩm
    total: { type: Number, required: true }  // quantity * unitPrice
}, {
    timestamps: true
});

module.exports = mongoose.model('OrderDetail', orderDetailSchema);
