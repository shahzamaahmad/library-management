const mongoose = require('mongoose')

const booksSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  author: {
    type: String,
    default: 'NA',
  },
  publication: {
    type: String,
    default: 'NA'
  },
  isbn: {
    type: Number,
    unique: true
  },
  count: {
    type: Number,
    defalut: 0
  },
  issueCount: {
    type: Number,
  }
})

const Books = new mongoose.model('books-db', booksSchema)

module.exports = Books