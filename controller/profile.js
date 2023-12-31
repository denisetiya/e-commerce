const express = require('express')
const db = require('../lib/mysql')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'assets/user/')
  },
  filename: function (req, file, cb) {
    cb(null,uuid.v4().substring(0, 4) + '-' + Date.now() + '-' + file.originalname)
  }
})

const upload = multer({ storage: storage })

 
// profile handle
const profile = express.Router()
profile.get('/:id', (req, res) => {
  const {id} = req.params
  const q = 'SELECT * FROM users WHERE id = ?'
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


// update with img
profile.put('/update/:id', upload.single('img'), (req, res) => {
  const {id} = req.params
  const imgUrl = req.file.filename 
  const {nama, username, email, noHp} = req.body
  const q = 'UPDATE users SET nama = ?, username = ?, email = ?, noHp = ?, imgUrl = ? WHERE id = ?'
  db.query(q, [nama, username, email, noHp, imgUrl, id], (err, data) => {
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

// update without img
profile.put('/updateNoImg/:id', (req, res) => {
  const {id} = req.params
  const {nama, username, email, noHp} = req.body
  const q = 'UPDATE users SET nama = ?, username = ?, email = ?, noHp = ? WHERE id = ?'
  db.query(q, [nama, username, email, noHp, id], (err, data) => {
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


// update password
profile.put('/password/:id', (req, res) => {
  const {id} = req.params
  const {email,oldPassword,newPassword} = req.body
  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(newPassword, salt)
  const q = 'SELECT password FROM users WHERE id = ?'
  db.query(q, [id], (err, data) => {
    if (err) return res.json({
      err,
      status: 500,
      message: 'password salah' + err
    })
    const result = bcrypt.compareSync(oldPassword, data[0].password)
    res.json({
      status: 200,
      message: 'password benar',
      result
    })

  const storedPasswordHash = data[0].password
  const passwordMatch = bcrypt.compareSync(oldPassword, storedPasswordHash);
  if (passwordMatch) {
    const q = 'UPDATE users SET password = ? WHERE id = ?'
    db.query(q, [passwordHash, id], (err, data) => {
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
  }
})

})

// get alamat
profile.get('/address/:id', (req, res) => {
  const {id} = req.params
  const q = 'SELECT * FROM alamat WHERE idUser = ?'
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

// handle alamat
profile.put('/address/:idUser', (req, res) => {
  const {idUser} = req.params
  const {district,city,province,postCode,detailAddress} = req.body
  const q = 'select * from alamat where idUser = ?'
  db.query(q, [idUser], (err, data) => {
    if (err) return res.json({
      err,
      status: 500,
      message: 'gagal ambil data' + err
    })
    else {
      if( data.length === 0) {
        const uid = uuid.v4().substring(0, 4)+ new Date().getTime() + uuid.v4().substring(0, 2)
        const q = 'INSERT INTO alamat (id,idUser,district,city,province,postalCode,detailAddress) VALUES (?,?,?,?,?,?,?)'
        db.query(q, [uid,idUser,district,city,province,postCode,detailAddress], (err, data) => {
          if (err) return res.json({
            err,
            status: 500,
            message: 'gagal insert data' + err
          })
          res.json({
            status: 200,
            message: 'sukses insert data',
            data
          })
        })
      } else {
        const  q = 'UPDATE alamat SET district = ?, city = ?, province = ?, postCode = ? WHERE idUser = ?'
        db.query(q, [district,city,province,postCode,idUser], (err, data) => {
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
      }

      }

  })
})


module.exports = profile