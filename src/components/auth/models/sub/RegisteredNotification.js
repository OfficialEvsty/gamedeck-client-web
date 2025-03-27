import React, {useEffect, useState} from "react";
import {VerifyEmail} from "../../../../api/verification/verification";
import {Link, useLocation} from "react-router-dom";

const RegisteredNotification = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const tokenToVerify = searchParams.get('token');
    const [isRegistrationError, setRegistrationError] = useState(false);
    //const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await VerifyEmail(tokenToVerify);
            } catch (err){
                console.log(err);
                if (err.code === 13 || err.code === 3) {setRegistrationError(true);}
            } finally {
                //setLoading(false);
            }
        };
        fetchData();
    }, [tokenToVerify]);


    return (
        <div className='auth-wrapper no-gap'>
            <div className='info-block-frame itms-centered'>
                <div className='info-block-body'>
                    <img src={"/assets/svg/" + (isRegistrationError ? "Error.svg" : "Check.svg")} alt='Результат'/>
                    <span className='login-title'>{isRegistrationError ? "Ошибка" : "Аккаунт создан"}</span>
                </div>
            </div>
            <div className='auth-buttons'>
                <button className="form-btn" >
                    <Link className="" to="/oauth">
                        {isRegistrationError ? "Повторить" : "Войти"}
                    </Link>
                </button>
            </div>
        </div>
    );
};

export default RegisteredNotification;