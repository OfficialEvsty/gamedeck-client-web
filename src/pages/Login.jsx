import React from 'react'
import '../styles/login.css'
import EmailVerficationModal from "../components/auth/models/EmailVerficationModal";
//import AuthModal from "../components/auth/AuthModal";


function Login() {
    return (
        <>
            <div className='login-layout'>
                <EmailVerficationModal />

            </div>
        </>
    )
}

export default Login