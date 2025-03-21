import React, {useEffect, useState} from "react";
import {Register} from "../../../api/auth/auth";
import {makeToken} from "../../../libs/encrypter";
import emailTemplate from "../../../templates/mails/email_verification_mail.json";
import {SendMail} from "../../../api/mailer/mailer";

const EmailVerificationForm = ({ onSwitchToLogin }) => {
    const timeBeforeRepeat = 60;
    const [timeLeft, setTimeLeft] = useState(timeBeforeRepeat); // Таймер на 60 секунд
    const [isRunning, setIsRunning] = useState(false); // Состояние таймера (запущен/остановлен)

    const startTimer = () => {
        setIsRunning(true);
    }

    // Сбросить таймер
    const resetTimer = () => {
        setTimeLeft(timeBeforeRepeat);
        setIsRunning(false);
    }

    useEffect(() => {
        if (isRunning && timeLeft > 0) {
            const timer = setTimeout(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0) {
            setIsRunning(false);
        }
    }, [isRunning, timeLeft]);

    const onSubmit = async (data) => {
        try {
            await Register(data.email, data.password)
                .then(async () => {
                    const token = makeToken();
                    const {subject, text, html} = emailTemplate;
                    const protocol = window.location.protocol;
                    const host = window.location.hostname;
                    const ref = `${protocol}//${host}/email_verify?token=${token}`
                    await SendMail("", data.email, subject, text + ref, html)
                        .then(() => {
                            console.log(`Письмо успешно отправлено на домен: ${data.email.split("@")[1]}`);
                        })

                }).catch(
                    err => {
                        console.log(err);
                    }
                )
            /*const registerResponse = await Register(data.email, data.password);
            if (registerResponse) {
                // todo: return to login modal
            }*/
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <div className='auth-wrapper'>
                <div className='auth-header secondary'>
                    <button className='close-button inline' onClick={onSwitchToLogin}>
                        <img src='/assets/svg/ArrowBack.svg' alt='Назад'/>
                    </button>
                    <span>Проверьте почту</span>
                </div>
                <div className='auth-buttons'>
                    <button className='form-btn' type='submit' onClick={validate}>Отправить код</button>
                </div>
            </div>
        </form>
    );
};

export default EmailVerificationForm;