import {useForm} from "react-hook-form";
import { Register } from "../../../api/auth/auth"
import "../../../styles/register.css";
import "../../../styles/auth.css"
import "../../../styles/errors.css"
import "../../../styles/animations/loading.css"
import React, {useRef, useState} from "react";
import EmailVerificationModal from "./sub/EmailVerficationModal";

const AnimatedLoadingIcon = () => {
    return (<div className='cntr'>
        <img className='loads' src="/assets/svg/BlackLoading.svg" alt="loading" />
    </div>)

}

const RegisterForm = ({ onSwitchToLogin }) => {
    const minPasswordLength = 8;
    const { register, handleSubmit, setValue, watch, formState: {errors} } = useForm();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [registerSucceeded, setRegisterSucceeded] = useState(false);
    const [registeredEmail, setRegisteredEmail] = useState("");
    const containerRefs = useRef([React.createRef(), React.createRef(), React.createRef()]);
    const [loading, setLoading] = useState(false);
    // submit data from register form
    const onSubmit = async (data) => {
        try {
            setLoading(true)
            const protocol = window.location.protocol;
            const host = window.location.hostname;
            const callbackUrl = `${protocol}//${host}/email_verify?token=`;
            await Register(data.email, data.password, callbackUrl)
            setRegisteredEmail(data.email)
            setRegisterSucceeded(true);
        }
        catch (e) {
            console.error(e);
        }
        finally {
            setLoading(false)
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

    const validate = () => {
        if (errors.email) {

        }
    }

    const clearLoginInput = () => {
        setValue('email', '');
    }

    return (registerSucceeded ? <EmailVerificationModal onSwitchToLogin={onSwitchToLogin} registeredEmail={registeredEmail}/> :
        <form onSubmit={ handleSubmit(onSubmit) }>
            <div className='auth-wrapper'>
                <div className='auth-header secondary'>
                    <button className='close-button inline' onClick={ onSwitchToLogin }>
                        <img src='/assets/svg/ArrowBack.svg' alt='Назад'/>
                    </button>
                    <span>Регистрация</span>
                </div>
                <div className='auth-inputs'>
                    <div className={"input-group " + (errors.email ? 'err' : '')} onClick={ () => onInputGroupClick (0)} ref={containerRefs.current[0]} key='0'>
                        <input id='email' type='text' name='email' placeholder=' ' className='auth-input' {...register('email', {
                            required: "Email обязателен",
                            pattern: {value: /^\S+@\S+$/i, message: "Введите корректный Email"},
                        })}></input>
                        <label htmlFor='login' className='placeholder'>Введите email</label>
                        <button className='btn cncl-icon' onClick={clearLoginInput} type='button'>
                            <img src="/assets/svg/Close.svg" alt="Показать пароль" />
                        </button>
                    </div>

                    <div className={"input-group " + (errors.password ? 'err' : '')} onClick={ () => onInputGroupClick(1) } ref={containerRefs.current[1]} key='1'>
                        <input id='password' type={passwordVisible ? 'text' : 'password'} placeholder=' ' className='auth-input truncate ' {...register('password', {
                            required: true,
                            minLength: {value: minPasswordLength},
                        })}/>
                        <label htmlFor='password' className='placeholder'>Введите пароль</label>
                        <button type='button' onClick={togglePasswordVisibility} className='btn reveal-pass'>
                            <img src="/assets/svg/Hide.svg" data-icon="closed" alt="Toggle password visibility"/>
                            <img src="/assets/svg/Eye.svg" data-icon="open" alt="Toggle password visibility"
                                 className="hidden"/>
                        </button>
                    </div>

                    <div className={"input-group " + (errors.passwordConfirm ? 'err' : '')}
                         onClick={() => onInputGroupClick(2)} ref={containerRefs.current[2]} key='2'>
                        <input id='passwordConfirm' type={passwordVisible ? 'text' : 'password'} placeholder=' ' className='auth-input truncate' {...register('passwordConfirm', {
                            required: true,
                            minLength: {value: minPasswordLength},
                            validate: (val) => {
                                if (watch('password') !== val) {
                                    return "Пароли не совпадают";
                                }
                            }
                        })}/>
                        <label htmlFor='passwordConfirm' className='placeholder'>Повторите пароль</label>
                        <button type='button' onClick={ togglePasswordVisibility } className='btn reveal-pass'>
                            <img src="/assets/svg/Hide.svg" data-icon="closed" alt="Toggle password visibility"/>
                            <img src="/assets/svg/Eye.svg" data-icon="open" alt="Toggle password visibility"
                                 className="hidden"/>
                        </button>
                    </div>
                    {errors.email && <span className="err-msg">{errors.email.message}</span>}
                    {errors.passwordConfirm && <span className="err-msg">{errors.passwordConfirm.message}</span>}
                    {errors.password && <span className="err-msg">{errors.password.message}</span>}

                </div>
                <div className='auth-buttons'>
                    <button className='form-btn' disabled={loading} type='submit' onClick={validate}>
                        {loading ? <AnimatedLoadingIcon/> : "Отправить код"}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default RegisterForm;