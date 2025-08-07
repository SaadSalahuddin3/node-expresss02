const express = require('express');
const router = express.Router();
const vehicleCtrl = require('../controllers/vehicleController');

// Vehicle CRUD
router.post('/vehicles', vehicleCtrl.createVehicle);
router.get('/vehicles', vehicleCtrl.getVehicles);
router.put('/vehicles/:id', vehicleCtrl.updateVehicle);
router.delete('/vehicles/:id', vehicleCtrl.deleteVehicle);

// Trip operations
router.post('/vehicles/:id/trips', vehicleCtrl.addTrip);
router.put('/vehicles/:id/trips/:tripId', vehicleCtrl.updateTrip);
router.delete('/vehicles/:id/trips/:tripId', vehicleCtrl.deleteTrip);

// Queries
router.get('/queries/long-trips', vehicleCtrl.vehiclesWithLongTrips);
router.get('/queries/from-cities', vehicleCtrl.vehiclesFromCities);
router.get('/queries/trips-after-date', vehicleCtrl.vehiclesWithTripsAfterDate);
router.get('/queries/cars-or-trucks', vehicleCtrl.carsOrTrucks);

// Bonus
router.get('/vehicles/:id/total-distance', vehicleCtrl.getTotalDistance);

module.exports = router;
