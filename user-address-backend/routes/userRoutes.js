const express = require('express');
const router = express.Router();

const User = require('../models/User');
const Address = require('../models/Address');

// ➤ Create a new user
router.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ➤ Add a new address for a user
router.post('/users/:userId/address', async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const address = await Address.create(req.body);
    user.addresses.push(address._id);
    await user.save();

    res.status(201).json(address);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ➤ Get summary: total users, total addresses, and address count per user
router.get('/users/summary', async (req, res) => {
  try {
    const users = await User.find().populate('addresses');

    const totalUsers = users.length;
    const totalAddresses = users.reduce((sum, user) => sum + user.addresses.length, 0);

    const summary = users.map(user => ({
      name: user.name,
      addressCount: user.addresses.length,
    }));

    res.json({
      totalUsers,
      totalAddresses,
      users: summary,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ➤ Get full user details with all addresses
router.get('/users/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('addresses');
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ➤ BONUS: Delete a specific address from a user
router.delete('/users/:userId/address/:addressId', async (req, res) => {
  try {
    const { userId, addressId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.addresses.pull(addressId);
    await user.save();

    await Address.findByIdAndDelete(addressId);

    res.json({ message: 'Address deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
