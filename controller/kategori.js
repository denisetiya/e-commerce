const express = require('express')
const db = require('../lib/mysql')
const kategori = express.Router()



kategori.get('/:id', (req, res) => {
  const {id} = req.params
  const q = 'SELECT * FROM products WHERE kategori = ?'
  db.query(q, [id], (err, data) => {
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



module.exports = kategori