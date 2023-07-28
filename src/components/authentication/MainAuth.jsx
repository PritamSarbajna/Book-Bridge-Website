import React, { useState } from 'react';
import { Login, Register } from '../../components'

const MainAuth = () => {

    const [activeTab, setActiveTab] = useState('login');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

  return (
    <>
        <div>
            <div className=''>
                <div className="tab-buttons absolute z-50 bottom-0 mb-6 right-10 p-2 rounded-xl bg-[#1a0202] flex">
                    <button
                    onClick={() => handleTabChange('login')}
                    className={`btn mr-5 border-2 shadow-sm ${activeTab === 'login' ? 'active bg-[#6c6a6a]' : ''} hover:bg-[#6c6a6a]`}
                    >
                    Login here
                    </button>
                    <button
                    onClick={() => handleTabChange('register')}
                    className={`btn border-2 shadow-sm ${activeTab === 'register' ? 'active bg-[#6c6a6a]' : ''} hover:bg-[#6c6a6a]`}
                    >
                    Register here
                    </button>
                </div>
            </div>
            <div className="tab-content">
                {activeTab === 'login' ? <Login /> : <Register />}
            </div>
        </div>
    </>
  )
}

export default MainAuth