const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid')
      }
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Password cannot contain "password"')
      }
    }
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
})

adminSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ _id: this._id.toString() }, 'secretword')
  this.tokens = this.tokens.concat({ token })
  await this.save()
  console.log(token);
  return token
}

adminSchema.statics.findByCredentials = async function (email, password) {
  const admin = await Admin.findOne({ email })
  if (!admin) {
    throw new Error('Incorrect Email')
  }
  const isMatch = await bcrypt.compare(password, admin.password)
  if (!isMatch) {
    throw new Error('Incorrect Password')
  }
  return admin
}

// Hash the plain text password before saving
adminSchema.pre('save', async function (next) {
  const admin = this

  if (admin.isModified('password')) {
    admin.password = await bcrypt.hash(admin.password, 8)
  }

  next()
})

const Admin = mongoose.model('Admin', adminSchema)

module.exports = Admin