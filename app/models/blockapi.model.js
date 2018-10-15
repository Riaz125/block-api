const mongoose = require('mongoose');

const NamesSchema = mongoose.Schema({
    first: String,
    last: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Names', NamesSchema);
