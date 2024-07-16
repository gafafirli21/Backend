const mongoose = require('mongoose');

const motorcycleSchema = new mongoose.Schema({
  merk: {
    type: String,
    required: true
  },
  layanan: {
    type: String,
    required: true
  },
  harga: {
    type: Number,
    required: true
  }
},{collection: ('cuci')});

module.exports = mongoose.model('Motorcycle', motorcycleSchema);
