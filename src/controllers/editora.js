const { pool, createTableEditoras } = require('../config/db')

createTableEditoras()

exports.getEditoras = (req, res) => {
  pool.query('SELECT * FROM editora order by id',
    (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    }
  )
}

exports.getEditoraByID = (req, res) => {
  const id = parseInt(req.params.id)
  pool.query('SELECT * FROM editora where id = $1',
    [id], (error, results) => {
      if (error || results.rowCount == 0) {
        return res.status(401).json({ status: 'error', message: 'Editora not found!' })
      }
      res.status(200).json(results.rows)
    }
  )
}

exports.addEditora = (req, res) => {
  const { name, website } = req.body

  pool.query('INSERT INTO editora (name, website) VALUES ($1, $2)',
    [name, website], (error) => {
      if (error) {
        console.log(error)
        throw error
      }
      res.status(201).json({ status: 'success', message: 'Editora created!' })
    }
  )
}

exports.updateEditora = (req, res) => {
  const { id, name, website } = req.body
  pool.query('UPDATE editora set name=$1, website=$2 where id=$3',
    [name, website, id], error => {
      if (error) {
        console.log(error)
        throw error
      }
      res.status(201).json({ status: 'success', message: 'Editora edited!' })
    }
  )
}

exports.deleteEditora = (req, res) => {
  const id = parseInt(req.params.id)
  pool.query('DELETE from editora where id=$1',
    [id], (error, results) => {
      if (error || results.rowCount == 0) {
        return res.status(401).json({ status: 'error', message: 'Error when removing Editora!' })
      }
      res.status(201).json({ status: 'success', 
      message: 'Editora removed!' })
    }
  )
}
