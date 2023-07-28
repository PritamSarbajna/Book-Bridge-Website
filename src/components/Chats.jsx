import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import { Link } from 'react-router-dom';

const Chats = () => {

    const data = JSON.parse(localStorage.getItem('userdata'));
    const email = data.email;
    const [chatEmails, setChatEmails] = useState([])

    const fetchEmails = async () => {
        try {
          const data = await fetch(`http://127.0.0.1:8000/chat_emails/${encodeURIComponent(email)}`); // Replace 'your_email_here' with the actual email you want to fetch
          const response = await data.json();
        //   console.log('Chat Emails:', response.chat_emails);
          
          setChatEmails(response.chat_emails);
        } catch (error) {
          console.error('Error fetching chat emails:', error);
        }
      };

    useEffect(() => {
      fetchEmails();
    
    }, [email]);
    



  return (
    <>
    <NavBar />
    <div class="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">

    <div class="w-full max-w-lg">
        <div className='justify-center text-center' >
            <h1 className='font-semibold text-[#fff] text-xl'>You have previously chatted with :</h1>
        </div>
        <div class="m-4 sm:m-8 space-y-4">
            {chatEmails.map((email, index) => (
                <div key={index} class="p-4 bg-white rounded-lg flex flex-col items-center sm:flex-row justify-between space-y-2 sm:space-y-0 space-x-0 sm:space-x-4">
                    <div class="w-full sm:w-fit bg-gray-300 rounded">
                        <h2 class="p-2 text-[#222]">{email}</h2>
                    </div>
                    <div class="mt-2 sm:mt-0 w-full sm:w-auto h-10 rounded-lg bg-purple-300 hover:bg-purple-700 flex justify-center">
                        <Link to={`/chat/${email.split('.')[0]}`} class="text-base text-[#222] flex items-center px-4 sm:px-6">Chat</Link>
                    </div>
                </div>
            ))}
        </div>
    </div>
</div>


    </>
  )
}

export default Chats