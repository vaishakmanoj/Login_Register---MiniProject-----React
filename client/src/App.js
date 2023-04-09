import React from 'react';
import {BrowserRouter, Routes , Route} from 'react-router-dom';
import { Button,} from 'antd'
import Login from './Pages/Login';
import Register from './Pages/Register';
import { Toaster } from 'react-hot-toast';
import Home from './Pages/Home';
import ProtectedRoute from './Components/ProtectedRoute';
import { useSelector } from 'react-redux';
import PublicRoute from './Components/PublicRoute';
import UserList from './Pages/Admin/UserList';
import Profile from './Pages/Profile';


function App() {
  const {loading}=useSelector((state)=>state.alerts)
  return (
    <BrowserRouter>
    {/* {loading && (
      <div className='spinner-parent'>
        <div className='spinner-border' role='status'></div>
      </div>
    )} */}
    <Toaster position="top-center" reverseOrder={false}/>
    
    <Routes>

      <Route path='/login' element={
        <PublicRoute>
          <Login/>
        </PublicRoute>} 
      />
      <Route path='/register' element={
        <PublicRoute>
          <Register/>
        </PublicRoute>} 
        />
      <Route 
        path='/' 
        element={
        <ProtectedRoute>
          <Home/>
        </ProtectedRoute>  
          } 
        />
        <Route 
        path='/admin/userlist' 
        element={
        <ProtectedRoute>
          <UserList/>
        </ProtectedRoute>  
          } 
        />
        <Route 
        path='/profile' 
        element={
        <ProtectedRoute>
          <Profile/>
        </ProtectedRoute>  
          } 
        />
        

    </Routes>

    
    </BrowserRouter>
  );
}

export default App;
