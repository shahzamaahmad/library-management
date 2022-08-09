const Books = require('../models/books')
const express = require('express')
const router = new express.Router()

// router.post('/add', (req, res) => {
//   const book = new Books(req.body)
//   book.save().then(book => {
//     res.status(201).send(book)
//   }).catch(error => {
//     res.status(400).send('Unable to add', error)
//   })
// })

router.post('/add', async (req, res) => {
  const book = new Books(req.body)
  try {
    await book.save()
    res.status(201).send(book)
  } catch (e) {
    res.status(400).send(e.keyValue)
  }
})

module.exports = router