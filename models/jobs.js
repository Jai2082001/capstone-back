const { ServerDescriptionChangedEvent } = require('mongodb');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ShelterSchema = new Schema({
  JobTitle: {
    type: String,
    required: true
  },
  SkillDescription: {
    type: String,
    required: true
  },
  JobAvailability: {
    type: String,
    required: true
  },
  JobDescription: {
    type: String,
    required: true
  },
  Contact:{
    type: String,
    required: false
  },
  AddedBy: {
    type: String,
    required: true
  }
 
});

module.exports = mongoose.model('Job', ShelterSchema);
