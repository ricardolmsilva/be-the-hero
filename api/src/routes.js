const express = require("express");
const router = express.Router();
const { celebrate, Joi, Segments } = require("celebrate");

const ongsController = require("./controllers/ongsController");
const incidentsController = require("./controllers/incidentsControllers");
const profileController = require("./controllers/profileController");
const sessionController = require("./controllers/sessionController");

router.get("/ongs", ongsController.index);
router.post(
  "/ongs",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string()
        .email()
        .required(),
      phone: Joi.number()
        .integer()
        .required(),
      city: Joi.string().required(),
      district: Joi.string().required()
    })
  }),
  ongsController.create
);

router.get(
  "/incidents",
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number().integer()
    })
  }),
  incidentsController.index
);

router.post(
  "/incidents",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required()
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
      value: Joi.string().required(),
      ong_id: Joi.string().required(),
      district: Joi.string().required()
    })
  }),
  incidentsController.create
);

router.delete(
  "/incidents/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number()
        .integer()
        .required()
    })
  }),
  incidentsController.delete
);

router.get(
  "/profile",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required()
    }).unknown()
  }),
  profileController.index
);

router.post(
  "/auth",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      id: Joi.string().required()
    })
  }),
  sessionController.create
);

module.exports = router;
