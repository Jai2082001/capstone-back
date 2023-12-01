const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  amount: {
    type: String,
    required: true
  },
  
  stripe_id: {
    type: String,
    required: true
  },    
  user: {
    type: String,
    required: true
  }

});

module.exports = mongoose.model('payment', userSchema);




//   getOrders() {
//     const db = getDb();
//     return db
//       .collection('orders')
//       .find({ 'user._id': new ObjectId(this._id) })
//       .toArray();
//   }

//   static findById(userId) {
//     const db = getDb();
//     return db
//       .collection('users')
//       .findOne({ _id: new ObjectId(userId) })
//       .then(user => {
//         console.log(user);
//         return user;
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }
// }

// module.exports = User;
