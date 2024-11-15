const mongoose = require('mongoose');

const petProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'You must provide a name'],
    trim: true,
    maxlength: [20, 'Name cannot be more than 20 characters']
  },
  age: {
    type: Number,
    required: [true, 'You must provide an age'],
    min: [0, 'Age cannot be less than 0'],
    max: [30, 'Age cannot be more than 30 years']
  },
  price: {
    type: Number,
    required: [true, 'You must provide a price']
  },
  location: {
    state: {
      type: String,
      required: [true, 'You must provide a state']
    },
    city: {
      type: String,
      required: [true, 'You must provide a city']
    }
  },
  breed: {
    type: String,
    required: [true, 'You must provide a breed'],
    trim: true,
    minlength: [2, 'Breed must be at least 2 characters']
  },
  description: {
    type: String,
    trim: true
  },
  behavior: {
    type: String,
    required: [true, 'You must provide a behavior description'],
    trim: true
  },
  history: {
    type: String,
    trim: true
  },
  profileImage: {
    type: {
        url: String,
        public_id: String
    },
    required: [true, 'You must provide a profile picture']
},
images: [
    {
        url: String,
        public_id: String
    }
],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('PetProfile', petProfileSchema);
