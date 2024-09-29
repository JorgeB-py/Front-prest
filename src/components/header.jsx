import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/header.css';
import { Link } from "react-router-dom";


export function Header({nav_links= [{ name: "Soluciones", url: "soluciones"},{ name: "Nosotros", url: "nosotros"},{ name: "Recursos", url: "recursos"}], logged, usuario}) {

    const Greetings = () => {
            if(logged){
                return(
                    <ul className="navbar-nav ms-auto separation">
                        <li className="nav-item">
                            <Link to="perfil" className="buttom-empieza">{usuario}</Link>
                        </li>
                    </ul>
                )
            }else{
                return(
                    <ul className="navbar-nav ms-auto separation">
                        <li className="nav-item">
                            <Link className="nav-link custom-links" to="login">Entra</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="signup" className="buttom-empieza">Empieza ahora</Link>
                        </li>
                    </ul>
                )
            }
    }

    return (
        <header>
            <nav className="navbar navbar-expand-lg custom-navbar">
                <div className="container-fluid">
                    {/* Logo */}
                    <Link className="navbar-brand custom-logo" to="/">
                        <img src="/Logo_letras.png" alt="Logo" width="213" height="73" />
                    </Link>

                    {/* Botón para mobile */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Links del menú */}
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav separation">
                            {nav_links.map((link, index) => (
                                <li key={index} className="nav-item">
                                    <Link className="nav-link custom-links" to={link.url}>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <Greetings></Greetings>
                    </div>
                </div>
            </nav>
        </header>
    );
}
