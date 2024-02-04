import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import CreateBook from './pages/CreateBook'
import ShowBook from './pages/ShowBook'
import EditBook from './pages/EditBook'
import DeleteBook from './pages/DeleteBook.jsx'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={Home} />
      <Route path='/add' element={CreateBook} />
      <Route path='/book' element={ShowBook} />
      <Route path='/edit' element={EditBook} />
      <Route path='delete' element={DeleteBook} />
    </Routes>
  )
}

export default App