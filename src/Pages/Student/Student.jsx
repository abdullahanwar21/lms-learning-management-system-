import React from 'react'
// import OutlinedCard from './Card'
import Navbar from "../../Components/Navbar"
import { Box } from '@mui/material'
import StudentProfile from "./StudentProfile"
import { Route, Routes } from 'react-router-dom'
import MenuAppBar from './AppBar/AppBar'
import SingleStudent from '../Admin/singleStudent/SingleStudent'
const Student = () => {
  return (
    <>
    <MenuAppBar />
    <StudentProfile />
    </>
  )
}

export default Student
