import '../styles/loginLayout.css'
import IDIcon from "./IdIcon";
import { useForm } from 'react-hook-form'
import React, { useState } from "react";

const LoginForm = () => {
    const { register, handleSubmit, setValue, formState: {errors} } = useForm();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [animate, setAnimate] = useState(false);
    const validate = () => {
        if (errors.email || errors.password) {
            setAnimate(true);
            setTimeout(() => setAnimate(false), 1000);
        }
    }
    const onSubmit = (data) => {

        console.log("Submitted", data)
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
                    <div className='input-group'>
                        <input id='login' type='text' placeholder=' ' className={`login-input${animate ? ' input-error' : ''}`} {...register('email', {
                            required: "",
                            pattern: {value: /^\S+@\S+$/i}
                        })}/>
                        <label htmlFor='email' className='placeholder'>Введите email</label>
                        <button className='btn cncl-icon' onClick={clearLoginInput}>
                            <img src="/assets/svg/Close.svg" alt="Показать пароль" />
                        </button>
                    </div>

                    <div className='input-group'>
                        <input id='password' type={passwordVisible ? 'text' : 'password'} placeholder=' ' className={`login-input${animate ? ' input-error' : ''}`} {...register('password', {
                            required: "",
                            minLength: {value: 8}
                        })}/>
                        <label htmlFor='password' className='placeholder'>Введите пароль</label>
                        <button id="togglePassword" onClick={ togglePasswordVisibility } className='btn reveal-pass'>
                            <img src="/assets/svg/Hide.svg" alt="Показать пароль" id="eyeIcon" />
                        </button>
                    </div>

            </div>
            <div className='login-buttons'>
                <button className='form-btn login' onClick={validate} type='submit'>Войти</button>
                    <button className='form-btn register'>Зарегистрироваться</button>
                    <button className='form-btn forgot'>Не помню пароль</button>
                </div>
            </div>
        </form>

    );
};


export default LoginForm;