const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    order_id: Number,
    customer_name: String,
    items: [String],
    total_amount: Number,
    order_status: String
});

module.exports = mongoose.model('Order', OrderSchema);
