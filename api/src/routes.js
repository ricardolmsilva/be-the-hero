const express = require('express')


const router = express.Router()

const ongsController = require('./controllers/ongsController')
const incidentsController = require('./controllers/incidentsControllers')
const profileController = require('./controllers/profileController')
const sessionController = require('./controllers/sessionController')

router.get('/ongs', ongsController.index)
router.post('/ongs', ongsController.create)

router.get('/incidents', incidentsController.index)
router.post('/incidents', incidentsController.create)
router.delete('/incidents/:id', incidentsController.delete)

router.get('/profile', profileController.index)

router.post('/auth', sessionController.create)

module.exports = router