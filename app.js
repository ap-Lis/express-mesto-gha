const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const NOT_FOUND_ERROR_CODE = 404;

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '64c4dcc1a308d08d90b85b5611',
  };

  next();
});

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));
app.use((req, res) => {
  res.status(NOT_FOUND_ERROR_CODE).send({message: "URL не найден"})
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
