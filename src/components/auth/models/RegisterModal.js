import {useForm} from "react-hook-form";
//import {useState} from "react";
import { Register } from "../../../api/auth/auth"
import "../../../styles/register.css";
import "../../../styles/auth.css"
import React, {useRef, useState} from "react";
import { SendMail } from "../../../api/mailer/mailer";
import {makeToken} from "../../../libs/encrypter";

const RegisterForm = ({ onSwitchToLogin }) => {
    const { register, handleSubmit, setValue, watch, formState: {errors} } = useForm();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const containerRefs = useRef([React.createRef(), React.createRef(), React.createRef()]);

    const onSubmit = async (data) => {
        try {
            await Register(data.email, data.password)
                .then(() => {
                    const jsonUrl = "../../../templates/mails/email_verification_mail.json";
                    const token = makeToken();
                    fetch(jsonUrl)
                        .then((response) => response.json())
                        .then(async (data) => {
                            const { to, subject, text, html} = data;
                            const protocol = window.location.protocol;
                            const host = window.location.hostname;
                            const ref = `${protocol}://${host}/email_verify?token=${token}`
                            await SendMail("", to, subject, text+ref, html)
                                .then(() => {
                                    console.log(`Письмо успешно отправлено на email: ${data.email}`);
                                })

                        }).catch(
                        err => {
                            console.log(err);
                        }
                    )
            }).catch((err) => {
                console.error(err);
            });
            /*const registerResponse = await Register(data.email, data.password);
            if (registerResponse) {
                // todo: return to login modal
            }*/
        }
        catch (e) {
            console.error(e);
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
        const eyeIcons = document.getElementsByClassName('reveal-pass');
        setPasswordVisible(passwordVisible => !passwordVisible);
        if (passwordInput.type === 'password') {
            Array.from(eyeIcons).forEach((icon) => {
                icon.src = "/assets/svg/Eye.svg";
            })

        } else {
            Array.from(eyeIcons).forEach((icon) => {
                icon.src = "/assets/svg/Hide.svg";
            })

        }
    }

    const validate = () => {
        if (errors.email) {

        }
    }

    const clearLoginInput = () => {
        setValue('email', '');
    }

    return (
        <form onSubmit={ handleSubmit(onSubmit) }>
            <div className='auth-wrapper'>
                <div className='auth-header secondary'>
                    <button className='close-button inline' onClick={ onSwitchToLogin }>
                        <img src='/assets/svg/ArrowBack.svg' alt='Назад'/>
                    </button>
                    <span>Регистрация</span>
                </div>
                <div className='auth-inputs'>
                    <div className='input-group' onClick={ () => onInputGroupClick (0)} ref={containerRefs.current[0]} key='0'>
                        <input id='email' type='text' name='email' placeholder=' ' className='auth-input' {...register('email', {
                            required: true,
                            pattern: {value: /^\S+@\S+$/i}
                        })}></input>
                        <label htmlFor='login' className='placeholder'>Введите email</label>
                        <button className='btn cncl-icon' onClick={clearLoginInput} type='button'>
                            <img src="/assets/svg/Close.svg" alt="Показать пароль" />
                        </button>
                    </div>

                    <div className='input-group' onClick={ () => onInputGroupClick(1) } ref={containerRefs.current[1]} key='1'>
                        <input id='password' type={passwordVisible ? 'text' : 'password'} placeholder=' ' className='auth-input truncate' {...register('password', {
                            required: true,
                            minLength: {value: 8}
                        })}/>
                        <label htmlFor='password' className='placeholder'>Введите пароль</label>
                        <button type='button' onClick={ togglePasswordVisibility } className='btn reveal-pass'>
                            <img src="/assets/svg/Hide.svg" alt="Показать пароль" id="eyeIcon" />
                        </button>
                    </div>

                    <div className='input-group' onClick={ () => onInputGroupClick(2) } ref={containerRefs.current[2]} key='2'>
                        <input id='passwordConfirm' type={passwordVisible ? 'text' : 'password'} placeholder=' ' className='auth-input truncate' {...register('passwordConfirm', {
                            required: true,
                            minLength: {value: 8},
                            validate: (val) => {
                                if (watch('password') !== val) {
                                    return "Пароли не совпадают";
                                }
                            }
                        })}/>
                        <label htmlFor='passwordConfirm' className='placeholder'>Повторите пароль</label>
                        <button type='button' onClick={ togglePasswordVisibility } className='btn reveal-pass'>
                            <img src="/assets/svg/Hide.svg" alt="Показать пароль" id="eyeIcon" />
                        </button>
                    </div>

                </div>
                <div className='auth-buttons'>
                    <button className='form-btn' type='submit' onClick={validate}>Отправить код</button>
                </div>
            </div>
        </form>
    );
};

export default RegisterForm