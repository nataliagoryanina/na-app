import React from 'react';
import { Route, Routes } from 'react-router-dom';
// components
import Home from './components/home/Home';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
