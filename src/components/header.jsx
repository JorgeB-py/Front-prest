import React from "react";
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './styles/header.css';

export function Header({ nav_links = [{ name: "Soluciones", url: "soluciones" }, { name: "Nosotros", url: "nosotros" }, { name: "Recursos", url: "recursos" }], logged, usuario }) {
    const Greetings = () => {
        if (logged) {
            return (
                <Nav className="ms-auto">
                    <Nav.Item>
                        <Link to="perfil" className="btn btn-primary buttom-empieza">{usuario}</Link>
                    </Nav.Item>
                </Nav>
            );
        } else {
            return (
                <Nav className="ms-auto">
                    <Nav.Item>
                        <Link className="nav-link custom-links" to="login">Entra</Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link to="signup" className="btn btn-primary buttom-empieza">Empieza ahora</Link>
                    </Nav.Item>
                </Nav>
            );
        }
    };

    return (
        <Navbar expand="lg" className="custom-navbar">
            <Container fluid>
                <Navbar.Brand as={Link} to="/" className="custom-logo">
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