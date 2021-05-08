const mongoose = require('mongoose')
const { Schema } = mongoose

const dataSchema = new Schema({
  location: String,
  activity: String,
  image_url: String,
  description: String
}, { timestamps: true })

const holidayItem = mongoose.model('holidayData', dataSchema)
module.exports = holidayItem
