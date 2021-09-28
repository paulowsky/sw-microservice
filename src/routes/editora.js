const express = require('express')
const router = express.Router()

const EditoraController = require('../controllers/editora')

router
  .get('/', EditoraController.getEditoras)
  .post('/', EditoraController.addEditora)
  .put('/', EditoraController.updateEditora)
  .get('/:id', EditoraController.getEditoraByID)
  .delete('/:id', EditoraController.deleteEditora)

module.exports = router
