import React from "react";
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import './styles/header.css';

export function Header({ nav_links = [{ name: "Prestamista", url: "/login" }, { name: "Cliente", url: "/login" }], logged, usuario }) {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        // Verifica si existe un token en localStorage
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/deudores'); // Redirige a la página de deudores si hay token
        } else {
            navigate('/'); // Redirige a landing si no hay token
        }
    };

    const Greetings = () => {
        if (logged) {
            return (
                <Nav className="ms-auto">
                    <Nav.Item>
                        <Button as={Link} to="/perfilPrestamista" variant="primary" className="button-empieza-landing" size="lg">{usuario}</Button>
                    </Nav.Item>
                </Nav>
            );
        } else {
            return (
                <Nav className="ms-auto">
                    <Nav.Item className="custom-links">
                        <Link className="nav-link" to="login">Entra</Link>
                    </Nav.Item>
                    <Nav.Item style={{ padding: "20px" }}>
                        <Button data-testid="cta-button" as={Link} to="/signup" variant="primary" className="button-empieza-landing" size="lg">Empieza ahora</Button>
                    </Nav.Item>
                </Nav>
            );
        }
    };

    return (
        <Navbar expand="lg" className="custom-navbar">
            <Container fluid>
                {/* Modificación del botón del logo */}
                <Navbar.Brand onClick={handleLogoClick} className="custom-logo" style={{ cursor: "pointer" }}>
                    <img src="/Logo_letras.png" alt="Logo" width="213" height="73" className="img-fluid" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto separation">
                        {nav_links.map((link, index) => (
                            <Nav.Item key={index}>
                                <Link className="nav-link custom-links" to={link.url}>
                                    {link.name}
                                </Link>
                            </Nav.Item>
                        ))}
                    </Nav>
                    <Greetings />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
