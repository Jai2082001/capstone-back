const { ServerDescriptionChangedEvent } = require('mongodb');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ShelterSchema = new Schema({
  name: {
    type: String,
    required: false
  },    
  description: {
    type: String,
    required: false
  },
  country: {
    type: String,
    required: false
  },
  province: {
    type: String,
    required: false
  },
  city: {
    type: String,
    required: false
  },
  phonenumber: {
    type: String,
    required: false
  },
  addedBy: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: false  
  }
});

module.exports = mongoose.model('Case', ShelterSchema);
