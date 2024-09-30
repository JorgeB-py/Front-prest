import { useState } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { Header } from "./header";
import { Footer } from "./footer";
import { v4 as uuidv4 } from 'uuid';
import { Link } from "react-router-dom";
import { FormattedMessage, useIntl } from 'react-intl';
import "./styles/crearCliente.css";

export default function CrearCliente() {
    const [cliente, setCliente] = useState({
        nombre: "",
        identificacion: "",
        ingresos: "",
        direccion: "",
        telefono: "",
        ocupacion: "",
        correo: "", 
        foto: null
    });

    const intl = useIntl();
    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState(false);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "foto") {
            setCliente({
                ...cliente,
                foto: files[0]
            });
        } else {
            setCliente({
                ...cliente,
                [name]: value
            });
        }
    };

    const validarDatos = () => {
        const { nombre, identificacion, ingresos, ocupacion, direccion, telefono, correo } = cliente;

        if (!nombre || !identificacion || !ingresos || !ocupacion || !direccion || !telefono || !correo) {
            setMensaje(intl.formatMessage({ id: 'app.errorFields' }));
            setError(true);
            return false;
        }

        if (!/^\d+$/.test(identificacion)) {
            setMensaje(intl.formatMessage({ id: 'app.errorID' }));
            setError(true);
            return false;
        }

        if (!/^\d+$/.test(telefono)) {
            setMensaje(intl.formatMessage({ id: 'app.errorPhone' }));
            setError(true);
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(correo)) {
            setMensaje(intl.formatMessage({ id: 'app.errorEmail' }));
            setError(true);
            return false;
        }

        setError(false);
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validarDatos()) {
            const clienteConId = { ...cliente, id: uuidv4() };
            setMensaje(intl.formatMessage({ id: 'app.successMessage' }));  // Mensaje de éxito internacionalizado
            setError(false);
            console.log(clienteConId);
        }
    };

    return (
        <>
            <Header
                nav_links={[
                    { name: intl.formatMessage({ id: 'nav.deudores' }), url: "/deudores" },
                    { name: intl.formatMessage({ id: 'nav.crearDeudor' }), url: "/crearcliente" },
                    { name: intl.formatMessage({ id: 'nav.consultarDeudor' }), url: "/consultarcliente" },
                ]}
                logged={true} 
                usuario="Jorge"
            />

            <Container className="crear-cliente-container">
                <Row className="justify-content-md-center">
                    <Col md={10}>
                        <h1><FormattedMessage id="app.registerNewClient" /></h1>
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col md={6}>
                                    <Form.Group controlId="nombre">
                                        <Form.Label><FormattedMessage id="app.fullName" /></Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="nombre"
                                            value={cliente.nombre}
                                            onChange={handleChange}
                                            placeholder={intl.formatMessage({ id: 'app.placeholderName' })}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="identificacion">
                                        <Form.Label><FormattedMessage id="app.idNumber" /></Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="identificacion"
                                            value={cliente.identificacion}
                                            onChange={handleChange}
                                            placeholder={intl.formatMessage({ id: 'app.placeholderID' })}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Form.Group controlId="ingresos">
                                        <Form.Label><FormattedMessage id="app.monthlyIncome" /></Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="ingresos"
                                            value={cliente.ingresos}
                                            onChange={handleChange}
                                            placeholder={intl.formatMessage({ id: 'app.placeholderIncome' })}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="ocupacion">
                                        <Form.Label><FormattedMessage id="app.occupation" /></Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="ocupacion"
                                            value={cliente.ocupacion}
                                            onChange={handleChange}
                                            placeholder={intl.formatMessage({ id: 'app.placeholderOccupation' })}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Form.Group controlId="direccion">
                                        <Form.Label><FormattedMessage id="app.address" /></Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="direccion"
                                            value={cliente.direccion}
                                            onChange={handleChange}
                                            placeholder={intl.formatMessage({ id: 'app.placeholderAddress' })}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="telefono">
                                        <Form.Label><FormattedMessage id="app.phone" /></Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="telefono"
                                            value={cliente.telefono}
                                            onChange={handleChange}
                                            placeholder={intl.formatMessage({ id: 'app.placeholderPhone' })}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Form.Group controlId="correo">
                                        <Form.Label><FormattedMessage id="app.email" /></Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="correo"
                                            value={cliente.correo}
                                            onChange={handleChange}
                                            placeholder={intl.formatMessage({ id: 'app.placeholderEmail' })}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="foto">
                                        <Form.Label><FormattedMessage id="app.clientPhoto" /></Form.Label>
                                        <Form.Control
                                            type="file"
                                            name="foto"
                                            onChange={handleChange}
                                            accept="image/*"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col>
                                    <Button className="btn buttom-general" type="submit">
                                        <FormattedMessage id="app.registerClient" />
                                    </Button>
                                </Col>
                                <Col>
                                    <Link to="/deudores" className="btn buttom-regresar float-end">
                                        <FormattedMessage id="app.goBackMenu" />
                                    </Link>
                                </Col>
                            </Row>
                        </Form>
                        {mensaje && <p className={error ? "mensaje-error" : "mensaje-exito"}>{mensaje}</p>}
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    );
}
