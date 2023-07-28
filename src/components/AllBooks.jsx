import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";
const AllBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/allbooks`);
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching images:", error);
        setBooks([]);
      }
    };

    fetchBooks();
  }, []);

  return (
    <>
      <NavBar />
      <div className="top-0 bg-[#222]">
        <div className="w-full bg-[#222] pt-20">
          <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12">
            <div className="text-center pb-12">
              <h2 className="text-base font-bold text-yellow-400">
                We have the books which are not found easily
              </h2>
              <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-white">
                Check out out awesome collection of books
              </h1>
            </div>
            <div class="py-2 my-5 relative mx-auto text-gray-600">
              <input class="border-2 w-full  border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                type="search" name="search" placeholder="Search" />
              <button type="submit" class="absolute right-0 top-0 mt-5 mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="512"
                height="512"
                x="0"
                y="0"
                className="text-gray-600 h-4 w-4 fill-current"
                enableBackground="new 0 0 56.966 56.966"
                version="1.1"
                viewBox="0 0 56.966 56.966"
                xmlSpace="preserve"
              >
                <path d="M55.146 51.887L41.588 37.786A22.926 22.926 0 0046.984 23c0-12.682-10.318-23-23-23s-23 10.318-23 23 10.318 23 23 23c4.761 0 9.298-1.436 13.177-4.162l13.661 14.208c.571.593 1.339.92 2.162.92.779 0 1.518-.297 2.079-.837a3.004 3.004 0 00.083-4.242zM23.984 6c9.374 0 17 7.626 17 17s-7.626 17-17 17-17-7.626-17-17 7.626-17 17-17z"></path>
              </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {books.map((data, index) => (
                <Link to={`/book/${data.id}`}>
                  <div
                    key={index}
                    className="w-full group bg-gray-900 rounded-lg sahdow-lg p-12 flex flex-col justify-center items-center hover:shadow-[0px_0px_3px_3px_#facc15] hover:bg-[#ccc] hover:text-black"
                  >
                    <div className="mb-8">
                      <img
                        className="object-center object-cover h-36 w-36"
                        src={`http://${data.path}`}
                        alt="photo"
                      />
                    </div>
                    <div className="text-center">
                      <p className="text-xl text-white font-bold mb-2 group-hover:text-[#000]">
                        {data.book}
                      </p>
                      <p className="text-base text-gray-400 font-normal group-hover:text-[#222">
                        {data.author}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default AllBooks;
