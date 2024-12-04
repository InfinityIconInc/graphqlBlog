const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    lastlogin: { type: Date, default: Date.now },
    avatar: { type: String, default: 'no-image.jpg'},
});

module.exports = mongoose.model('User', userSchema);