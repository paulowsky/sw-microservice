const { pool, createTableLivros } = require('../config/db')

createTableLivros()

exports.getLivros = (req, res) => {
  pool.query('SELECT * FROM livro order by id',
    (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    }
  )
}

exports.getLivroByID = (req, res) => {
  const id = parseInt(req.params.id)
  pool.query('SELECT * FROM livro where id = $1',
    [id], (error, results) => {
      if (error || results.rowCount == 0) {
        return res.status(401).json({ status: 'error', 
        message: 'Livro not found!' })
      }
      res.status(200).json(results.rows)
    }
  )
}

exports.addLivro = (req, res) => {
  const { title, description, price, editora } = req.body

  pool.query('SELECT * FROM editora where id = $1',
    [editora], (error, results) => {
      if (error || results.rowCount == 0) {
        return res.status(401).json({ status: 'error', message: 'Editora not found!' })
      } else {
        pool.query('INSERT INTO livro (title, description, price, editora_id) VALUES ($1, $2, $3, $4)',
          [title, description, price, editora], (error) => {
            if (error) {
              console.log(error)
              throw error
            }
            res.status(201).json({ status: 'success', message: 'Livro created!' })
          }
        )
      }
    }
  )
}

exports.updateLivro = (req, res) => {
  const { id, title, description, price, editora } = req.body

  pool.query('SELECT * FROM editora where id = $1',
    [editora], (error, results) => {
      if (error || results.rowCount == 0) {
        return res.status(401).json({ status: 'error', message: 'Editora not found!' })
      } else {
        pool.query('UPDATE livro set title=$1, description=$2, price=$3, editora_id=$4 where id=$5',
          [title, description, price, editora, id], error => {
            if (error) {
              console.log(error)
              throw error
            }
            res.status(201).json({ status: 'success', message: 'Livro edited!' })
          }
        )
      }
    }
  )
}

exports.deleteLivro = (req, res) => {
  const id = parseInt(req.params.id)
  pool.query('DELETE from livro where id=$1',
    [id], (error, results) => {
      if (error || results.rowCount == 0) {
        return res.status(401).json({ status: 'error', 
        message: 'Error when removing Livro!', error })
      }
      res.status(201).json({ status: 'success', 
      message: 'Livro removed!' })
    }
  )
}
