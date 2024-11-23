import { setSeconds } from 'date-fns';
import { React, useState, useEffect } from 'react';
import { Container, Row, Col, Image, Modal, Form, Button } from 'react-bootstrap';
import './styles/DeudorDetalle.css';
import { Header } from './header';
import { Footer } from './footer';
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from 'react-intl';

function PerfilPrestamista() {

    const nav_links = [
        { name: <FormattedMessage id="app.Deudores" defaultMessage="Deudores" />, url: "/deudores" },
        { name: <FormattedMessage id="app.MiDinero" defaultMessage="My Money" />, url: "/midinero" },
    ];

    const [perfilPrestamista, setPerfilPrestamista] = useState({
        nombre: 'Don',
        apellido: 'Cangrejo',
        tipoDocumento: 'C.C.',
        numeroDocumento: '12345678',
        direccion: "Fondo de Bikini",
        telefono: "+57 3143807270",
        email: "crustaceoCascarudo@gmail.com",
    });
    const [showEditModal, setShowEditModal] = useState(false);

    return (
        <div>
            <Header nav_links={nav_links} logged={true} usuario={'Jorge'} />

            <Container className='custom-container'>
                <Row>
                    <Col>
                        <Image src="/imagen3.png" roundedCircle className='mb-3 img-fluid' alt='imgPerfil' />
                    </Col>
                    <Col >
                        <Container>
                            <Row>
                                <h1> <FormattedMessage id="app.ProfileInfo" />   </h1>
                            </Row>
                            <br></br>
                            <br></br>
                            <Row>
                                <h5> <strong><FormattedMessage id="resumen.nombre" />:</strong> <span className='documento'>{perfilPrestamista.nombre + ' ' + perfilPrestamista.apellido} </span></h5>
                            </Row>
                            <Row>
                                <h5> <strong><FormattedMessage id="resumen.identificacion" />:</strong> <span className='documento'>{perfilPrestamista.tipoDocumento + ' ' + perfilPrestamista.numeroDocumento} </span></h5>
                            </Row>
                            <Row>
                                <h5> <strong><FormattedMessage id="resumen.direccion" />:</strong> <span className='documento'>{perfilPrestamista.direccion} </span></h5>
                            </Row>
                            <Row>
                                <h5> <strong><FormattedMessage id="resumen.telefono" />:</strong> <span className='documento'>{perfilPrestamista.telefono} </span></h5>
                            </Row>
                            <Row>
                                <h5> <strong><FormattedMessage id="resumen.email" />:</strong> <span className='documento'>{perfilPrestamista.email} </span></h5>
                            </Row>
                            <Row className="d-flex flex-column align-items-center align-self-center">
                                <span className="rounded-pill">
                                    <i className="bi bi-pencil-square edit-button" style={{ fontSize: '1.5rem', cursor: 'pointer' }} onClick={() => { setPerfilPrestamista({ ...perfilPrestamista }); setShowEditModal(true) }}></i>
                                </span>
                                <p>&nbsp;</p> {/* Placeholder to maintain the same height */}
                            </Row>
                        </Container>
                        <div>

                        </div>
                    </Col>
                </Row>
            </Container>
            <Footer />

            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title><FormattedMessage id="app.editInfo" defaultMessage="Edit Information" /></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label><FormattedMessage id="resumen.nombre" defaultMessage="" /></Form.Label>
                            <Form.Control
                                type="text"
                                defaultValue={perfilPrestamista.nombre}
                                onChange={(e) => setPerfilPrestamista({ ...perfilPrestamista, nombre: e.target.value })}
                            />
                            <Form.Label><FormattedMessage id="resumen.apellido" defaultMessage="" /></Form.Label>
                            <Form.Control
                                type="text"
                                defaultValue={perfilPrestamista.apellido}
                                onChange={(e) => setPerfilPrestamista({ ...perfilPrestamista, apellido: e.target.value })}
                            />
                            <Form.Label><FormattedMessage id="resumen.identificacion" defaultMessage="" /></Form.Label>
                            <Form.Control
                                type="text"
                                defaultValue={perfilPrestamista.numeroDocumento}
                                onChange={(e) => setPerfilPrestamista({ ...perfilPrestamista, numeroDocumento: e.target.value })}
                            />
                            <Form.Label><FormattedMessage id="resumen.direccion" defaultMessage="" /></Form.Label>
                            <Form.Control
                                type="text"
                                defaultValue={perfilPrestamista.direccion}
                                onChange={(e) => setPerfilPrestamista({ ...perfilPrestamista, direccion: e.target.value })}
                            />
                            <Form.Label><FormattedMessage id="resumen.telefono" defaultMessage="" /></Form.Label>
                            <Form.Control
                                type="text"
                                defaultValue={perfilPrestamista.telefono}
                                onChange={(e) => setPerfilPrestamista({ ...perfilPrestamista, telefono: e.target.value })}
                            />
                             <Form.Label><FormattedMessage id="resumen.email" defaultMessage="" /></Form.Label>
                            <Form.Control
                                type="text"
                                defaultValue={perfilPrestamista.email}
                                onChange={(e) => setPerfilPrestamista({ ...perfilPrestamista, email: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                        <FormattedMessage id="app.cancel" defaultMessage="Cancel" />
                    </Button>
                    <Button variant="primary" onClick={() => {
                        setPerfilPrestamista({ ...perfilPrestamista })
                        setShowEditModal(false)
                    }}>
                        <FormattedMessage id="app.save" defaultMessage="Save" />
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );

} export default PerfilPrestamista;