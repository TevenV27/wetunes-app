import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../stylesheet/login-style.css';
import { ClipLoader } from "react-spinners";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // Validador de correo electrónico
    const isEmailValid = (email) => {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
    }

    // Manejador de clic en el campo de correo electrónico para limpiar el mensaje de error
    const handleEmailClick = () => {
        setError('');
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!isEmailValid(email)) {
            setError('Correo electrónico no válido');
            return;
        }

        setLoading(true); // Mostrar el spinner mientras se carga

        const loginData = {
            email: email,
            password: password
        }

        try {
            const response = await fetch('https://wetunes-api.onrender.com/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            const data = await response.json();

            if (data.token) {

                Cookies.set('authToken', data.token, { expires: 7 });

                const userData = {
                    email: data.email,
                    firstname: data.firstname,
                    lastname: data.lastname,
                    avataruser: data.avataruser
                };

                // Convertir el objeto a una cadena JSON
                const userDataJSON = JSON.stringify(userData);
                // Establecer la cookie con la cadena JSON
                Cookies.set('userData', userDataJSON, { expires: 7 });

                localStorage.setItem('authToken', data.token);

                navigate('/');
            } else {
                alert(data.message || 'Login failed.');
            }
        } catch (error) {
            alert('An error occurred while logging in.');
        } finally {

            // Ocultar el spinner después de la carga
            setLoading(false); 
        }
    }

    return (
        <section className='container'>
            <div className='login-box animate__animated animate__fadeIn'>
                <div className='logo-box'>
                    <svg className='logo-app' xmlns="http://www.w3.org/2000/svg" id="Capa_2" data-name="Capa 2" viewBox="0 0 330.01 302">
                        <path className="cls-2" fill='#00C2FF' d="m240.77,0l-106.83,26.71S39.5,1.95,8.23,39.73c0,0-31.92,48.85,29.96,168.06,0,0-16.28,53.41,20.19,59.93,0,0-45.53-41.79,31.33-79.57,0,0,11.01-5.76,22.08-3.8l-12.38-110.73L240.77,0Z" />
                        <path className="cls-1" fill='#ffffff' d="m204.29,66.44l-83.91,33.87,11.19,114.01s2.01,41.9-45.83,56.65c0,0,41.69,49.5,118.55,23.45,0,0,125.72-46.94,125.72-132.23,0,0-2.8-43.11-89.24-91.84v88.59s21.6,34.09-11.07,61.88c-33.33,28.35-58.29,9.94-58.29,9.94,0,0-17.9-17.4-1.43-51.63,0,0,9.56-23.45,42.13-28.66l-7.82-84.03Z" />
                    </svg>
                    <h1 className='name-app'>
                        <span style={{ color: "#00C2FF" }}>We</span>Tunes
                    </h1>
                </div>
                <form className='login-form' onSubmit={handleSubmit}>
                    <input className='input-email' type="text" placeholder='Correo' value={email} onChange={(e) => setEmail(e.target.value)} onClick={handleEmailClick} required/>
                    {error && <p className="error-message">{error}</p>}
                    <input className='input-email' type="password" placeholder='Contraseña' value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    <a className='forget-pasword' href="">Olvidaste la contraseña?</a>
                    {loading ? (
                        <ClipLoader color="#00C2FF" loading={loading} size={40} />
                    ) : (
                        <button className='b-singIn' type="submit">Ingresar</button>
                    )}
                </form>
                <p className='redirect-register'>No tienes una cuenta?
                    <span className='b-register' onClick={() => navigate('/register')}>
                        REGISTRARSE
                    </span>
                </p>
            </div>
            <span className='by-teven'>By Teven</span>
        </section>
    );
}
