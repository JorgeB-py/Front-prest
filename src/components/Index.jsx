import React from 'react';
import { Header } from './header';
import { Container, Row, Col } from 'react-bootstrap';
import './Index.css';
import { Footer } from './footer';

export default function Index() {
    const nav_links = [
        { name: "Dashboard", url: "dashboard" },
        { name: "Deudores", url: "deudores" },
        { name: "Mi dinero", url: "midinero" },
    ];
    const nombre_usuario = "Jorge";

    const RenderCards = ({ nombre, fecha }) => {
        return (
            <Col>
                <div className="card card-style" style={{ width: "15rem" }}>
                    <img src="./2148859448.jpg" className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{nombre}</h5>
                        <p className="card-text">Modificado: {fecha}</p>
                        <a href="#" className="btn btn-primary">Información</a>
                    </div>
                </div>
            </Col>
        )
    }

    return (
        <>
            <Header nav_links={nav_links} logged={true} usuario={nombre_usuario}></Header>
            <Container style={{ display: "grid" }}>
                <a href="/" style={{ padding: "5px" }}>
                    <i class="bi bi-arrow-left"></i>
                </a>
                <h1>Bienvenido, Jorge</h1>
                <h3>Este mes has ganado</h3>
                <h2 style={{ color: "#004AAC" }}>$3000000</h2>
                <Col className='filtros'>
                    <Row>
                        <Col className='col'>
                            <a> &gt;1 año</a>
                        </Col>
                        <Col className='col'>
                            <a>6 meses</a>
                        </Col>
                        <Col className='col'>
                            <a>3 meses</a>
                        </Col>
                        <Col className='col'>
                            <a>1 mes</a>
                        </Col>
                    </Row>
                </Col>
            </Container>
            <Container>
                <Row style={{ padding: "50px" }}>
                    {
                        Array(8).fill(0).map((_, index) => (
                            <RenderCards nombre={`Deudor ${index}`} fecha="Hoy"></RenderCards>
                        ))
                    }
                </Row>
            </Container>
            <Footer />
        </>
    );
}