const express = require('express');

const router = express.Router();
const { celebrate, Joi, Segments } = require('celebrate');
const auth = require('./middlewares/authMiddleware');
const ongsController = require('./controllers/ongsController');
const incidentsController = require('./controllers/incidentsControllers');
const profileController = require('./controllers/profileController');
const sessionController = require('./controllers/sessionController');

router.get('/ongs', ongsController.index);

//  @route  POST api/users
//  @desc   Create ONG & get token
//  @access  Public
router.post(
  '/ongs',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      confirmPassword: Joi.string().required(),
      phone: Joi.string().required(),
      city: Joi.string().required(),
    }),
  }),
  ongsController.create,
);

router.get(
  '/incidents',
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number().integer(),
    }),
  }),
  incidentsController.index,
);

router.post(
  '/incidents',
  auth,
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
      value: Joi.number().required(),
    }),
  }),
  incidentsController.create,
);

router.delete(
  '/incidents/:id',
  auth,
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().integer().required(),
    }),
  }),
  incidentsController.delete,
);

router.get(
  '/profile',
  auth,
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  profileController.index,
);

router.post(
  '/auth',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  sessionController.create,
);

module.exports = router;
