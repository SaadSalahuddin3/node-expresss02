const User = require('../models/User');
const Profile = require('../models/Profile');

// Add user
exports.addUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

// Add profile
exports.addProfile = async (req, res, next) => {
  try {
    const { bio, socialMediaLinks, user } = req.body;

    // Check if user exists
    const existingUser = await User.findById(user);
    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if profile already exists for this user
    const existingProfile = await Profile.findOne({ user });
    if (existingProfile) {
      return res.status(400).json({ error: 'Profile already exists for this user' });
    }

    const profile = await Profile.create({ bio, socialMediaLinks, user });
    res.status(201).json(profile);
  } catch (err) {
    next(err);
  }
};

// Get all profiles with user populated
exports.getAllProfiles = async (req, res, next) => {
  try {
    const profiles = await Profile.find().populate('user', 'name email');
    res.status(200).json(profiles);
  } catch (err) {
    next(err);
  }
};
