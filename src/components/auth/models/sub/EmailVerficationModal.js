import React, {useEffect, useState} from "react";
import {makeToken} from "../../../../libs/encrypter";
import emailTemplate from "../../../../templates/mails/email_verification_mail.json";
import {SendMail} from "../../../../api/mailer/mailer";
import {SaveEmailToken} from "../../../../api/verification/verification";

const   EmailVerificationForm = ({ registeredEmail, onSwitchToLogin }) => {
    const timeBeforeRepeat = 60;
    const [timeLeft, setTimeLeft] = useState(timeBeforeRepeat); // Таймер на 60 секунд
    const [isRunning, setIsRunning] = useState(true); // Состояние таймера (запущен/остановлен)

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

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isRunning && timeLeft > 0) {
                return
            }
            startTimer()
            const token = makeToken();
            await SaveEmailToken(registeredEmail, token)
            console.log("Токен сохранен")
            const {subject, text, html} = emailTemplate;
            const protocol = window.location.protocol;
            const host = window.location.hostname;
            const ref = `${protocol}//${host}/email_verify?token=${token}`
            await SendMail("", registeredEmail, subject, text + ref, html)
                .then(() => {
                    console.log(`Письмо успешно отправлено на домен: ${registeredEmail.split("@")[1]}`);
                })
            /*const registerResponse = await Register(data.email, data.password);
            if (registerResponse) {
                // todo: return to login modal
            }*/
        } catch (e) {
            console.error(e);
            resetTimer()
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <div className='auth-wrapper gap32'>
                <div className='auth-header secondary'>
                    <button className='close-button inline' onClick={onSwitchToLogin}>
                        <img src='/assets/svg/ArrowBack.svg' alt='Назад'/>
                    </button>
                    <span>Проверьте почту</span>
                </div>
                <div className='info-body'>
                    <span className='info-block'>
                        <span>
                            <img className='info-icon' src='/assets/svg/info-icon.svg' alt='Информация'></img>
                        </span>
                        <span className='info-msg'>На почту {registeredEmail} было отправлено письмо со ссылкой для подтвеждения аккаунта</span>
                    </span>
                </div>
                <div className='auth-buttons'>
                    <button className={"form-btn "+(isRunning ? "blocked" : "")} onClick={onSubmit}>
                        <div>
                            Отправить повторно{isRunning && `: ${formatTime(timeLeft)}`}
                        </div>
                    </button>
                </div>
            </div>
        </form>
    );
};

export default EmailVerificationForm;