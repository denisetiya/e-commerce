const express = require('express')
const chat = express.Router()
const db = require('../lib/mysql')
const uuid = require('uuid')

chat.get('/list/:id', (req, res) => {
  const id = req.params.id

  const q = 'SELECT * FROM chats WHERE pengirim = ? order by createdAt desc'
  db.query(q, [ id, id], (err, data) => {
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


chat.get('/room/:id/:sender', (req, res) => {

  const {id, sender} = req.params

  const q = 'SELECT * FROM chats WHERE pengirim = ? AND penerima = ?'
  db.query(q, [ sender, id], (err, data) => {
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

chat.post('/room', (req, res) => {

  const id = uuid.v4().substring(0, 4) + new Date().getTime() + uuid.v4().substring(0, 4)
  const {namaPengirim, imgPengirim, pengirim, namaPenerima, imgPenerima,  penerima, message } = req.body

  const q = 'INSERT INTO chats(id,pengirim,namaPengirim,imgPengirim,penerima,namaPenerima,imgPenerima, message) VALUES (?,?,?,?,?,?,?,?)'
  db.query(q, [id, pengirim, namaPengirim, imgPengirim, penerima, namaPenerima, imgPenerima, message], (err, data) => {
    if (err) return res.json({
      err,
      status: 500,
      message: 'gagal mengirim pesan' + err
    })
    res.json({
      status: 200,
      message: 'sukses megengirim pesan',
      data
    })
})


})

module.exports = chat