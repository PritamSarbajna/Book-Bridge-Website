import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import { Link, useParams } from 'react-router-dom'

const SingleBook = () => {

    const params = useParams();
    const [data, setData] = useState(null);
    const [firstThreeTags, setFirstThreeTags] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
          try {
            const response = await fetch(`http://127.0.0.1:8000/allbooks/${params.id}`);
            const content = await response.json();
            setData(content);
            setFirstThreeTags(content.tags.split(',').slice(0, 3).map((tag) => tag.trim()));
            // console.log(content);
          } catch (error) {
            console.error('Error fetching data:', error);
            setData(null);
          }
        };
    
        fetchImages();
      }, [params.id]);

      if (data === null) {
        return <div>Loading...</div>;
      }


  return (
    <>
    <NavBar />
    <section className="text-gray-700 body-font overflow-hidden bg-[#222]">
        <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img alt="ecommerce" className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200" src={`http://${data.path}`} />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h1 className="text-[#fff] text-3xl title-font font-medium mb-1">{data.book}</h1>
                <h2 className="text-sm title-font text-[#bbb] tracking-widest uppercase">{data.author}</h2>
                
                <div className="flex mb-4">
                <span className="flex items-center">

                    <span className="text-gray-600 ml-3">
                    {firstThreeTags.length > 0 && (
                        <div className="md:col-span-5 mt-4">

                        <div>
                            {firstThreeTags.map((tag, index) => (
                            <button
                                key={index}
                                className="badge badge-accent mr-2 mb-2"
                            >
                                {tag}
                            </button>
                            ))}
                        </div>
                        </div>
                    )}
                    </span>
                </span>

                </div>
                <p className="leading-relaxed text-[#ddd]">{data.description}</p>
                <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                </div>

                <div className="flex">
                <span className="title-font font-medium text-2xl text-[#aaa]">{data.state}</span>
                <Link to={`/chat/${data.email.split('.')[0]}`} className="flex ml-auto text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-800 rounded">Chat</Link>
                </div>
            </div>
            </div>
        </div>
        </section>
    </>
  )
}

export default SingleBook