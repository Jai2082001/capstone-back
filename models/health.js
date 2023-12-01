const { ServerDescriptionChangedEvent } = require('mongodb');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ShelterSchema = new Schema({
  HealthName: {
    type: String,
    required: true
  },
  HealthProDescription: {
    type: String,
    required: true
  },
  
  HealthOrganization: {
    type: String,
    required: true
  },

  HealthOrgDescription: {
    type: String,
    required: true
  },
  
  ImageUrl: {
    type: String,   
    required: false
  },

  Contact:{
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

module.exports = mongoose.model('Health', ShelterSchema);
