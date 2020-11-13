const express = require('express');

const dbConnect = require('./config/dbConnect');
const router = require('./Routes/contact');

const app = express();
app.use(express.json());
// connect to db
dbConnect();
app.use('/', router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) =>
  err ? console.error(err) : console.log(`🚀 is 🏃 on port ${PORT}`)
);
