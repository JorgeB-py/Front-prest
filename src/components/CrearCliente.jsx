import { useState, useEffect } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { Header } from "./header";
import { Footer } from "./footer";
import { Link } from "react-router-dom";
import { FormattedMessage, useIntl } from 'react-intl';
import "./styles/crearCliente.css";
import axios from 'axios';

export default function CrearCliente() {
    const [cliente, setCliente] = useState({
        nombrecompleto: "",
        direccion: "",
        telefono: "",
        email: "", 
        ocupacion: "",
        foto: "",
        fecha: ""  // Fecha en formato 'YYYY-MM-DD'
    });
    const intl = useIntl();
    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState(false);

    useEffect(() => {
        // Establecer la fecha actual en formato string 'yyyy-mm-dd'
        setCliente(prevState => ({
            ...prevState,
            fecha: new Date().toISOString().split('T')[0]  // Solo la parte de la fecha
        }));
    }, []);  // Solo se ejecuta al montar el componente

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCliente({
            ...cliente,
            [name]: value // Aseguramos que todos los campos sean strings
        });
    };

    const validarDatos = () => {
        const { nombrecompleto, direccion, telefono, email, ocupacion, foto, fecha } = cliente;

        if (!nombrecompleto || !direccion || !telefono || !email || !ocupacion || !foto || !fecha) {
            setMensaje(intl.formatMessage({ id: 'app.errorFields' }));
            setError(true);
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setMensaje(intl.formatMessage({ id: 'app.errorEmail' }));
            setError(true);
            return false;
        }

        // Validación de telefono solo para ser numérico
        if (!/^\d+$/.test(telefono)) {
            setMensaje(intl.formatMessage({ id: 'app.errorPhone' }));
            setError(true);
            return false;
        }

        setError(false);
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validarDatos()) {
            // Aseguramos que todos los datos sean enviados como strings
            const clienteConId = { 
                ...cliente,
                nombrecompleto: cliente.nombrecompleto.toString(),
                direccion: cliente.direccion.toString(),
                telefono: cliente.telefono.toString(),
                email: cliente.email.toString(),
                ocupacion: cliente.ocupacion.toString(),
                foto: cliente.foto.toString(),
                fecha: cliente.fecha.toString()  // Fecha como string (yyyy-mm-dd)
            };

            try {
                // Realizar la solicitud POST
                const token = localStorage.getItem('token');
                const response = await axios.post('http://localhost:3000/deudor', clienteConId, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Si necesitas un token JWT
                    }
                });

                // Manejar la respuesta de éxito
                setMensaje(intl.formatMessage({ id: 'app.successMessage' }));
                setError(false);
                console.log('Cliente creado con éxito:', response.data);

            } catch (err) {
                // Manejar errores de la API
                setMensaje(intl.formatMessage({ id: 'app.errorMessage' }));
                setError(true);
                console.error('Error al crear el cliente:', err);
            }
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
                                    <Form.Group controlId="nombrecompleto">
                                        <Form.Label><FormattedMessage id="app.fullName" /></Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="nombrecompleto"
                                            value={cliente.nombrecompleto}
                                            onChange={handleChange}
                                            placeholder={intl.formatMessage({ id: 'app.placeholderName' })}
                                        />
                                    </Form.Group>
                                </Col>
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
                            </Row>
                            <Row>
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
                                <Col md={6}>
                                    <Form.Group controlId="email">
                                        <Form.Label><FormattedMessage id="app.email" /></Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            value={cliente.email}
                                            onChange={handleChange}
                                            placeholder={intl.formatMessage({ id: 'app.placeholderEmail' })}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
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
                                <Col md={6}>
                                    <Form.Group controlId="foto">
                                        <Form.Label><FormattedMessage id="app.clientPhoto" /></Form.Label>
                                        <Form.Control
                                            type="url"  // Foto debe ser una URL
                                            name="foto"
                                            value={cliente.foto}
                                            onChange={handleChange}
                                            placeholder={intl.formatMessage({ id: 'app.placeholderPhotoUrl' })}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Form.Group controlId="fecha">
                                        <Form.Label><FormattedMessage id="app.date" /></Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="fecha"
                                            value={cliente.fecha}
                                            onChange={handleChange}
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
