const { ServerDescriptionChangedEvent } = require('mongodb');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ShelterSchema = new Schema({
  PageTitle: {
    type: String,
    required: true
  },
  PageSubtitle: {
    type: String,
    required: true
  },
  PageDescription: {
    type: String,
    required: true
  },
  ImageUrl: {
    type: String,
    required: false  
  }
 
});

module.exports = mongoose.model('blog', ShelterSchema);
