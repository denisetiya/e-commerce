const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')




app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/assets', express.static('assets'));

app.get('/', (req, res) => {
  res.send('Welcome to Tech Store API')
})

const route = require('./router')
app.use('/store', route)


app.listen(3000, () => {
  console.log('Server running on port 3000')
})