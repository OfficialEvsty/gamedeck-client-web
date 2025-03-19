import LoginForm from "./models/LoginModal";
import RegisterForm from "./models/RegisterModal";
import {useState} from "react";


const AuthModal = () => {
    const [currentForm, setCurrentForm] = useState('login');

    const switchToLogin = () => setCurrentForm('login');
    const switchToRegister = () => setCurrentForm('register');
    const switchToForgotPassword = () => setCurrentForm('forgot');

    const forms = {
        login: <LoginForm onSwitchToRegister={switchToRegister} onSwitchToForgotPassword={switchToForgotPassword} />,
        register: <RegisterForm onSwitchToLogin={switchToLogin} />,
    };

    return (
        <div>
            {forms[currentForm]}
        </div>
    )
}

export default AuthModal;