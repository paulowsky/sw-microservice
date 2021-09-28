require('dotenv').config()

const express = require('express')
const cors = require('cors')
const httpProxy = require('express-http-proxy')

const checkAuth = require('./middlewares/check_auth')

const authRoutes = require('./routes/auth')

const livrosServiceProxy = httpProxy(process.env.API_LIVROS_URL)
const editorasServiceProxy = httpProxy(process.env.API_EDITORAS_URL)

const port = process.env.port

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    return res.status(200)
  }
  next()
})

// Auth
app.use('/', authRoutes)

// Livros
app.all('/livro', checkAuth, (req, res, next) => {
  livrosServiceProxy(req, res, next)
})
app.all('/livro/:id', checkAuth, (req, res, next) => {
  livrosServiceProxy(req, res, next)
})

// Editoras
app.all('/editora', checkAuth, (req, res, next) => {
  editorasServiceProxy(req, res, next)
})
app.all('/editora/:id', checkAuth, (req, res, next) => {
  editorasServiceProxy(req, res, next)
})

app.use((req, res, next) => {
  const error = new Error('Not found!')
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message
    }
  })
})

app.listen(port, () => console.log(`Server running in port ${port}`))
