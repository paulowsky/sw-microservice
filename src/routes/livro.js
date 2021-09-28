const express = require('express')
const router = express.Router()

const LivroController = require('../controllers/livro')

router
  .get('/', LivroController.getLivros)
  .post('/', LivroController.addLivro)
  .put('/', LivroController.updateLivro)
  .get('/:id', LivroController.getLivroByID)
  .delete('/:id', LivroController.deleteLivro)

module.exports = router
