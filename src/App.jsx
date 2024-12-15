import React from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import SignupPage from './pages/SignupPage';
import ProductListPage from './pages/ProductsList';
import Dashboard from './pages/AdminDashboard';


const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route
      path='/'
      element={<Login />}
     / >
      <Route
      path='/signup'
      element={<SignupPage />}
     / >
      <Route
      path='/products'
      element={<ProductListPage />}
     / >
      <Route
      path='/dashboard'
      element={<Dashboard />}
     / >
    </Routes>
    </BrowserRouter>
  )
}

export default App