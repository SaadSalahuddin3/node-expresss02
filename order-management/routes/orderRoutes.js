const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// 1. Insert Sample Orders (once)
router.post('/seed', async (req, res) => {
  try {
    const sampleOrders = require('../data/orders.json');
    await Order.insertMany(sampleOrders);
    res.json({ message: 'Sample data inserted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Get all shipped orders
router.get('/shipped', async (req, res) => {
  const orders = await Order.find({ order_status: 'shipped' });
  res.json(orders);
});

// 3. Update total_amount of order_id 1 to 70000
router.put('/update-total', async (req, res) => {
  await Order.updateOne({ order_id: 1 }, { $set: { total_amount: 70000 } });
  res.json({ message: 'Order total updated' });
});

// 4. Delete order with order_id 4
router.delete('/delete/:id', async (req, res) => {
  await Order.deleteOne({ order_id: parseInt(req.params.id) });
  res.json({ message: 'Order deleted' });
});

// 5. Get order by customer_name
router.get('/customer/:name', async (req, res) => {
  const order = await Order.findOne({ customer_name: req.params.name });
  res.json(order);
});

// 6. Update order_status of order_id 2 to delivered
router.put('/update-status', async (req, res) => {
  await Order.updateOne({ order_id: 2 }, { $set: { order_status: 'delivered' } });
  res.json({ message: 'Order status updated' });
});

// 7. Get all orders with total_amount >= 15000
router.get('/expensive', async (req, res) => {
  const orders = await Order.find({ total_amount: { $gte: 15000 } });
  res.json(orders);
});

module.exports = router;
