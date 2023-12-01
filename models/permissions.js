const { ServerDescriptionChangedEvent } = require('mongodb');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ShelterSchema = new Schema({
    OrId: {
    type: String,
    required: true
  },
  Activity: {
    type: String,
    required: true
  },
  Model: {
    type: String,
    required: true
  },
  Permission: { 
    type: Object, 
    required: true    
  },
  Status: {
    type: String,
    required: true  
  },
  UniqueKey: {
    type: String,
    required: true  
  }
});

module.exports = mongoose.model('Permission', ShelterSchema);
