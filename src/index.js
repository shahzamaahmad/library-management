const express = require('express')
const booksRouter = require('./routers/books')
const adminRouter = require('./routers/admin')
require('./db/mongoose')

const port = process.env.PORT || 3000
const app = express()


app.use(express.json())
app.use(booksRouter)
// app.use(adminRouter)

app.listen(port, () => {
  console.log('Server is up on port 3000');
})
