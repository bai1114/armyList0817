// model/user   --schema

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var soldierSchema   = new Schema({
  imgURL: String,
  name: String,
  sex: String,
	rank: String,
  startDate: Date,
  phone: Number,
  email: String,
  superiorId: Schema.Types.ObjectId,
});

module.exports = mongoose.model('army', soldierSchema);
