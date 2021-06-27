const { Router } = require('express')
const router = Router()
const { BookController } = require('../controllers')
const { BookRequest } = require('../requests')
const { auth } = require('../middlewares')

router.get('/', BookController.get)
router.post('/', BookRequest.create, BookController.create)
router.get('/:isbn', BookController.find)
router.put('/:book', BookRequest.update, BookController.update)
router.delete('/:book', auth, BookController.delete)
router.patch('/:book/addstock', BookRequest.addStock, BookController.addStock)

module.exports = router