const express = require('express')
const router = express.Router()
const controller = require('./controller.js')

//book routes
router.get('/', controller.getAllBooks)
router.get('/:id', controller.getBookByID)
router.post('/', controller.createBook)
router.put('/:id', controller.updateBook)
router.delete('/:id', controller.deleteBook)

//author routes
router.get('/:id/authors', controller.getAuthors)
router.post('/:id/authors', controller.createAuthor)
router.get('/:id/authors/:aid', controller.getOneAuthor)
router.put('/:id/authors/:aid', controller.updateAuthor)
router.delete('/:id/authors/:aid', controller.deleteAuthor)


module.exports = router