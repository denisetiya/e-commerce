import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import NavbarCom from './components/navbar'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <div className='xl:mx-48 2xl:mx-80'>
        <div className='fixed w-full z-50 top-0 left-0'>
          <NavbarCom />
        </div>
        <div className='mt-10 sm:mt-12 mb-20'>
         <App />
        </div>
      </div>
    </BrowserRouter>
  </React.StrictMode>,
)
