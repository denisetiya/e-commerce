const express = require('express')
const route = express.Router()
const {daftar, login, saller} = require('./controller/users')
const approval = require('./controller/approval')
const brand = require('./controller/brand')
const product = require('./controller/product')
const chat = require('./controller/chats')
const kategori = require('./controller/kategori')
const search = require('./controller/search')
const cart = require('./controller/cart')
const profile = require('./controller/profile')
const payment = require('./controller/payment')


// users route
route.use('/daftar', daftar)
route.use('/login', login)
route.use('/profile', profile)


// saller route
route.use('/saller', saller)
route.use('/approval', approval)
route.use('/brand', brand)

// product route
route.use('/product', product)

// chat route
route.use('/chat', chat)

// kategori route
route.use('/kategori', kategori)

// search route
route.use('/search', search)

// cart route
route.use('/cart', cart)
route.use('/payment', payment)

module.exports = route