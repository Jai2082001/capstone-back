const { ServerDescriptionChangedEvent } = require('mongodb');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ShelterSchema = new Schema({
  OrganizationName: {
    type: String,
    required: true
  },    
  OrganizationRepMail: {
    type: String,
    required: true
  },
  OrganizationRepPhoneNumber: {
    type: String,
    required: true
  },
  SecretKey: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Organization', ShelterSchema);
