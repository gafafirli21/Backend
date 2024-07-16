const express = require('express');
const router = express.Router();
const Motorcycle = require('../models/Motorcyle');

// Get all motorcycles
router.get('/', async (req, res) => {
  try {
    const motorcycles = await Motorcycle.find();
    res.json(motorcycles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a motorcycle
router.post('/', async (req, res) => {
  const motorcycle = new Motorcycle({
    merk: req.body.merk,
    layanan: req.body.layanan,
    harga: req.body.harga
  });
  try {
    const newMotorcycle = await motorcycle.save();
    res.status(201).json(newMotorcycle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get a specific motorcycle
router.get('/:merk', getMotorcycleByMerk, (req, res) => {
  res.json(res.motorcycle);
});

// Update a motorcycle
router.put('/:merk', getMotorcycleByMerk, async (req, res) => {
  if (req.body.merk != null) {
    res.motorcycle.merk = req.body.merk;
  }
  if (req.body.layanan != null) {
    res.motorcycle.layanan = req.body.layanan;
  }
  if (req.body.harga != null) {
    res.motorcycle.harga = req.body.harga;
  }
  try {
    const updatedMotorcycle = await res.motorcycle.save();
    res.json(updatedMotorcycle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a motorcycle
router.delete('/:merk', getMotorcycleByMerk, async (req, res) => {
  try {
    await Motorcycle.deleteOne({ merk: res.motorcycle.merk });
    res.json({ message: 'Deleted Motorcycle' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getMotorcycleByMerk(req, res, next) {
  let motorcycle;
  try {
    motorcycle = await Motorcycle.findOne({ merk: req.params.merk });
    if (motorcycle == null) {
      return res.status(404).json({ message: 'Cannot find motorcycle' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.motorcycle = motorcycle;
  next();
}

module.exports = router;
