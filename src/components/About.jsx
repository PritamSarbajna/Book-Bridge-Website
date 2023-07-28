import React, { useContext } from 'react'
import { AuthContext } from '../contexts/auth';

const About = () => {
    const { logout } = useContext(AuthContext);

    const HandleLogout = async (e) => {
        e.preventDefault();
        await logout();
    }
  return (
    <>
        <div>About</div>
        <button onClick={HandleLogout}> Logout </button>
    </>
    
  )
}

export default About