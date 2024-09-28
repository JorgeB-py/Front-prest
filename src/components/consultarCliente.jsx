import { useState } from "react";
import { Col, Container, Row, Form, Button, Alert, Table } from "react-bootstrap";
import { Header } from "./header";
import { Footer } from "./footer";
import { Link } from "react-router-dom"; // Importar Link para el botón de volver al menú principal
import "./styles/consultarCliente.css";

export default function ConsultarCliente() {
    const [criterio, setCriterio] = useState("");
    const [cliente, setCliente] = useState(null);
    const [mensajeError, setMensajeError] = useState("");

    // Simulación de clientes con fotos, historial de préstamos y ocupación
    const clientesMock = [
        {
            nombre: "Juan Pérez",
            identificacion: "123456",
            direccion: "Calle Falsa 123",
            telefono: "3001234567",
            ocupacion: "Ingeniero",
            foto: "https://via.placeholder.com/150", // URL de foto simulada
            historial: [
                { nombre: "Préstamo 1", estado: "En Mora" },
                { nombre: "Préstamo 2", estado: "Al día" },
                { nombre: "Préstamo 3", estado: "Saldado" }
            ]
        },
        {
            nombre: "Ana García",
            identificacion: "789012",
            direccion: "Avenida Siempreviva 456",
            telefono: "3007654321",
            ocupacion: "Abogada",
            foto: "https://via.placeholder.com/150", // URL de foto simulada
            historial: [
                { nombre: "Préstamo 1", estado: "Al día" },
                { nombre: "Préstamo 2", estado: "Saldado" }
            ]
        }
    ];

    const buscarCliente = () => {
        const clienteEncontrado = clientesMock.find(c => c.nombre === criterio || c.identificacion === criterio);
        if (clienteEncontrado) {
            setCliente(clienteEncontrado);
            setMensajeError("");
        } else {
            setCliente(null);
            setMensajeError("Cliente no encontrado. Por favor, verifica los datos ingresados.");
        }
    };

    return (
        <>
            <Header nav_links={[{ name: "Inicio", url: "/" }, { name: "Dashboard", url: "/dashboard" }]} />
            <Container className="consultar-cliente-container">
                <Row className="justify-content-md-center">
                    <Col md={8}>
                        <h1>Consultar Cliente</h1>
                        <Form>
                            <Form.Group controlId="criterio">
                                <Form.Label>Buscar por Nombre o Identificación</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingresa nombre o número de identificación"
                                    value={criterio}
                                    onChange={(e) => setCriterio(e.target.value)}
                                />
                            </Form.Group>
                            <Button className="btn buttom-general mt-3" onClick={buscarCliente}>
                                Buscar Cliente
                            </Button>
                        </Form>

                        {mensajeError && <Alert variant="danger" className="mt-3">{mensajeError}</Alert>}

                        {/* Mostrar información del cliente si se encuentra */}
                        {cliente && (
                            <>
                                <div className="mt-4 text-center">
                                    <img src={cliente.foto} alt={cliente.nombre} className="img-cliente" />
                                </div>

                                <Table striped bordered hover className="mt-4">
                                    <thead>
                                        <tr>
                                            <th>Campo</th>
                                            <th>Información</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Nombre</td>
                                            <td>{cliente.nombre}</td>
                                        </tr>
                                        <tr>
                                            <td>Identificación</td>
                                            <td>{cliente.identificacion}</td>
                                        </tr>
                                        <tr>
                                            <td>Dirección</td>
                                            <td>{cliente.direccion}</td>
                                        </tr>
                                        <tr>
                                            <td>Teléfono</td>
                                            <td>{cliente.telefono}</td>
                                        </tr>
                                        <tr>
                                            <td>Ocupación</td>
                                            <td>{cliente.ocupacion}</td>
                                        </tr>
                                        <tr>
                                            <td>Historial de Préstamos</td>
                                            <td>
                                                {cliente.historial.map((prestamo, index) => (
                                                    <div key={index}>
                                                        {prestamo.nombre}: {prestamo.estado}
                                                    </div>
                                                ))}
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </>
                        )}

                        {/* Botón para regresar al menú principal, siempre visible */}
                        <div className="mt-3 text-end buttom-regresar-container">
                            <Link to="/" className="btn buttom-regresar">
                                Volver al Menú Principal
                            </Link>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    );
}
