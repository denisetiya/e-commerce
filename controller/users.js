const express = require('express')
const db = require('../lib/mysql')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
 


// daftar handle
const daftar = express.Router()
daftar.post('/', (req, res) => {
  const {nama, username,email,password} = req.body
  const salt = bcrypt.genSaltSync(10)
  const passwordHash = bcrypt.hashSync(password, salt)
  const id = uuid.v4().substring(0, 4)+ new Date().getTime() + uuid.v4().substring(0, 2)
  const q = 'INSERT INTO users (id,nama, username, email, password) VALUES (?,?, ?, ?, ?)'

  db.query(q, [ id,nama, username, email, passwordHash], (err, data) => {
    if (err) return res.json({
      err,
      status: 500,
      message: 'gagal daftar'
    })
    return res.json({
      status: 200,
      message: 'daftar berhasil'
    })    
  })
})


// login handle
const login = express.Router()
login.post('/', (req, res) => {
  const { email, password } = req.body;
  const q = 'SELECT * FROM users WHERE email = ?';
  db.query(q, [email], (err, data) => {
    if (err) {
      return res.json({
        err,
        status: 500,
        message: 'error in database'
      });
    }

    if (data.length === 0) {
      return res.json({
        status: 401,
        message: 'Username or email not found'
      });
    }

    const storedPasswordHash = data[0].password;

    const passwordMatch = bcrypt.compareSync(password, storedPasswordHash);

    if (!passwordMatch) {
      return res.json({
        status: 401,
        message: 'Incorrect password'
      });
    }

    return res.json({
      status: 200,
      message: 'Login successful',
      profile: data
    });
  });
});

// multer configure
const multer = require('multer')
 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'assets/saller/')
  },
  filename: function (req, file, cb) {
    cb(null,uuid.v4().substring(0, 4) + '-' + Date.now() + '-' + file.originalname)
  }
})

const upload = multer({ storage: storage })


// register to become saller
const saller = express.Router()
saller.post('/register', upload.single('img'), (req, res) => {

  const id = uuid.v4().substring(0, 4)+ new Date().getTime() + uuid.v4().substring(0, 2)
  const {idSaller, nama_brand, deskripsi_toko, alamat} = req.body
  const imgUrl = req.file.filename

  const q = ' INSERT INTO approvalSaller (id,idSaller, name_brand, deskripsi_toko, alamat, imgUrl) VALUES (?,?,?,?,?,?)'

  db.query(q, [id,idSaller, nama_brand, deskripsi_toko, alamat, imgUrl], (err, data) => {
    if (err) return res.json({
      err,
      status: 500,
      message: 'gagal daftar'
    }) 
     res.json({
      status: 200,
      message: 'daftar berhasil'
    })
  })
})




module.exports = {
  daftar,
  login,
  saller
}