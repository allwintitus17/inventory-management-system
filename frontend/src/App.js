

import Header from './components/Header'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PrivateRoute from './components/PrivateRoute'
import NewProduct from './pages/NewProduct'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Products from './pages/Products'
import Product from './pages/Product'
import Update from './pages/Update'


const App = () => {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />

            {/* Protected routes */}
            <Route element={<PrivateRoute />}>
              <Route path='/new-product' element={<NewProduct />} />
              <Route path='/products' element={<Products />} />
              <Route path='/product/:productId' element={<Product />} />
              <Route path='/update-product/:productId' element={<Update/>}/>
            </Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
