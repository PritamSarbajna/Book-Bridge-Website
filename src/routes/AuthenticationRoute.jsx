import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainAuth } from '../components';


const AuthenticationRoute = () => {
  return (
    <>
        <Router>
            <Routes>
                <Route path="/" element={<MainAuth/>} />
            </Routes>
        </Router>
    </>
  )
}

export default AuthenticationRoute