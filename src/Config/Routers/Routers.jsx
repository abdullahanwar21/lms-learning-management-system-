import React from 'react'
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import AdmissionForm from '../../Pages/AdmissionForm/AdmissionForm'
import Student from './../../Pages/Student/Student'
import ProtectedRoutes from './ProtectedRoutes'
import Login from './../../Pages/Login/Login'
import AdminDashBoard from '../../Pages/Admin/AdminDashBoard'
const Routers = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<AdmissionForm/>} />
            <Route path="student/*" element={<ProtectedRoutes components={<Student/>}/>} />
            {/* <Route path="student/*" element={<Student/>} /> */}
            <Route path="/login" element={<Login/>} />
            <Route path="admin/*" element={<ProtectedRoutes components={<AdminDashBoard/>}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Routers
