const Admin = require('../models/admin')
const jwt = require('jsonwebtoken')
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer', '')
    const decode = jwt.verify(token, 'secretword')
    const admin = await Admin.findOne({ '_id': decode._id, 'tokens.token': token })
    if (!admin) {
      throw new Error()
    }
    req.token = token
    req.admin = admin
    next()
  }
  catch (e) {
    res.status(401).send('Please Authenticate')
  }
}
module.exports = auth


// app.use((req, res, next) => {
//   console.log(req.method, req.path)
//   if (req.method === 'GET') {
//     res.send('Get Request Disable')
//   }
//   else {
//     next()
//   }

// })
