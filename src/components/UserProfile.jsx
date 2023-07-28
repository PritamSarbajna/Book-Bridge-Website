import React, { useState, useEffect } from 'react'
import NavBar from './NavBar'
import { Link } from 'react-router-dom'

const UserProfile = () => {
    const data = JSON.parse(localStorage.getItem('userdata'));
    const email = data.email;
    const [images, setImages] = useState([]);

    useEffect(() => {
        const encodedEmail = encodeURIComponent(email);
        fetch(`http://127.0.0.1:8000/userbooks/${encodedEmail}`)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => setImages(data))
          .catch(error => {
            console.error('Error fetching data:', error);
            // Optionally, setImages([]) here if you want to clear the images state in case of an error.
          });
    }, [email]);

    return (
    <>
        <NavBar />
        <div className="flex justify-center items-center">
            <div className="flex md:flex sm:flex justify-center items-center">

                    
                <div className="w-4/5 p-8 shadow-md mt-20">
                    <div className="flex justify-between">
                        <span className="text-xl font-semibold block">User Profile</span>
                    </div>
                    <span className="text-gray-600">This information is secret so be careful</span>
                            
                    <div className="rounded  shadow p-6">
                        <div className="pb-6">
                            <label htmlFor="name" className="font-semibold text-gray-700 block pb-1">Name</label>
                            <div className="flex">
                                <input disabled id="username" className="border-1  rounded-r px-4 py-2 w-full" type="text" value={data.name} />
                            </div>
                        </div>
                            <div className="pb-4">
                            <label htmlFor="about" className="font-semibold text-gray-700 block pb-1">Email</label>
                            <input disabled id="email" className="border-1  rounded-r px-4 py-2 w-full" type="email" value={data.email}  />
                            <span className="text-gray-600 pt-4 block opacity-70">Personal login information of your account</span>
                        </div>
                        <div className="w-full p-8 mx-2 flex justify-start">
                            <Link to='/addbooks' className='btn glass'>Add Books</Link>                          
                        </div>
                    </div>


                    {images? (
                    <>
                        <div className="flex my-5 justify-between items-center text-center">
                            <span className="w-full text-3xl font-semibold block text-[#fff] uppercase font-mono">Books You have uploaded</span>
                        </div>
                        <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 md:flex-row  gap-1 ">
                            {images.map((image, index) => (
                            	<div key={index} className=" mx-3">
                                <div className="flex flex-col">
                                    <div className="bg-gray-900 border border-gray-900 shadow-lg  rounded-3xl p-4 m-4">
                                        <div className="flex-none sm:flex justify-center items-center">
                                            <div className="relative h-20 w-20  sm:mb-0 mb-3 flex justify-center items-center text-center">
                                                <img src={`http://${image.path}`} className="h-20 w-20 object-cover rounded-2xl" />
                                                <a href="#"
                                                    className="absolute -right-2 bottom-2 -ml-3  text-white p-1 text-xs bg-green-400 hover:bg-green-500 font-medium tracking-wider rounded-full transition ease-in duration-300">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                                        className="h-4 w-4">
                                                        <path
                                                            d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z">
                                                        </path>
                                                    </svg>
                                                </a>
                                            </div>
                                            <div className="flex-auto sm:ml-5 justify-evenly">
                                                <div className="flex items-center justify-between sm:mt-2">
                                                    <div className="flex items-center">
                                                        <div className="flex flex-col">
                                                            <Link to="">
                                                                <div className="w-full flex-none text-base text-gray-200 font-bold leading-none">{image.book}</div>
                                                                <div className="flex-auto text-gray-400 my-1">
                                                                    <span className="mr-3 ">{image.author}</span>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-row items-center">
                                                    
                        
                                                    </div>
                                                    <div className="flex pt-2  text-sm text-gray-400">
                                                        <div className="flex-1 inline-flex items-center mr-5">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20"
                                                                fill="currentColor">
                                                                <path fillRule="evenodd"
                                                                    d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                                                                    clipRule="evenodd"></path>
                                                            </svg>
                                                            <p className="">{image.tags}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                        
                            </div>
                            ))}
                        </div> 
                        </>
                        ) :(
                            <div className="text-center text-gray-600 mt-4">No books uploaded yet.</div>
                        )}

                </div>

            </div>
        
        </div>

































    

    </>
  )
}

export default UserProfile