const mongoose = require("mongoose");

const gatewaySchema = mongoose.Schema({
  "serialNumber": {type: Number, required: true},
  "name": {type: String, required: true},
  "ipv4": {type: String, required: true},
  "devices": [{
    "uid": {type: Number, required: true},
    "vendor": {type: String, required: false},
    "dateCreated": {type: String, required: false},
    "status": {type: String, required: true}
  }]
});

module.exports = mongoose.model('Gateway', gatewaySchema);
