import React from 'react'
//import LoginForm from '../components/LoginModal'
import '../styles/login.css'
import RegisterForm from "../components/RegisterModal";


function Login() {
    return (
        <>
            <div className='login-layout'>
                <RegisterForm />

            </div>
        </>
    )
}

export default Login