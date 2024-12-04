const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    image: { type: String, default: 'no-image.jpg' },
    postDate: { type: Date, default: new Date(), required: true },
    postSlug: { type: String, required: true },
});

module.exports = mongoose.model('Post', postSchema);