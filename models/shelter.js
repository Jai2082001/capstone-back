const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ShelterSchema = new Schema({
  ShelterName: {
    type: String,
    required: true
  },    
  ShelterCompany: {
    type: String,
    required: true
  },
  ShelterDescription: {
    type: String,
    required: true
  },
  ResidentCapacity: {
    type: Number,
    required: true
  },
  ResidentPresentMember:{
    type: Number,
    required: true
  },
  ImageUrl: {
    type: String,
    required: false
  },
  AddedBy: {
    type: String,
    required: true
  },
  Enrolled: {
    type: Array,
    required: false
  }
});

module.exports = mongoose.model('Shelter', ShelterSchema);
