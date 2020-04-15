require('dotenv/config');

const express = require('express');
require('express-async-errors');
const Sentry = require('@sentry/node');
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes');

// const sentryConfig = require('./config/sentry');

const app = express();

Sentry.init({ dsn: 'https://9c97890fda404149b0c9af819f6456c2@o368664.ingest.sentry.io/5201457' });
app.use(Sentry.Handlers.requestHandler());

app.use(cors());
app.use(express.json());

app.use(routes);
app.use(errors());
app.use(Sentry.Handlers.errorHandler());

module.exports = app;
