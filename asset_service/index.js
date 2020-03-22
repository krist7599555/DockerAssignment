'use strict'

const express = require('express')
var mongo = require('mongodb')
var MongoClient = require('mongodb').MongoClient

// Constants
const PORT = 'xxxx'
const HOST = 'xxxx'
const mongo_url = 'xxxx'

const db = new Promise((res, rej) =>
  MongoClient.connect(mongo_url, function (err, db) {
    return err ? rej(err) : res(db)
  }),
)
const userProfile = db.then(db => db.db('user').collection('userProfile'))

// App
const app = express()

app.get('/', (req, res) => {
  var username = req.query.username
  if (!username) {
    return res.status(400).send({ message: 'username is require' })
  }

  userProfile.then(users => {
    users.findOne({ uname: username }, function(err, result) {
      if (err) {
        res.status(400).send({ message: err.message })
      } else if (!result) {
        res.status(404).send({ message: 'not found username = ' + username })
      } else {
        res.status(200).send({
          username: result.uname,
          profile_image: result.profile_image,
        })
      }
    })
  })
})

app.listen(PORT, HOST)
console.log(`Running on http://${HOST}:${PORT}`)
