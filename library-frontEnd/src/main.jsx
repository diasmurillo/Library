import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './Pages/Register.jsx'
import Login from './Pages/Login.jsx'
import Home from './Pages/Home.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import Profile from './Pages/Profile.jsx'
import Books from './Pages/Books.jsx'
import AdminRoute from './components/AdminRoute.jsx'
import Admin from './Pages/Admin.jsx'
import RentBook from './Pages/RentBook.jsx'
import EditProfile from './Pages/EditProfile.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route index element={<Home />}/>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/books' element={<Books />}/>
        <Route path='/rent/:bookId' element={<PrivateRoute> <RentBook /> </PrivateRoute>} />
        <Route path='/profile' element={<PrivateRoute> <Profile /> </PrivateRoute>} />
        <Route path='/editProfile' element={<PrivateRoute> <EditProfile /> </PrivateRoute>} />
        <Route path='/admin' element={<AdminRoute> <Admin/> </AdminRoute>} />
      </Route>
    </Routes>
  </BrowserRouter>,
)
