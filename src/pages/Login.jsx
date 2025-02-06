import React from 'react'
import LoginModal from '../components/LoginModal'
import '../styles/loginLayout.css'


function Login() {
    return (
        <>
            <div className='login-layout'>
                <LoginModal />
            </div>
        </>
    )
}

export default Login