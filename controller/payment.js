const express = require('express')
const payment = express.Router()
const db = require('../lib/mysql')
const uuid  = require('uuid')
const multer = require('multer');

// add cart to payment 
payment.post('/add', (req, res) => {
  const uid = uuid.v4().substring(0, 4) + '-' + new Date().getTime() + '-' + uuid.v4().substring(1, 5);
  const { id, namaProduct, hargaProduct, imgUrl, idSaller, idUser, idProduct, qty, fixedPrice, payWith, paymentStatus, status } = req.body;
  const q = `INSERT INTO payment(id,namaProduct,hargaProduct,imgUrl,idSaller,idUser,idProduct,qty,fixedPrice,payWith,paymentStatus,status) 
  VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`;
  const values = [uid, namaProduct, hargaProduct, imgUrl, idSaller, idUser, idProduct, qty, fixedPrice, payWith, paymentStatus, status];

  db.query(q, values, (err, data) => {
    if (err) {
      return res.json({
        err,
        status: 500,
        message: 'gagal insert data' + err
      });
    } else {
      const deleteQ = 'DELETE FROM cart WHERE id = ?';
      db.query(deleteQ, [id], (deleteErr, deleteData) => {
        if (deleteErr) {
          return res.json({
            err: deleteErr,
            status: 500,
            message: 'gagal delete data' + deleteErr
          });
        } else {
          return res.json({
            status: 200,
            message: 'insert data success and delete data success',
            data
          });
        }
      });
    }
  });
});

// get payment for user
payment.get('/all/:id', (req, res) => {
  const {id} = req.params
  const q = 'SELECT * FROM payment WHERE idUser = ?'
  db.query(q, [id], (err, data) => {
    if (err) return res.json({
      err,
      status: 500,
      message: 'gagal ambil data' + err
    })
    else{
      return res.json({
        status: 200,
        message: 'sukses ambil data',
        data
      })
    }
  })

})

// upload bukti bayar
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'assets/payment/')
  },
  filename: function (req, file, cb) {
    cb(null,uuid.v4().substring(0, 4) + '-' + Date.now() + '-' + file.originalname)
  }
})

const upload = multer({ storage: storage })

payment.put('/update-status/:id', upload.single('img'), (req, res) => {
  const {id} = req.params
  const bukti = req.file.filename
  const {status} = req.body
  console.log(bukti, id, status)
  const q = 'update payment set paymentStatus = ?, status = ?, buktiPembayaran = ? where id = ?'
  db.query(q, [1,status, bukti, id], (err, data) => {
    if (err) return res.json({
      err,
      status: 500,
      message: 'gagal update data bayar' + err
    })
    res.json({
      status: 200,
      message: 'sukses update data bayar',
      data
    })
  })
})

// delete to user 
payment.delete('/delete/:id', (req, res) => {
  const {id} = req.params
  const q = 'DELETE FROM payment WHERE id = ?'
  db.query(q, [id], (err, data) => {
    if (err) return res.json({
      err,
      status: 500,
      message: 'gagal delete data' + err
    })
    res.json({
      status: 200,
      message: 'sukses delete data',
      data
    })
  })
})

// get for admin dashboard
payment.get('/all', (req, res) => {
  const q = ' select * from payment where status = "menunggu konfirmasi pembayaran" ';
  db.query(q, (err, data) => {
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



// approve admin
payment.put('/update-status-admin/:id/:idProduct', (req, res) => {
  const {id, idProduct} = req.params
  const {status} = req.body
  const q = 'update payment set status = ? where id = ?'
  db.query(q, [status, id], (err, data) => {
    if (err) return res.json({
      err,
      status: 500,
      message: 'gagal update data payment' + err
    })
    else{
      const q = 'update products set stok = stok - 1 where id = ?';
      db.query(q, [idProduct]), (err,data) =>{
        if (err) return res.json ({
          err,
          status : 500,
          message : 'gagal update product'
        })
        res.json({
          status: 200,
          message: 'sukses update data payment',
          data
        })
      }
    }

  })
})

// get for saller

payment.get('/all-saller/:id', (req, res) => {
  const {id} = req.params
  const q = 'select * from payment where idSaller = ?'
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


// update status
payment.put('/update-status-saller/:id', (req, res) => {
  const {id} = req.params
  const {status} = req.body
  console.log(status, id)
  const q = 'update payment set status = ? where id = ?'
  db.query(q, [status, id], (err, data) => {
    if (err) return res.json({
      err,
      status: 500,
      message: 'gagal update data payment' + err
    })
    res.json({
      status: 200,
      message: 'sukses update data payment',
      data
    })
  })
})

module.exports = payment