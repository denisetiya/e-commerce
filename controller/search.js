const express = require('express')
const search = express.Router()
const db = require('../lib/mysql')


search.get('/:search', (req, res) => {
  const {search} = req.params
  const q = 'SELECT * FROM products WHERE nama LIKE ?'
  db.query(q, [`%${search}%`], (err, data) => {
    if (err) return res.json({
      err,
      status: 500,
      message: 'gagal ambil data' + err
    })
    res.json({
      status: 200,
      message: 'sukses ambil data',
      data
    })
  })
})


module.exports = search