import React from 'react'
import { Container } from '@material-ui/core';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './components/Home/Home'
import Navbar from './components/Navbar/Navbar'
import Auth from './components/Auth/Auth';


const App = () => {
  
  return (
    <GoogleOAuthProvider clientId="695554315197-d5uff0hah3bhro90h9fl10njmaumldfi.apps.googleusercontent.com">...
    <BrowserRouter>
      <Container maxidth="lg">
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/auth" exact element={<Auth />} />
        </Routes>
        
      </Container>
    </BrowserRouter>
    </GoogleOAuthProvider>
  )
}
export default App;