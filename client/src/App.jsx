import React from 'react'
import LoginPage from './pages/LoginPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import ProductsPage from './pages/ProductsPage.jsx'
import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
function App() {
  

  return (
    <div>
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<LoginPage/>}/>
       
       <Route path="/login" element={<LoginPage/>}/>
       <Route path="/signup" element={<SignUpPage/>}/>
       <Route path="/products" element={<ProductsPage/>}/>
     </Routes>
     </BrowserRouter>
    </div>
  )
}

export default App
