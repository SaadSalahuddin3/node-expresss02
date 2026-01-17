const Vehicle = require('../models/Vehicle');

// A. VEHICLE CRUD

exports.createVehicle = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.create(req.body);
    res.status(201).json(vehicle);
  } catch (err) {
    next(err);
  }
};

exports.getVehicles = async (req, res, next) => {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json(vehicles);
  } catch (err) {
    next(err);
  }
};

exports.updateVehicle = async (req, res, next) => {
  try {
    const updated = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Vehicle not found' });
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};

exports.deleteVehicle = async (req, res, next) => {
  try {
    const deleted = await Vehicle.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Vehicle not found' });
    res.status(200).json({ message: 'Vehicle deleted' });
  } catch (err) {
    next(err);
  }
};

// B. TRIP OPERATIONS

exports.addTrip = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });

    vehicle.trips.push(req.body);
    await vehicle.save();
    res.status(200).json(vehicle);
  } catch (err) {
    next(err);
  }
};

exports.updateTrip = async (req, res, next) => {
  try {
    const { tripId } = req.params;
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });

    const trip = vehicle.trips.id(tripId);
    if (!trip) return res.status(404).json({ message: 'Trip not found' });

    Object.assign(trip, req.body);
    await vehicle.save();
    res.status(200).json(vehicle);
  } catch (err) {
    next(err);
  }
};

exports.deleteTrip = async (req, res, next) => {
  try {
    const { tripId } = req.params;
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });

    vehicle.trips = vehicle.trips.filter(t => t._id.toString() !== tripId);
    await vehicle.save();
    res.status(200).json({ message: 'Trip deleted', vehicle });
  } catch (err) {
    next(err);
  }
};

// C. ADVANCED QUERIES

exports.vehiclesWithLongTrips = async (req, res, next) => {
  try {
    const vehicles = await Vehicle.find({ 'trips.distance': { $gt: 200 } });
    res.status(200).json(vehicles);
  } catch (err) {
    next(err);
  }
};

exports.vehiclesFromCities = async (req, res, next) => {
  try {
    const cities = ['Delhi', 'Mumbai', 'Bangalore'];
    const vehicles = await Vehicle.find({ 'trips.startLocation': { $in: cities } });
    res.status(200).json(vehicles);
  } catch (err) {
    next(err);
  }
};

exports.vehiclesWithTripsAfterDate = async (req, res, next) => {
  try {
    const date = new Date('2024-01-01');
    const vehicles = await Vehicle.find({ 'trips.startTime': { $gte: date } });
    res.status(200).json(vehicles);
  } catch (err) {
    next(err);
  }
};

exports.carsOrTrucks = async (req, res, next) => {
  try {
    const vehicles = await Vehicle.find({ type: { $in: ['car', 'truck'] } });
    res.status(200).json(vehicles);
  } catch (err) {
    next(err);
  }
};

exports.getTotalDistance = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });

    const total = vehicle.totalDistance();
    res.status(200).json({ totalDistance: total });
  } catch (err) {
    next(err);
  }
};
