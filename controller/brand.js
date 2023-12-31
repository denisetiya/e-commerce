const express = require('express')
const brand = express.Router()
const db = require('../lib/mysql')
const multer = require('multer')
const uuid = require('uuid')

// get data saller for profile and chat
brand.get('/:id', (req, res) => {

  const q = 'SELECT * FROM saller WHERE idSaller = ?'

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json({
      err,
      status: 500,
      message: 'gagal ambil data'
    })

    res.json({
      status: 200,
      message: 'sukses ambil data',
      data
    })
  })
})
// update no image
brand.put('/update-no-img/:id', (req, res) => {
  const id = req.params.id
  const { name_brand, deskripsi_toko, alamat } = req.body
  const q = 'UPDATE saller SET name_brand = ?, deskripsi_toko = ?, alamat = ? WHERE idSaller = ?'

  db.query(q, [name_brand, deskripsi_toko, alamat, id], (err, data) => {
    if (err) return res.json({
      err,
      status: 500,
      message: 'gagal update data'
    })

    res.json({
      status: 200,
      message: 'sukses update data',
      data
    })
  })

})

// update with image
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'assets/saller')
  },
  filename: function (req, file, cb) {
    cb(null, uuid.v4().substring(0, 4) +file.originalname )
  }
})

const upload = multer({ storage: storage })

brand.put('/update/:id', upload.single('img'), (req, res) => {
  const id = req.params.id
  const { name_brand, deskripsi_toko, alamat } = req.body
  const imgUrl = req.file.filename
  const q = 'UPDATE saller SET name_brand = ?, deskripsi_toko = ?, alamat = ?, imgUrl = ? WHERE idSaller = ?'
  db.query(q, [name_brand, deskripsi_toko, alamat, imgUrl, id], (err, data) => {
    if (err) return res.json({
      err,
      status: 500,
      message: 'gagal update data' + err
    })

    res.json({
      status: 200,
      message: 'sukses update data',
      data
    })
  })
})


module.exports = brand
