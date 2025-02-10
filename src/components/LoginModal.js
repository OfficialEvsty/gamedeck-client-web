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
                    <input type='text' placeholder='Введите email' className='login-input' {...register('email', { required: "Введите email", pattern: { value: /^\S+@\S+$/i, message: "Некорректный email"}})}/>
                    {errors.email && <p className='email-error'>{errors.email.message}</p>}
                    <input type='text' placeholder='Введите пароль' className='login-input' {...register('password', { required: "Введите пароль", minLength: { value: 8, message: "Минимальная длина пароля - 8 символов"}})}/>
                    {errors.password && <p className='email-error'>{errors.password.message}</p>}
                </div>
                <div className='login-buttons'>
                    <button className='form-btn login' type='submit'>Войти</button>
                    <button className='form-btn register'>Зарегистрироваться</button>
                    <a className='form-ref' href="/*">Не помню пароль</a>
                </div>
            </div>
        </form>

    );
};


export default LoginForm;