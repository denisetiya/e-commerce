const express = require('express')
const db = require('../lib/mysql')
const approval = express.Router()



// get data seller approval
approval.get('/', (req, res) => {

  const q = 'SELECT * FROM approvalSaller where disable = false'
  db.query(q, (err, data) => {
    if (err) return res.json({
      err,
      status: 500,
      message: 'gagal daftar'
    })
    res.json({
      status: 200,
      data
    })
  })
})

// delete aprroval seller because rejected
approval.delete('/:id', (req, res) => {

  console.log(req.params.id)
  const id = req.params.id
  const q = 'DELETE FROM approvalSaller WHERE id = ?'

  db.query(q, [id], (err, data) => {
    if (err) return res.json({
      err,
      status: 500,
      message: 'gagal hapus'
    })
    res.json({
      status: 200,
      data
    })
  })
})

// approve seller
approval.post('/:id', (req, res) => {
  const {idSaller} = req.body
  const id = req.params.id

  // get data from approvalSaller
  const q = `select * from approvalSaller where id = ?`
  db.query(q, [id], (err, data) => {
    if (err) return res.json({
      err,
      status: 500,
      message: 'no data'
    })
    
    else{
      
      // insert into saller
  
      const q = 'INSERT INTO saller (id,idSaller, name_brand, deskripsi_toko, alamat, imgUrl) VALUES (?,?,?,?,?,?)'
      db.query(q, [data[0].id, data[0].idSaller, data[0].name_brand, data[0].deskripsi_toko, data[0].alamat, data[0].imgUrl], (err, data) => {
        if (err) return res.json({
          err,
          status: 500,
          message: 'User telah terdaftar sebagai saller'
        })
        
        else{
          // update from approvalSaller
          const q = 'update approvalSaller SET disable = true WHERE id = ?'
          db.query(q, [id], (err, data) => {
            if (err) return res.json({
              err,
              status: 500,
              message: 'gagal hapus'
            })
            else{
              // update users role
              const q = `update users set role = 'saller' where id = ?`
              db.query(q, [idSaller], (err, data) => {
                if (err) return res.json({
                  err,
                  status: 500,
                  message: 'gagal update'
                })
                res.json({
                  message: 'success Approve',
                  status: 200,
                  data
                })
                
              })
            }
          })
        }
      })
    }
  })
})

module.exports = approval