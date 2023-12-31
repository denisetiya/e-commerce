const express = require('express');
const db = require('../lib/mysql');
const product = express.Router();
const multer = require('multer');
const uuid = require('uuid');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'assets/product/');
  },
  filename: function (req, file, cb) {
    cb(null, uuid.v4().substring(0, 4) + '-' + Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

// add product
product.post('/add', upload.single('img'), (req, res) => {
  try {
    const { idSaller, nama, harga, deskripsi, deskripsiSingkat, kategori, stok, rekomendasi } = req.body;
    const id = uuid.v4().substring(0, 4) + '-' + Date.now() + '-' + uuid.v4().substring(0, 2);
    const imgUrl = req.file.filename;
    const q = 'INSERT INTO products(id,idSaller,nama,harga,deskripsi,deskripsiSingkat,kategori,stok,rekomendasi,imgUrl) VALUES(?,?,?,?,?,?,?,?,?,?)';

    db.query(q, [id, idSaller, nama, harga, deskripsi,deskripsiSingkat, kategori,  stok, rekomendasi, imgUrl], (err, data) => {
      if (err) {
        console.error('Error inserting product:', err);
        return res.status(500).json({
          status: 500,
          message: 'Failed to insert product',
          error: err.message,
        });
      }

      res.status(200).json({
        status: 200,
        message: 'Successfully inserted product',
      });
    });
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({
      status: 500,
      message: 'Internal server error',
      error: error.message,
    });
  }
});


// get product for brand dashboard
product.get('/brand/:id', (req, res) => {
  const id = req.params.id;
  const q = 'select * from products where idSaller = ?';
  db.query(q, [id], (err, data) => {
    if (err) {
      console.error('Error fetching products:', err);
      return res.status(500).json({
        status: 500,
        message: 'Failed to fetch products',
        error: err.message,
      });
    }
    else {
      res.status(200).json({
        status: 200,
        message: 'Successfully fetched products',
        data
      });
    }
  })
})

// get product for rekomendasi
product.get('/brand-rekomendasi', (req, res) => {

  const q = `SELECT id, idSaller, nama, harga, imgUrl, deskripsi, deskripsiSingkat, kategori, stok, rekomendasi, createdAt
  FROM (
    SELECT
      id,
      idSaller,
      nama,
      harga,
      imgUrl,
      deskripsi,
      deskripsiSingkat,
      kategori,
      stok,
      rekomendasi,
      createdAt,
      ROW_NUMBER() OVER (PARTITION BY idSaller ORDER BY createdAt) AS row_num
    FROM products
    WHERE rekomendasi = true
  ) AS recommended_products
  WHERE row_num = 1;`


  db.query(q, (err, data) => {
    if (err) {
      console.error('Error fetching products:', err);
      return res.status(500).json({
        status: 500,
        message: 'Failed to fetch products',
        error: err.message,
      });
    }
    else {
      res.status(200).json({
        status: 200,
        message: 'Successfully fetched products',
        data
      });
    }
  })
})

// get product for edit page,detail product,chat room
product.get('/get/:id', (req, res) => {

  const id = req.params.id;
  const q = 'select * from products where id = ?';
  db.query(q, [id], (err, data) => {
    if (err) {
      console.error('Error fetching products:', err);
      return res.status(500).json({
        status: 500,
        message: 'Failed to fetch products',
        error: err.message,
      });
    }
    else {
      res.status(200).json({
        status: 200,
        message: 'Successfully fetched products',
        data
      });
    }
  })
})

// get all product

product.get('/all', (req, res) => {

  const q = 'select * from products';
  db.query(q, (err, data) => {
    if (err) {
      console.error('Error fetching products:', err);
      return res.status(500).json({
        status: 500,
        message: 'Failed to fetch products',
        error: err.message,
      });
    }
    else {
      res.status(200).json({
        status: 200,
        message: 'Successfully fetched products',
        data
      });
    }
  })
})

// update product
product.put('/update/:id', upload.single('img'), (req, res) => {
  const id = req.params.id;
  const { nama, harga, deskripsi, deskripsiSingkat, kategori, stok, rekomendasi } = req.body;
  const imgUrl = req.file.filename;
  const q = 'UPDATE products SET  nama = ?, harga = ?, deskripsi = ?, deskripsiSingkat = ?, kategori = ?, stok = ?, rekomendasi = ?, imgUrl = ? WHERE id = ?';

  db.query(q, [nama, harga, deskripsi, deskripsiSingkat, kategori, stok, rekomendasi, imgUrl, id], (err, data) => {
    if (err) {
      console.error('Error updating product:', err);
      return res.status(500).json({
        status: 500,
        message: 'Failed to update product',
        error: err.message,
      });
    }
    else {
      res.status(200).json({
        status: 200,
        message: 'Successfully updated product',
      });
    }
  })
})

// update no img product
product.put('/update-no-img/:id', (req, res) => {
  const id = req.params.id;
  const { nama, harga, deskripsi, deskripsiSingkat, kategori, stok, rekomendasi } = req.body;
  const q = 'UPDATE products SET  nama = ?, harga = ?, deskripsi = ?, deskripsiSingkat = ?, kategori = ?, stok = ?, rekomendasi = ? WHERE id = ?';

  db.query(q, [nama, harga, deskripsi, deskripsiSingkat, kategori, stok, rekomendasi, id], (err, data) => {
    if (err) {
      console.error('Error updating product:', err);
      return res.status(500).json({
        status: 500,
        message: 'Failed to update product',
        error: err.message,
      });
    }
    else {
      res.status(200).json({
        status: 200,
        message: 'Successfully updated product',
      });
    }
  })
})


// delete product
product.delete('/delete/:id', (req, res) => {
  const id = req.params.id;
  const q = 'DELETE FROM products WHERE id = ?';
  db.query(q, [id], (err, data) => {
    if (err) {
      console.error('Error deleting product:', err);
      return res.status(500).json({
        status: 500,
        message: 'Failed to delete product',
        error: err.message,
      });
    }
    else {
      res.status(200).json({
        status: 200,
        message: 'Successfully deleted product',
      });
    }
  })
})

module.exports = product;
