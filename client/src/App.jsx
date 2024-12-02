import { React } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Table from './Table'

function App() {

  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Table/>}></Route>
          <Route path="/:id" element={<Table/>}></Route>
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
