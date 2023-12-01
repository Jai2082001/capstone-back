const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const VolunteerSchema = new Schema({
  EventName: {
    type: String,
    required: true
  },    
  EventOrganization: {
    type: String,
    required: true
  },
  EventDescription: {
    type: String,
    required: true
  },
  VolunteersNeed: {
    type: Number,
    required: true
  },
  VolunteersPresent:{
    type: Number,
    required: true
  },
  ContactInformation:{
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
  },
  Enrolled: {
    type: Array,
    required: false
  }
 
});

module.exports = mongoose.model('Volunteer', VolunteerSchema);
