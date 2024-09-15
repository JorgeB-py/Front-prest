import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/header.css';

export function Header() {
    const nav_links = [
        { name: "Soluciones", url: "/soluciones" },
        { name: "Nosotros", url: "/nosotros" },
        { name: "Recursos", url: "/Recursos" },
    ];

    return (
        <header>
            <nav className="navbar navbar-expand-lg custom-navbar">
                <div className="container-fluid">
                    {/* Logo */}
                    <a className="navbar-brand custom-logo" href="/">
                        <img src="/Logo_letras.png" alt="Logo" width="213" height="73" />
                    </a>

                    {/* Botón para mobile */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Links del menú */}
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav separation">
                            {nav_links.map((link, index) => (
                                <li key={index} className="nav-item">
                                    <a className="nav-link custom-links" href={link.url}>{link.name}</a>
                                </li>
                            ))}
                        </ul>

                        <ul className="navbar-nav ms-auto separation">
                            <li className="nav-item">
                                <a className="nav-link custom-links" href="/login">Entra</a>
                            </li>
                            <li className="nav-item">
                                <a href="/registro" className=" buttom-empieza">Empieza ahora</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}
