const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()

// Middleware
app.use(cors())

const port = process.env.PORT || 5000

app.get('/', (req, res)=>{
   res.send('Hello World!!')
})

app.get('/products/:id', (req, res)=> {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

app.listen(port, () =>{
  console.log('Running web server listening on port', port)
})