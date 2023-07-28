import React, { useState } from 'react'
import NavBar from './NavBar'
import { useNavigate } from 'react-router-dom'

const AddBooks = () => {

    const navigate = useNavigate();

    const data = JSON.parse(localStorage.getItem('userdata'))
    const email = data.email
    const [book, setBook] = useState('');
    const [author, setAuthor] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [tags, setTags] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null)

    const [success, setSuccess] = useState(false);

    const HandleFileChange = (e) => {
        setFile(e.target.files[0])
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file_upload', file)
        formData.append('email', email)
        formData.append('book', book)
        formData.append('author', author)
        formData.append('country', country)
        formData.append('state', state)
        formData.append('tags', tags)
        formData.append('description', description)


        try{
            const endpoint = "http://127.0.0.1:8000/addbooks"
            const response = await fetch(endpoint, {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                // Handle the response data here
                console.log("File uploaded successfully")
                setSuccess(true); // Set the success state to true
                setTimeout(() => {
                    setSuccess(false); 
                    navigate('/profile'); // Redirect to the profile page after a delay
                }, 2000);
            })
        }
        catch(e){
            console.log(e)
        }
    }

    return (
    <>
        <NavBar />
        {!success? (
            <div className="min-h-screen flex justify-center items-center p-6 bg-[#222]">
            <div className="container mt-5 max-w-screen-lg mx-auto">
                <div className='text-[#000]'>

                <div className="bg-[#111] rounded shadow-lg p-4 px-4 md:p-8 mt-6 mb-4">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                    <div className="text-gray-600">
                        <p className="font-bold text-lg text-[#eee]">Add Book Details</p>
                        <p className='text-[#ccc]'>Please fill out all the fields.</p>
                    </div>

                    <div className="lg:col-span-2">
                        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                        <div className="md:col-span-5">
                            <label className='text-[#eee]' htmlFor="full_name">Full Name</label>
                            <input type="text" name="full_name" id="full_name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 " disabled value={data.name} />
                        </div>

                        <div className="md:col-span-5">
                            <label className='text-[#eee]' htmlFor="email">Email Address</label>
                            <input type="text" name="email" id="email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" disabled value={data.email} placeholder="email@domain.com" />
                        </div>

                        <div className="md:col-span-2">
                            <label className='text-[#eee]' htmlFor="address">Book</label>
                            <input type="text" name="address" id="address" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={book} onChange={(e) => setBook(e.target.value)} placeholder="Book" />
                        </div>

                        <div className="md:col-span-2">
                            <label className='text-[#eee]' htmlFor="city">Author / Publication</label>
                            <input type="text" name="city" id="city" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author / Publication" />
                        </div>

                        <div className="md:col-span-2">
                            <label className='text-[#eee]' htmlFor="country">Country / region</label>
                            <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                            <input name="country" id="country" placeholder="Country" className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent" value={country} onChange={(e) => setCountry(e.target.value)} />
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <label className='text-[#eee]' htmlFor="state">State / province</label>
                            <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                            <input name="state" id="state" placeholder="State" className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent" value={state} onChange={(e) => setState(e.target.value)}/>
                            </div>
                        </div>

                        <div className="md:col-span-5">
                            <label className='text-[#eee]' htmlFor="tags">Tags</label>
                            <input type="text" name="tags" id="tags" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 " placeholder='Write the tags separated by commas' value={tags} onChange={(e) => setTags(e.target.value)} />
                        </div>
                        <div className="md:col-span-5">
                            <label className='text-[#eee]' htmlFor="description">Description</label>
                            <textarea type="text" name="description" id="description" className="h-20 border mt-1 rounded px-4 py-2 w-full bg-gray-50 " placeholder='Write short description about the book....' value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>

                        {/* <div className="md:col-span-5">
                            <div className="inline-flex items-center">
                            <input type="checkbox" name="billing_same" id="billing_same" className="form-checkbox" />
                            <label htmlFor="billing_same" className="ml-2">My billing address is different than above.</label>
                            </div>
                        </div> */}
 
                        <div className="md:col-span-2 mt-4 text-[#eee]">
                            <label className='text-[#eee]' htmlFor="soda">Upload image of the book</label>
                            <div className='p-2'>
                                <input onChange={HandleFileChange} type="file" className="file-input file-input-bordered file-input-sm w-full max-w-xs" />
                            </div>
                        </div>
                
                        <div className="md:col-span-5 text-right">
                            <div className="inline-flex items-end">
                            <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                            </div>
                        </div>

                        </div>
                    </div>
                    </div>
                </div>
                </div>

            </div>
        </div>
        ):(
            <div className='absolute h-[100vh] w-full'>
                <div className="flex h-[100vh] w-full items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="ml-2 text-2xl text-green-500">File uploaded successfully!</h3>
                </div>
            </div>
        )}
    </>
  )
}

export default AddBooks