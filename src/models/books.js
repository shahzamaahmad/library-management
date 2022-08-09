const mongoose = require('mongoose')

const booksSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
    trim: true,
    validate(value) {
      if (value.length <= 0) {
        throw new Error(`Name Can't be Null`)
      }

    }
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
    unique: true,
    minlength: 13,
    validate(value) {
      if (value < 13) {
        throw new Error(`ISBN have been 13 digits in length `)

      }
    }
  },
  count: {
    type: Number,
    defalut: 0
  },
  borrow: {
    type: Number,
  }
})

const Books = new mongoose.model('books-db', booksSchema)

module.exports = Books