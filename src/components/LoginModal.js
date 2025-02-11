import '../styles/loginLayout.css'
import IDIcon from "./IdIcon";
import { useForm } from 'react-hook-form'

const LoginForm = () => {
    const { register, handleSubmit, formState: {errors} } = useForm();

    const onSubmit = (data) => {
        console.log("Submitted", data)
    }

    return (
        <form onSubmit={ handleSubmit(onSubmit) }>
            <div className="login-wrapper">
                <div className='login-header'>
                    <IDIcon/>
                    <p className='login-title'>Войдите в систему</p>
                </div>
                <div className='login-inputs'>
                    <div className='input-wrapper'>
                        <input id='email' type='text' placeholder=' ' className='login-input' {...register('email', {
                            required: "",
                            pattern: {value: /^\S+@\S+$/i, message: "Некорректный email"}
                        })}/>
                        <label htmlFor='email' className='placeholder'>Введите email</label>
                    </div>

                {errors.email && <p className='email-error'>{errors.email.message}</p>}
                <input id='password' type='text' placeholder=' ' className='login-input' {...register('password', {
                    required: "",
                    minLength: {value: 8, message: "Минимальная длина пароля - 8 символов"}
                })}/>
                {errors.password && <p className='email-error'>{errors.password.message}</p>}
                <label htmlFor='password' className='placeholder'>Введите пароль</label>
            </div>
            <div className='login-buttons'>
                <button className='form-btn login' type='submit'>Войти</button>
                    <button className='form-btn register'>Зарегистрироваться</button>
                    <button className='form-btn forgot'>Не помню пароль</button>
                </div>
            </div>
        </form>

    );
};


export default LoginForm;