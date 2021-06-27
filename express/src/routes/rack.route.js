const { Router } = require('express')
const router = Router()

const { RackController } = require('../controllers')
const { RackRequest } = require('../requests')
const { auth } = require('../middlewares')

router.get('/', RackController.get)
router.post('/', RackRequest.create, RackController.create)
router.get('/:rack', RackController.find)
router.put('/:rack', RackRequest.update, RackController.update)
router.delete('/:rack', auth, RackController.delete)

module.exports = router