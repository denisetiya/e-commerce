const express = require('express')
const cart = express.Router()
const db = require('../lib/mysql')
const uuid  = require('uuid')


function handleDatabaseError(res, err) {
  console.error('Error interacting with the database:', err);
  return res.status(500).json({
    status: 500,
    message: 'Failed to interact with the database',
    error: err.message,
  });
}

// product handle
cart.post('/add', (req, res) => {
  const { namaProduct, hargaProduct, imgUrl, idSaller, idUser, idProduct } = req.body;

  // cart check if exist
  const q = 'SELECT * FROM cart WHERE idUser = ? AND idProduct = ?';

  db.query(q, [idUser, idProduct], (err, data) => {
    if (err) {
      return handleDatabaseError(res, err);
    }

    if (data.length > 0) {

      // update cart
      const updateQuery = 'UPDATE cart SET qty = qty + 1, hargaProduct = hargaProduct + ? WHERE idUser = ? AND idProduct = ?';

      db.query(updateQuery, [hargaProduct,idUser, idProduct], (err, data) => {
        if (err) {
          return handleDatabaseError(res, err);
        }

        return res.status(200).json({
          status: 200,
          message: 'Product quantity updated in the cart',
          data: data,
        });
      });
    } else {
      
      // insert cart
      const uid = uuid.v4().substring(0, 4) + '-'+ new Date().getTime() + '-'+ uuid.v4().substring(1, 5) 
      const qty = 1
      const insertQuery = 'INSERT INTO cart (id, namaProduct, hargaProduct, imgUrl, idSaller, idUser, idProduct, qty,fixedPrice) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)';

      db.query(insertQuery, [uid, namaProduct, hargaProduct, imgUrl, idSaller, idUser, idProduct, qty,hargaProduct], (err, data) => {
        if (err) {
          return handleDatabaseError(res, err);
        }

        return res.status(200).json({
          status: 200,
          message: 'Product added to cart',
          data: data,
        });
      });
    }
  });
});



// get cart for user
cart.get('/all/:id', (req, res) => {
  const { id } = req.params
  const q = 'SELECT * FROM cart WHERE idUser = ? '
  db.query(q, [id], (err, data) => {
    if (err) {
      console.error('Error inserting product:', err)
      return res.status(500).json({
        status: 500,
        message: 'Failed to insert product',
        error: err.message,
      })
    }
    else{
      return res.status(200).json({
        status: 200,
        message: 'success',
        data: data
      })
    }
  })

})

cart.get('/get/:id', (req, res) => {
  const { id } = req.params
  const q = 'SELECT * FROM cart WHERE id = ? '
  db.query(q, [id], (err, data) => {
    if (err) {
      console.error('Error inserting product:', err)
      return res.status(500).json({
        status: 500,
        message: 'Failed to insert product',
        error: err.message,
      })
    }
    else{
      return res.status(200).json({
        status: 200,
        message: 'success',
        data: data
      })
    }
  })
})

// plus and min qunatity

cart.put('/qty/:id', (req, res) => {
  const { id } = req.params
  const {qty, price} = req.body
  let Iqty = null
  if (qty == 'plus') {
    Iqty = 1
  } else if (qty == 'min') {
    Iqty = -1
  }

  const q = 'UPDATE cart SET qty = qty + ?, hargaProduct = hargaProduct + ? * ? WHERE id = ?'
  db.query(q, [Iqty, Iqty,price, id], (err, data) => {
    if (err) {
      console.error('Error inserting product:', err)
      return res.status(500).json({
        status: 500,
        message: 'Failed to insert product',
        error: err.message,
      })
    }
    else{
      return res.status(200).json({
        status: 200,
        message: 'success',
        data: data
      })
    }
  })
})


cart.delete('/delete/:id', (req, res) => {
  const { id } = req.params
  const q = 'DELETE FROM cart WHERE id = ?'
  db.query(q, [id], (err, data) => {
    if (err) {
      console.error('Error inserting product:', err)
      return res.status(500).json({
        status: 500,
        message: 'Failed to insert product',
        error: err.message,
      })
    }
    else{
      return res.status(200).json({
        status: 200,
        message: 'success',
        data: data
      })
    }
  })
})


module.exports = cart