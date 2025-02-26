import '../styles/loginLayout.css'
import IDIcon from "./IdIcon";
import { useForm } from 'react-hook-form'
import React, {useRef, useState} from "react";
import {useAuth} from "../storage/AuthContext"
import Login from "../api/auth/auth"
import { useNavigate } from "react-router-dom"

const LoginForm = () => {
    const { register, handleSubmit, setValue, formState: {errors} } = useForm();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [animate, setAnimate] = useState(false);
    const { setAccessToken } = useAuth();
    const containerRefs = useRef([React.createRef(), React.createRef()]);
    const navigate = useNavigate();

    const validate = () => {
        if (errors.email || errors.password) {
            setAnimate(true);
            setTimeout(() => setAnimate(false), 1000);
        }
    }
    const onSubmit = async (data) => {
        try {
            const loginResponse = await Login(data.email, data.password, 1);
            console.log("Login successful: " + loginResponse);
            if (loginResponse) {
                setAccessToken(loginResponse.accessToken);
                navigate("/", {replace: true})
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const onInputGroupClick = (index) => {
        const input = containerRefs.current[index].current.querySelector("input");
        if (input) {
            input.focus();
        }
    }

    function togglePasswordVisibility() {
       const passwordInput = document.getElementById('password');
       const eyeIcon = document.getElementById('eyeIcon');
        setPasswordVisible(passwordVisible => !passwordVisible);
       if (passwordInput.type === 'password') {
           eyeIcon.src = "/assets/svg/Eye.svg";
       } else {
           eyeIcon.src = "/assets/svg/Hide.svg";
       }
    }

    function clearLoginInput() {
        setValue("email", "");
    }

    return (
        <form onSubmit={ handleSubmit(onSubmit) }>
            <div className="login-wrapper">
                <div className='login-header'>
                    <IDIcon/>
                    <p className='login-title'>Войдите в систему</p>
                </div>
                <div className='login-inputs'>
                    <div className='input-group' onClick={ () => onInputGroupClick (0)} ref={containerRefs.current[0]} key='0'>
                        <div className={`overlay${animate ? ' input-error' : ''}`}/>
                        <input id='login' type='text' placeholder=' ' className='login-input truncate' {...register('email', {
                            required: true,
                            pattern: {value: /^\S+@\S+$/i}
                        })}/>
                        <label htmlFor='login' className='placeholder'>Введите email</label>
                        <button className='btn cncl-icon' onClick={clearLoginInput} type='button'>
                            <img src="/assets/svg/Close.svg" alt="Показать пароль" />
                        </button>
                    </div>

                    <div className='input-group' onClick={ () => onInputGroupClick(1) } ref={containerRefs.current[1]} key='1'>
                        <div className={`overlay${animate ? ' input-error' : ''}`}/>
                        <input id='password' type={passwordVisible ? 'text' : 'password'} placeholder=' ' className='login-input truncate' {...register('password', {
                            required: true,
                            minLength: {value: 8}
                        })}/>
                        <label htmlFor='password' className='placeholder'>Введите пароль</label>
                        <button id="togglePassword" type='button' onClick={ togglePasswordVisibility } className='btn reveal-pass'>
                            <img src="/assets/svg/Hide.svg" alt="Показать пароль" id="eyeIcon" />
                        </button>
                    </div>

            </div>
            <div className='login-buttons'>
                <button className='form-btn login' onClick={validate} type='submit'>Войти</button>
                <button className='form-btn register' type='button'>Зарегистрироваться</button>
                <button className='form-btn forgot' type='button'>Не помню пароль</button>
                </div>
            </div>
        </form>

    );
};


export default LoginForm;