import '../../../styles/login.css'
import '../../../styles/auth.css'
import httpCodeErrors from '../../../templates/errors/http/login.json'
import IDIcon from "../../IdIcon";
import { useForm } from 'react-hook-form'
import React, {useRef, useState} from "react";
import {useAuth} from "../../../storage/AuthContext"
import { Login } from "../../../api/auth/auth"
import { useNavigate } from "react-router-dom"
import {grpcToHttpCodes} from "../../../libs/grpcToHttpCodes";

const LoginForm = ( {onSwitchToRegister, onSwitchToForgotPassword} ) => {
    const { register, handleSubmit, setError, setValue, formState: {errors} } = useForm();
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
        catch (grpcError) {
            const type = 'root.serverError';
            httpCodeErrors.forEach(err => {
                if (grpcToHttpCodes(grpcError.code) === err.code) {
                    setError(type, {type: type, message: err.message});
                }
            })
        }
    }

    const onInputGroupClick = (index) => {
        const input = containerRefs.current[index].current.querySelector("input");
        if (input) {
            input.focus();
        }
    }

    const eyeIcons = document.getElementsByClassName('reveal-pass');

    function togglePasswordVisibility() {
        setPasswordVisible(passwordVisible => !passwordVisible);
        Array.from(eyeIcons).forEach((icon) => {
            const closedIcon = icon.querySelector('img[data-icon="closed"]');
            const openIcon = icon.querySelector('img[data-icon="open"]');
            closedIcon.classList.toggle('hidden');
            openIcon.classList.toggle('hidden');
        });
    }


    function clearLoginInput() {
        setValue("email", "");
    }

    return (
        <form onSubmit={ handleSubmit(onSubmit) }>
            <div className='auth-wrapper'>
                <div className='auth-header'>
                    <IDIcon/>
                    <p className='login-title'>Войдите в систему</p>
                </div>
                <div className='auth-inputs'>
                    <div className={"input-group " + (errors.email ? 'err' : '')} onClick={ () => onInputGroupClick (0)} ref={containerRefs.current[0]} key='0'>
                        <div className={`overlay${animate ? ' input-error' : ''}`}/>
                        <input id='login' type='text' placeholder=' ' className='auth-input truncate' {...register('email', {
                            required: true,
                            pattern: {value: /^\S+@\S+$/i, message: 'Введите корректный ардес электронной почты'}
                        })}/>
                        <label htmlFor='login' className='placeholder'>Введите email</label>
                        <button className='btn cncl-icon' onClick={clearLoginInput} type='button'>
                            <img src="/assets/svg/Close.svg" alt="Показать пароль" />
                        </button>
                    </div>

                    <div className={"input-group " + (errors.password ? 'err' : '')} onClick={ () => onInputGroupClick(1) } ref={containerRefs.current[1]} key='1'>
                        <div className={`overlay${animate ? ' input-error' : ''}`}/>
                        <input id='password' type={passwordVisible ? 'text' : 'password'} placeholder=' ' className='auth-input truncate' {...register('password', {
                            required: true,
                            minLength: {value: 8, message: 'Минимальная длина пароля 8 символов'}
                        })}/>
                        <label htmlFor='password' className='placeholder'>Введите пароль</label>
                        <button id="togglePassword" type='button' onClick={ togglePasswordVisibility } className='btn reveal-pass'>
                            <img src="/assets/svg/Hide.svg" data-icon="closed" alt="Toggle password visibility"/>
                            <img src="/assets/svg/Eye.svg" data-icon="open" alt="Toggle password visibility"
                                 className="hidden"/>
                        </button>
                    </div>
                    {errors.email && <span className="err-msg">{errors.email.message}</span>}
                    {errors.password && <span className="err-msg">{errors.password.message}</span>}
                    {errors.root?.serverError && <span className="err-msg">{errors.root?.serverError.message}</span>}
                </div>
                <div className='auth-buttons'>
                    <button className='form-btn login' onClick={validate} type='submit'>Войти</button>
                    <button className='form-btn register' type='button' onClick={onSwitchToRegister}>Зарегистрироваться</button>
                    <button className='form-btn forgot' type='button' onClick={onSwitchToForgotPassword}>Не помню пароль</button>
                </div>
            </div>
        </form>

    );
};


export default LoginForm;