import React from 'react'
import '../styles/login.css'
import AuthModal from "../components/auth/AuthModal";


function Login() {
    return (
        <>
            <div className='login-layout'>
                <AuthModal />

            </div>
        </>
    )
}

export default Login