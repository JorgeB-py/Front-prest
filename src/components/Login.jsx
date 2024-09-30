import React, { useState } from "react";
import "./styles/Login.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Función para validar el formulario
    const validateForm = () => {
        if (!email || !password) {
            setErrorMessage("Por favor, completa todos los campos.");
            return false;
        }

        // Validación de formato de correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrorMessage("Por favor, ingresa un correo electrónico válido.");
            return false;
        }

        // Validación de longitud mínima de la contraseña
        if (password.length < 6) {
            setErrorMessage("La contraseña debe tener al menos 6 caracteres.");
            return false;
        }

        setErrorMessage(""); // Limpiar el mensaje de error si todo es válido
        return true;
    };

    // Función para manejar el login, redirecciona basado en el tipo de usuario
    const handleLogin = (e, userType) => {
        e.preventDefault();
        if (validateForm()) {
            // Redirige basado en el tipo de usuario
            if (userType === "prestamista") {
                window.location.href = "/deudores";
            } else if (userType === "cliente") {
                window.location.href = "/creditos";
            }
        }
    };

    return (
        <section className="vh-100">
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                            className="img-fluid" alt="Sample image"/>
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form>
                            <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                                <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-floating mx-1">
                                    <i className="bi bi-facebook"></i>
                                </button>

                                <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-floating mx-1">
                                    <i className="bi bi-twitter-x"></i>
                                </button>

                                <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-floating mx-1">
                                    <i className="bi bi-linkedin"></i>
                                </button>
                            </div>

                            <div className="divider d-flex align-items-center my-4">
                                <p className="text-center fw-bold mx-3 mb-0">Or</p>
                            </div>

                            <div data-mdb-input-init className="form-outline mb-4">
                                <input 
                                    type="email" 
                                    id="form3Example3" 
                                    className="form-control form-control-lg"
                                    placeholder="Enter a valid email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <label className="form-label" htmlFor="form3Example3">Email address</label>
                            </div>

                            <div data-mdb-input-init className="form-outline mb-3">
                                <input 
                                    type="password" 
                                    id="form3Example4" 
                                    className="form-control form-control-lg"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <label className="form-label" htmlFor="form3Example4">Password</label>
                            </div>

                            {/* Mensaje de error si la validación falla */}
                            {errorMessage && (
                                <div className="alert alert-danger" role="alert">
                                    {errorMessage}
                                </div>
                            )}

                            <div className="d-flex justify-content-between align-items-center">
                                <div className="form-check mb-0">
                                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                                    <label className="form-check-label" htmlFor="form2Example3">
                                        Remember me
                                    </label>
                                </div>
                                <a href="#!" className="text-body">Forgot password?</a>
                            </div>

                            <div className="text-center text-lg-start mt-4 pt-2">
                                {/* Botón para login como prestamista */}
                                <button 
                                    type="button" 
                                    onClick={(e) => handleLogin(e, "prestamista")} 
                                    data-mdb-button-init 
                                    data-mdb-ripple-init 
                                    className="btn btn-primary btn-lg me-2">
                                    Login como Prestamista
                                </button>

                                <br/>
                                <br/>

                                {/* Botón para login como cliente */}
                                <button 
                                    type="button" 
                                    onClick={(e) => handleLogin(e, "cliente")} 
                                    data-mdb-button-init 
                                    data-mdb-ripple-init 
                                    className="btn btn-secondary btn-lg">
                                    Login como Cliente
                                </button>

                                <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="/signup"
                                    className="link-danger">Register</a></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div
                className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
                <div className="text-white mb-3 mb-md-0">
                    Copyright © 2020. All rights reserved.
                </div>

                <div>
                    <a href="#!" className="text-white me-4">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#!" className="text-white me-4">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#!" className="text-white me-4">
                        <i className="fab fa-google"></i>
                    </a>
                    <a href="#!" className="text-white">
                        <i className="fab fa-linkedin-in"></i>
                    </a>
                </div>
            </div>
        </section>
    );
}
