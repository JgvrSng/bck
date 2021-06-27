const express = require('express')
const { model } = require('mongoose')
const router = express.Router()

const controller = require('../controller/controller')
const authenticate = require('../middleware/authenticate')

router.get('/',authenticate,controller.index)
router.post('/show',controller.show)
router.post('/signup',controller.signup)
router.post('/update',controller.update)
router.post('/delete',controller.destroy)
router.post('/login',controller.login)
router.post('/score',controller.score)
router.get('/topscore',controller.topscore)



module.exports = router