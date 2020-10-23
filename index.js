const express = require('express');
const cors = require('cors');

const {config} = require('./config');

const usersApi = require('./routes/users');
const contactsApi = require('./routes/contacts');

const {logErrors, wrapErrors, errorHandler} = require('./utils/middleware/errorHandlers.js');

const app = express();
app.use(cors());
app.use(express.json());

contactsApi(app);
usersApi(app);

// Errors middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, function () {
  console.log(`Listening http://localhost:${config.port}`);
});
