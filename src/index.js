const express = require('express')
const booksRouter = require('./routers/books')
const adminRouter = require('./routers/admin')
const jwt = require('jsonwebtoken')
require('./db/mongoose')

const port = process.env.PORT || 3000
const app = express()


app.use(express.json())
app.use(booksRouter)
app.use(adminRouter)



app.listen(port, () => {
  console.log('Server is up on', port, 'Port');
})



// const myFunction = async () => {
//   const token = jwt.sign({ _id: 'abc123' }, 'secretword', { expiresIn: '7 days' })
//   console.log(token)

//   const data = jwt.verify(token, 'secretword')
//   console.log(data)
// }

// myFunction()