import React from 'react';
import logo from './logo.svg';
import './App.css';
import "./components/Navbar"
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Ideas from './pages/Ideas';
import Idea from './pages/Idea';
import EditIdea from './pages/EditIdea';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Chat from './pages/Chat';
import AllIdeas from './pages/AllIdeas';
import Profile from './pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<Login/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/allideas" element={<AllIdeas/>}/>
        <Route path="/ideas/:id" element={<Idea/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/chat" element={<Chat/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/idea/edit/:id" element={<EditIdea/>}/>
        <Route path="/ideas" element={<Ideas/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
