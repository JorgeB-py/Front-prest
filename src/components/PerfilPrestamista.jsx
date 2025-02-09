import { React, useState, useEffect } from 'react';
import { Container, Row, Col, Image, Modal, Form, Button } from 'react-bootstrap';
import './styles/DeudorDetalle.css';
import { Header } from './header';
import { Footer } from './footer';
import { FormattedMessage } from 'react-intl';
import config from '../config';

function PerfilPrestamista() {
    const nav_links = [
        { name: <FormattedMessage id="app.Deudores" defaultMessage="Deudores" />, url: "/deudores" },
        { name: <FormattedMessage id="app.MiDinero" defaultMessage="My Money" />, url: "/midinero" },
    ];
    const apiurl = config.apiUrl;

    const [perfilPrestamista, setPerfilPrestamista] = useState(null); // Estado inicial del perfil
    const [isLoading, setIsLoading] = useState(true); // Indicador de carga
    const [showEditModal, setShowEditModal] = useState(false); // Modal para editar perfil
    const [isSaving, setIsSaving] = useState(false); // Indicador de guardado

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/login";
        }
        const fetchPerfilPrestamista = async () => {
            const token = localStorage.getItem("token");
            const idprestamista = localStorage.getItem("prestamistaId");
            const url = `${apiurl}/prestamistas/${idprestamista}`;

            try {
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error("Error al obtener el perfil del prestamista");
                }

                const data = await response.json();
                setPerfilPrestamista(data);
            } catch (error) {
                console.error("Error al obtener el perfil del prestamista:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPerfilPrestamista();
    }, []);

    const handleSaveChanges = async () => {
        setIsSaving(true);
        const token = localStorage.getItem("token");
        const idprestamista = localStorage.getItem("prestamistaId");
        const url = `${apiurl}/prestamistas/${idprestamista}`;

        try {
            const response = await fetch(url, {
                method: "PUT", // Método para actualizar
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(perfilPrestamista) // Enviar los datos actualizados
            });

            if (!response.ok) {
                throw new Error("Error al actualizar el perfil del prestamista");
            }

            const updatedData = await response.json();
            setPerfilPrestamista(updatedData); // Actualizar el estado con los datos actualizados
            setShowEditModal(false); // Cerrar el modal
        } catch (error) {
            console.error("Error al actualizar el perfil del prestamista:", error);
        } finally {
            setIsSaving(false); // Finaliza el indicador de guardado
        }
    };

    if (isLoading) {
        return (
            <div>
                <Header nav_links={nav_links} logged={true} usuario={perfilPrestamista} />
                <Container className="custom-container">
                    <Row>
                        <Col className="text-center">
                            <p><FormattedMessage id="app.loading" defaultMessage="Loading..." /></p>
                        </Col>
                    </Row>
                </Container>
                <Footer />
            </div>
        );
    }

    if (!perfilPrestamista) {
        return (
            <div>
                <Header nav_links={nav_links} logged={true} usuario={perfilPrestamista.nombre} />
                <Container className="custom-container">
                    <Row>
                        <Col className="text-center">
                            <p><FormattedMessage id="app.noData" defaultMessage="No profile data available" /></p>
                        </Col>
                    </Row>
                </Container>
                <Footer />
            </div>
        );
    }

    return (
        <div>
            <Header nav_links={nav_links} logged={true} usuario={perfilPrestamista.nombre} />

            <Container className='custom-container'>
                <Row>
                    <Col>
                        <Image src={perfilPrestamista.foto} roundedCircle className='mb-3 img-fluid' alt='imgPerfil' />
                    </Col>
                    <Col>
                        <Container>
                            <Row>
                                <h1> <FormattedMessage id="app.ProfileInfo" /> </h1>
                            </Row>
                            <br />
                            <Row>
                                <h5> <strong><FormattedMessage id="resumen.nombre" />:</strong> {perfilPrestamista.nombre}</h5>
                            </Row>
                            <Row>
                                <h5> <strong><FormattedMessage id="resumen.direccion" />:</strong> {perfilPrestamista.direccion}</h5>
                            </Row>
                            <Row>
                                <h5> <strong><FormattedMessage id="resumen.telefono" />:</strong> {perfilPrestamista.telefono}</h5>
                            </Row>
                            <Row>
                                <h5> <strong><FormattedMessage id="resumen.correo" />:</strong> {perfilPrestamista.correo}</h5>
                            </Row>
                            <Row className="d-flex flex-column align-items-center align-self-center">
                                <span className="rounded-pill">
                                    <i
                                        className="bi bi-pencil-square edit-button"
                                        style={{ fontSize: '1.5rem', cursor: 'pointer' }}
                                        onClick={() => setShowEditModal(true)}
                                    ></i>
                                </span>
                            </Row>
                        </Container>
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
                            <Form.Label><FormattedMessage id="resumen.nombre" defaultMessage="First Name" /></Form.Label>
                            <Form.Control
                                type="text"
                                value={perfilPrestamista.nombre}
                                onChange={(e) => setPerfilPrestamista({ ...perfilPrestamista, nombre: e.target.value })}
                            />
                            <Form.Label><FormattedMessage id="resumen.direccion" defaultMessage="Address" /></Form.Label>
                            <Form.Control
                                type="text"
                                value={perfilPrestamista.direccion}
                                onChange={(e) => setPerfilPrestamista({ ...perfilPrestamista, direccion: e.target.value })}
                            />
                            <Form.Label><FormattedMessage id="resumen.telefono" defaultMessage="Phone" /></Form.Label>
                            <Form.Control
                                type="text"
                                value={perfilPrestamista.telefono}
                                onChange={(e) => setPerfilPrestamista({ ...perfilPrestamista, telefono: e.target.value })}
                            />
                            <Form.Label><FormattedMessage id="resumen.correo" defaultMessage="Email" /></Form.Label>
                            <Form.Control
                                type="email"
                                value={perfilPrestamista.correo}
                                onChange={(e) => setPerfilPrestamista({ ...perfilPrestamista, correo: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                        <FormattedMessage id="app.cancel" defaultMessage="Cancel" />
                    </Button>
                    <Button variant="primary" onClick={handleSaveChanges} disabled={isSaving}>
                        {isSaving ? <FormattedMessage id="app.saving" defaultMessage="Saving..." /> : <FormattedMessage id="app.save" defaultMessage="Save" />}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default PerfilPrestamista;

