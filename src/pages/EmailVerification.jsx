import React from 'react'
import '../styles/login.css'
import {useParams} from "react-router-dom";
import RegisteredNotification from "../components/auth/models/sub/RegisteredNotification";
//import AuthModal from "../components/auth/AuthModal";


function EmailVerification() {
    const { token } = useParams()
    return (
        <>
            <div className='login-layout'>
                <RegisteredNotification tokenToVerify={token} />
            </div>
        </>
    )
}

export default EmailVerification