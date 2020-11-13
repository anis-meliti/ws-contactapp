const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: String,
  phoneNumber: String,
});

module.exports = Contact = mongoose.model('contact', contactSchema);
