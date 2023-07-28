import React, { useContext } from 'react'
import { AuthContext } from '../contexts/auth';
import NavBar from './NavBar';
import { Link } from 'react-router-dom';

const Hero = () => {
  const { logout } = useContext(AuthContext);

  const HandleLogout = async (e) => {
    e.preventDefault();
    await logout();
  }

  return (
    <>
      <NavBar />
      <div className="relative w-full ">

        <div className="relative bg-[#222] h-[100vh]">
            <div className="container m-auto px-6 pt-32 md:px-12 lg:pt-[4.8rem] lg:px-7">
                <div className="flex items-center flex-wrap px-2 md:px-0">
                    <div className="relative lg:w-6/12 lg:py-24 xl:py-32">
                        <h1 className="font-bold text-4xl text-yellow-400 md:text-5xl lg:w-10/12">Help your peers, <br />with books!</h1>
                        <p className="mt-8 text-[#ccc lg:w-10/12">Finding books got really <Link href="#" className="text-[#FFE17B]">easy</Link> </p>
                    </div>
                    <div className="right-2 lg:w-6/12 flex justify-end">
                        <img src="/public/hero.png" className="" alt="food illustration" loading="lazy" width="400" height="400" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Hero