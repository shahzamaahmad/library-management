const mongoose = require('mongoose')
require('dotenv').config();

try {
  mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true

  })
  console.log("DB Connected Successfully");
}
catch (error) {
  console.log('Unable to Connect DB', error);
}