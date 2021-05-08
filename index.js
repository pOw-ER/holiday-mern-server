const express = require('express')
require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
const holidayItem = require('./models/holidayData')
const port = process.env.PORT || 5000
const uri = process.env.dbUri
const app = express()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

mongoose.connect(uri,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, () => {
    console.log('connected database');
    app.listen(port, () => {
      console.log(`connected local host ${port}`);
    })
  })

app.get('/', (req, res) => {
  // const newItem = new holidayItem({
  //   location: "Indonesia",
  //   activity: "Yoga",
  //   image_url: "https://images.unsplash.com/photo-1531975474574-e9d2732e8386?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
  //   description: "Nice Place to travel"
  // }).save()
  holidayItem.find()
    .then(results => {
      // console.log(results);
      res.json(results)
    })
    .catch(err => console.log(err))
})

app.post('/search', (req, res) => {
  // console.log(req.body.location);
  // console.log(req.body.activity)
  holidayItem.find({ $or: [{ location: req.body.location }, { activity: req.body.activity }] })
    .then(item => {
      // console.log(item);
      res.json(item)
    })
})



// { location: req.body.location, activity: req.body.activity }
