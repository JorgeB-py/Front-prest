import { useState } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { Header } from "./header";
import { Footer } from "./footer";
import { v4 as uuidv4 } from 'uuid'; // Para generar identificadores únicos
import { Link } from "react-router-dom"; // Importar Link para la navegación
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

    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState(false); // Estado para manejar si es un error

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "foto") {
            setCliente({
                ...cliente,
                foto: files[0] // Guardar el archivo de la foto
            });
        } else {
            setCliente({
                ...cliente,
                [name]: value
            });
        }
    };

    // Validación para asegurarse de que los campos requeridos estén completos
    const validarDatos = () => {
        const { nombre, identificacion, ingresos, ocupacion, direccion, telefono, correo } = cliente;
        
        // Verificar que todos los campos requeridos estén llenos
        if (!nombre || !identificacion || !ingresos || !ocupacion || !direccion || !telefono || !correo) {
            setMensaje("Por favor, completa todos los campos obligatorios. La foto es opcional.");
            setError(true);
            return false;
        }

        // Validar que la identificación solo contenga números
        if (!/^\d+$/.test(identificacion)) {
            setMensaje("El número de identificación solo debe contener dígitos.");
            setError(true);
            return false;
        }

        // Validar que el teléfono contenga solo números
        if (!/^\d+$/.test(telefono)) {
            setMensaje("El número de teléfono solo debe contener dígitos.");
            setError(true);
            return false;
        }

        // Validar formato de correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(correo)) {
            setMensaje("Por favor, ingresa un correo electrónico válido.");
            setError(true);
            return false;
        }

        setError(false);
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validarDatos()) {
            const clienteConId = { ...cliente, id: uuidv4() }; // Generar identificador único
            setMensaje("Cliente registrado con éxito");
            setError(false);
            console.log(clienteConId); // Aquí se enviaría el cliente al backend con el ID único
        }
    };

    return (
        <>
            <Header nav_links={[{ name: "Inicio", url: "/" }, { name: "Dashboard", url: "/dashboard" }]} />
            <Container className="crear-cliente-container">
                <Row className="justify-content-md-center">
                    <Col md={10}>
                        <h1>Registrar Nuevo Cliente</h1>
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col md={6}>
                                    <Form.Group controlId="nombre">
                                        <Form.Label>Nombre Completo</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="nombre"
                                            value={cliente.nombre}
                                            onChange={handleChange}
                                            placeholder="Ingresa el nombre del cliente"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="identificacion">
                                        <Form.Label>Número de Identificación</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="identificacion"
                                            value={cliente.identificacion}
                                            onChange={handleChange}
                                            placeholder="Ingresa el número de identificación"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Form.Group controlId="ingresos">
                                        <Form.Label>Ingresos Mensuales</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="ingresos"
                                            value={cliente.ingresos}
                                            onChange={handleChange}
                                            placeholder="Ingresa los ingresos mensuales"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="ocupacion">
                                        <Form.Label>Ocupación</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="ocupacion"
                                            value={cliente.ocupacion}
                                            onChange={handleChange}
                                            placeholder="Ingresa la ocupación del cliente"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Form.Group controlId="direccion">
                                        <Form.Label>Dirección</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="direccion"
                                            value={cliente.direccion}
                                            onChange={handleChange}
                                            placeholder="Ingresa la dirección del cliente"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="telefono">
                                        <Form.Label>Teléfono</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="telefono"
                                            value={cliente.telefono}
                                            onChange={handleChange}
                                            placeholder="Ingresa el teléfono del cliente"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Form.Group controlId="correo">
                                        <Form.Label>Correo Electrónico</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="correo"
                                            value={cliente.correo}
                                            onChange={handleChange}
                                            placeholder="Ingresa el correo electrónico"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="foto">
                                        <Form.Label>Foto del Cliente (opcional)</Form.Label>
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
                                        Registrar Cliente
                                    </Button>
                                </Col>
                                {/* Botón adicional para regresar al menú principal */}
                                <Col>
                                    <Link to="/" className="btn buttom-regresar float-end">
                                        Regresar al Menú Principal
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
