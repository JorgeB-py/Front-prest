import React from "react";
import "./sidebar.css";
import { Container, Col, Row } from "react-bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';

function SideBar() {
    return (
        <Container className="container-sm">
            <Col>
                <Row className="barra-lateral">
                    <div className="top-barra">
                        <i class="bi bi-list"></i>
                        <i className="bi bi-plus"></i>
                    </div>
                    <div>
                        <a href="/deudoresActivos">
                            <i className="bi bi-star"></i>
                            Deudores activos
                        </a>
                    </div>
                    <div >
                        <a href="/deudoresPasados">
                            <i className="bi bi-star"></i>
                            Deudores pasados
                        </a>
                    </div>
                    <div >
                        <a href="/papelera">
                            <i className="bi bi-star"></i>
                            Papelera
                        </a>
                    </div>
                    <div >
                        <a href="/configuracion">
                            <i className="bi bi-star"></i>
                            Configuración
                        </a>
                    </div>
                </Row>
            </Col>
        </Container>
    );
}

export default SideBar;