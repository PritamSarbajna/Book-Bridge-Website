import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts/auth';

const NavBar = () => {

    const data = JSON.parse(localStorage.getItem('userdata'))

    const { logout } = useContext(AuthContext);

    const HandleLogout = async (e) => {
        e.preventDefault();
        await logout();
    }

  return (
    <>
        <div className="navbar bg-transparent backdrop-blur-md top-0 z-50 fixed w-full text-[#fff] px-5">
            <div className="navbar-start">
                <div className="dropdown">
                <label tabIndex={0} className="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="max-h-5 max-w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                </label>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-[#0B666A] rounded-box w-52">
                    <li><Link to="/all">Book List</Link></li>
                    {/* <li><Link to="/about">About</Link></li> */}
                    <li><Link to="/contact">Contact Us</Link></li>
                </ul>
                </div>
            </div>
            <div className="navbar-center">
                <Link to="/" className="btn btn-ghost normal-case text-xl font-serif tracking-widest">Book Bridge</Link>
            </div>
            <div className="navbar-end">
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                        <img src="https://img.icons8.com/fluency/48/000000/user-female-circle.png" alt="user-female-circle" />
                        </div>
                    </label>
                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-[#0B666A] rounded-box w-52">
                        <p className='justify-between p-3 text-base'>Hey, <span className='font-medium'>{data.name}</span></p>
                        <li>
                        <Link to="/profile" className="justify-between">
                            Profile
                            <span className="badge">New</span>
                        </Link>
                        </li>
                        <li><Link to="/chat">Chat</Link></li>
                        <li><button onClick={HandleLogout}> Logout </button></li>
                    </ul>
                </div>
            </div>
        </div>
    </>
  )
}

export default NavBar