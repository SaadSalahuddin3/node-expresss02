const Publisher = require('../models/publisherModel');

exports.createPublisher = async (req, res) => {
  try {
    const publisher = new Publisher(req.body);
    await publisher.save();
    res.status(201).json(publisher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllPublishers = async (req, res) => {
  try {
    const publishers = await Publisher.find();
    res.status(200).json(publishers);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getPublisherById = async (req, res) => {
  try {
    const publisher = await Publisher.findById(req.params.id);
    if (!publisher) return res.status(404).json({ message: 'Publisher not found' });
    res.status(200).json(publisher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updatePublisher = async (req, res) => {
  try {
    const publisher = await Publisher.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!publisher) return res.status(404).json({ message: 'Publisher not found' });
    res.status(200).json(publisher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deletePublisher = async (req, res) => {
  try {
    const publisher = await Publisher.findByIdAndDelete(req.params.id);
    if (!publisher) return res.status(404).json({ message: 'Publisher not found' });
    res.status(200).json({ message: 'Publisher deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
