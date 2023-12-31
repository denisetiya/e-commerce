import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/home'
import signUp from './pages/signUp'
import dashboardAdmin from './pages/admin/dashboardAdmin'
import dasboardSaller from './pages/saller/dasboardSaller'
import about from './pages/about'
import register from './pages/saller/register'
import add from './pages/saller/add'
import edit from './pages/saller/edit'
import editProfile from './pages/saller/editProfile'
import detailProduct from './pages/detailProduct'
import chatRoom from './pages/chats/chatRoom'
import chat from './pages/chats/chat'
import chatList from './pages/chats/chatList'
import kategori from './pages/category'
import search from './pages/search'
import cart from './pages/cart/cart'
import profile from './pages/profile/profile'
import cartPay from './pages/cart/cartPay'
import order from './pages/saller/order'


function App() {

  return (
    <>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/signup" Component={signUp} />
        <Route path="/dashboard" Component={dashboardAdmin} />
        <Route path="/saller/dashboard" Component={dasboardSaller} />
        <Route path="/about" Component={about} />
        <Route path="/saller/register" Component={register} />
        <Route path="/saller/add" Component={add} />
        <Route path="/saller/edit/:id" Component={edit} />
        <Route path="/saller/edit-profile" Component={editProfile} />
        <Route path="/detail-product/:id" Component={detailProduct} />
        <Route path="/chatRoom/:id/:idProduct" Component={chatRoom} />
        <Route path="/chat-room/:id" Component={chat} />
        <Route path="/chat-list" Component={chatList} />
        <Route path="/category/:id" Component={kategori} />
        <Route path="/search/:search" Component={search} />
        <Route path="/cart" Component={cart} />
        <Route path="/profile" Component={profile} />
        <Route path="/cart-pay/:id" Component={cartPay} />
        <Route path="/saller/order/" Component={order} />
        <Route path="*" Component={Home} />
      </Routes>
    </>
  )
}

export default App
