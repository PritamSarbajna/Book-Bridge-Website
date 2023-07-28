import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { UserProfile, Hero, About, AddBooks, AllBooks, SingleBook, ChatMessage, Chats, Contact } from '../components'


const OtherPageRoute = () => {

  return (
    <>
        <Router>
            <Routes>
                <Route path="/" element={<Hero/>} />
                <Route path="/all" element={<AllBooks/>} />
                <Route path="/book/:id" element={<SingleBook/>} />
                <Route path="/addbooks" element={<AddBooks/>} />
                <Route path="/profile" element={<UserProfile/>} />
                <Route path="/about" element={<About/>} />
                <Route path="/chat" element={<Chats/>} />
                <Route path="/chat/:participant" element={<ChatMessage/>} />
                <Route path="/contact" element={<Contact/>} />

            </Routes>
        </Router>
    </>
  )
}

export default OtherPageRoute