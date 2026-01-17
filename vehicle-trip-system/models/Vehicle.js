const mongoose = require('mongoose');
const { Schema } = mongoose;

const tripSchema = new Schema({
  startLocation: {
    type: String,
    required: [true, 'Start location is required']
  },
  endLocation: {
    type: String,
    required: [true, 'End location is required']
  },
  distance: {
    type: Number,
    required: [true, 'Distance is required'],
    min: [1, 'Distance must be greater than 0']
  },
  startTime: {
    type: Date,
    required: [true, 'Start time is required']
  },
  endTime: {
    type: Date,
    required: [true, 'End time is required']
  }
});

const vehicleSchema = new Schema({
  registrationNumber: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    enum: ['car', 'truck', 'bike'],
    required: true
  },
  model: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  trips: [tripSchema]
});

// BONUS: Custom instance method
vehicleSchema.methods.totalDistance = function () {
  return this.trips.reduce((acc, trip) => acc + trip.distance, 0);
};

module.exports = mongoose.model('Vehicle', vehicleSchema);
