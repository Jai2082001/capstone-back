const { ServerDescriptionChangedEvent } = require('mongodb');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ShelterSchema = new Schema({
  LegalOrgName: {
    type: String,
    required: true
  },
  LegalProName: {
    type: String,
    required: true
  },
  LegalProDescription: {
    type: String,
    required: true
  },
  LegalOrgDescription: {
    type: String,
    required: true
  },
  ContactInfo: {
    type: String,
    required: true
  },
  ImageUrl: {
    type: String,   
    required: false
  },
  AddedBy: {
    type: String,
    required: true 
  }
 ,
 Enrolled: {
  type: Array,
  required: false
 }
});

module.exports = mongoose.model('Legal', ShelterSchema);
