// models/version.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VersionSchema = new Schema({
    env: {
        type: String,
        unique: true,
        index: true
    },
    ver: String,
    build: String
});

module.exports = mongoose.model('Version', VersionSchema);