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
    res.status(400).send(e)
  }
})
router.get('/book', async (req, res) => {
  try {
    const books = await Books.find({})
    if (!books) {
      return res.status(404).send('No Book Found')
    }
    res.send(books)
  } catch (e) {
    res.status(500).send()
  }
})
router.get('/book/:id', async (req, res) => {
  const _id = req.params.id
  try {
    const book = await Books.findById(_id)
    res.send(book)
  } catch (e) {
    res.status(500).send()
  }
})
router.get('/book/:name', async (req, res) => {
  const name = req.params.name
  try {
    const book = await Books.findOne(name)
    res.send(book)
  } catch (e) {
    res.status(500).send()
  }
})

router.delete('/book/:id', async (req, res) => {
  try {
    const book = await Books.findByIdAndDelete(req.params.id)

    if (!book) {
      res.status(404).send()
    }

    res.send(book)
  } catch (e) {
    res.status(500).send()
  }
})

router.patch('/book/:id', async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'author', 'publication', 'isbn', 'count', 'borrow','available']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' })
  }

  try {
    const book = await Books.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

    if (!book) {
      return res.status(404).send()
    }

    res.send(book)
  } catch (e) {
    res.status(400).send(e)
  }
})

module.exports = router