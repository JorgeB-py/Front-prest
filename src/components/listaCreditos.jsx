import { useState } from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Header } from "./header";
import { Footer } from "./footer";
import "./styles/listaCreditos.css";

export default function ListaCreditos() {
    // Simulación de créditos del usuario
    const creditosMock = [
        { id: 1, nombre: "Crédito Hipotecario", monto: 100000 },
        { id: 2, nombre: "Crédito Vehicular", monto: 50000 },
        { id: 3, nombre: "Crédito Personal", monto: 20000 },
    ];

    return (
        <>
            <Header nav_links={[{ name: "Inicio", url: "/" }, { name: "Dashboard", url: "/dashboard" }]} />
            <Container className="lista-creditos-container">
                <Row className="justify-content-md-center">
                    <Col md={8}>
                        <h1>Mis Créditos</h1>
                        <ListGroup>
                            {creditosMock.map(credito => (
                                <ListGroup.Item key={credito.id}>
                                    {/* Redirigir a la vista de transacciones pasando el ID del crédito */}
                                    <Link to={`/visualizar-transacciones/${credito.id}`}>
                                        {credito.nombre} - ${credito.monto}
                                    </Link>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    );
}
