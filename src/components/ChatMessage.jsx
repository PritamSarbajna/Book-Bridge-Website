import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import { useParams } from 'react-router-dom';


const ChatMessage = () => {
    const params = useParams();
    const [chatHistory, setChatHistory] = useState([]);
    

    const data = JSON.parse(localStorage.getItem('userdata'));
    const sender_email = data.email;
    const receiver_email = params.participant  + '.com';

    const encodedSenderEmail = encodeURIComponent(sender_email);
    const encodedParicipantEmail = encodeURIComponent(receiver_email);

    const [message, setMessage] = useState('');

    const requestData = {
        sender_email: sender_email,
        receiver_email: receiver_email,
        message: message,
      };

    const HandleSendMessage = async (e) => {
        e.preventDefault();

        try {
            const endpoint = "http://127.0.0.1:8000/send_message"
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify(requestData),
            });
            const data = await response.json();
                console.log(data); // Handle the response data here
                setMessage('');
            } catch (error) {
                console.error(error);
            }

    }



    const fetchChatHistory = async () => {
        try {
          const endpoint = `http://127.0.0.1:8000/chat_history/${encodedSenderEmail}/${encodedParicipantEmail}`;
          const response = await fetch(endpoint);
          const chatHistory = await response.json();
          setChatHistory(chatHistory);

        } catch (error) {
          console.error(error);
        }
      };
    
      useEffect(() => {
        fetchChatHistory();
      }, [encodedSenderEmail, encodedParicipantEmail]);

  return (
    <>
      <NavBar />
      <div className="container mt-5 flex justify-center items-center mx-auto shadow-lg rounded-lg h-[100vh]">
        <div className="flex flex-row justify-between">
          <div className="min-w-[80vw] min-h-[80vh] px-5 flex flex-col justify-between">
            <div className="flex flex-col mt-5 max-h-96 overflow-y-auto">
              {/* Render the chat messages here */}
              {chatHistory.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender_email === sender_email ? 'justify-end' : 'justify-start'
                  } mb-4`}
                >
                  <div
                    className={`${
                      message.sender_email === sender_email
                        ? 'mr-2 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white'
                        : 'ml-2 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white'
                    } py-3 px-4`}
                  >
                    {message.message}
                  </div>
                </div>
              ))}
            </div>
            <div className="my-10 bottom-0">
                              <div className="flex items-center w-full mx-auto rounded-lg">
                <div className="w-full py-5">
                    <input type="search" className="w-full text-lg py-5 px-3 text-[#eee] rounded-xl focus:outline-none"
                        placeholder="Send a message here" value={message} onChange={(e) => setMessage(e.target.value)} />
                </div>
                <div>
                <button
                    onClick={HandleSendMessage}
                    className="mx-2 rounded"
                    >
                    <svg
                    className='h-7 w-7'
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 256"
                    >
                    <path
                        fill="#fff"
                        strokeMiterlimit="10"
                        strokeWidth="0"
                        d="M89.999 3.075a3.117 3.117 0 00-.038-.561c-.007-.041-.009-.081-.018-.122a2.924 2.924 0 00-.144-.484c-.018-.046-.041-.089-.061-.134a3.496 3.496 0 00-.269-.484 3 3 0 00-.341-.417 3.057 3.057 0 00-.914-.617c-.039-.017-.076-.037-.116-.053a2.955 2.955 0 00-.497-.147c-.031-.006-.063-.008-.094-.014a2.939 2.939 0 00-.994 0c-.035.006-.069.008-.104.015a2.982 2.982 0 00-.456.129L1.946 31.709a3.001 3.001 0 00-.25 5.511l34.455 16.628 16.627 34.455a3.003 3.003 0 005.513-.249L89.815 4.048c.056-.149.097-.3.128-.453.008-.041.011-.081.017-.122.022-.132.035-.265.039-.398zm-14.913 7.597L37.785 47.973 10.619 34.864l64.467-24.192zm-19.95 68.709L42.027 52.216l37.302-37.302-24.193 64.467z"
                        transform="matrix(2.81 0 0 2.81 1.407 1.407)"
                    ></path>
                </svg>
                    </button>
                </div>
                </div>
                <p>Chatting with : {receiver_email}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChatMessage