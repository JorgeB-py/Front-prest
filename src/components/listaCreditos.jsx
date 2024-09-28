import { useState, useEffect } from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Header } from "./header";
import { Footer } from "./footer";
import "./styles/listaCreditos.css";

// Simulación de usuario autenticado
const user = { id: 1, email: "user@example.com" }; // ID del usuario autenticado

export default function ListaCreditos() {
    const [creditosUsuario, setCreditosUsuario] = useState([]);

    // Simulación de créditos (en un entorno real, esto vendría de una API)
    const creditosMock = [
        { id: 1, nombre: "Crédito Hipotecario", monto: 100000, fechaPago: "2024-10-15", estado: "Pendiente", usuarioId: 1 },
        { id: 2, nombre: "Crédito Vehicular", monto: 50000, fechaPago: "2024-09-10", estado: "Saldado", usuarioId: 2 },
        { id: 3, nombre: "Crédito Personal", monto: 20000, fechaPago: "2024-08-25", estado: "En mora", usuarioId: 1 },
    ];

    // Filtrar los créditos para mostrar solo los del usuario autenticado
    useEffect(() => {
        const creditosFiltrados = creditosMock.filter((credito) => credito.usuarioId === user.id);
        setCreditosUsuario(creditosFiltrados);
    }, []);

    return (
        <>
            <Header nav_links={[{ name: "Inicio", url: "/" }, { name: "Dashboard", url: "/dashboard" }]} />
            <Container className="lista-creditos-container">
                <Row className="justify-content-md-center">
                    <Col md={8}>
                        <h1>Mis Créditos</h1>
                        <ListGroup>
                            {creditosUsuario.length > 0 ? (
                                creditosUsuario.map((credito) => (
                                    <ListGroup.Item key={credito.id}>
                                        {/* Redirigir a la vista de transacciones pasando el ID del crédito */}
                                        <Link to={`/visualizar-transacciones/${credito.id}`}>
                                            <div>
                                                <strong>{credito.nombre}</strong> - ${credito.monto}
                                            </div>
                                            <div>Fecha de Pago: {credito.fechaPago}</div>
                                            <div>Estado: {credito.estado}</div>
                                        </Link>
                                    </ListGroup.Item>
                                ))
                            ) : (
                                <p>No tienes créditos registrados.</p>
                            )}
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    );
}
