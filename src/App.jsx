import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Fetch from './components/Fetch'
import Add from './components/Add'
import Update from './components/Update'

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<Fetch/>}></Route>
      <Route path='/home' element={<Fetch/>}></Route>
      <Route path='/add-user' element={<Add/>}></Route>
      <Route path='/edit-user/:id' element={<Update/>}></Route>
    </Routes>
    </>
  )
}

export default App