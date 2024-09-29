import { useState, useEffect } from "react";
import { Col, Container, Row, Form, Button, Alert, Table } from "react-bootstrap";
import { Header } from "./header";
import { Footer } from "./footer";
import { Link } from "react-router-dom";
import "./styles/consultarCliente.css";

export default function ConsultarCliente() {
    const [criterio, setCriterio] = useState("");
    const [cliente, setCliente] = useState(null);
    const [todosClientes, setTodosClientes] = useState([]);
    const [mensajeError, setMensajeError] = useState("");

    // Función para obtener un cliente específico desde el API
    const buscarCliente = async () => {
        try {
            const response = await fetch("https://my.api.mockaroo.com/consultarcliente_mock.json?key=2a692260");
            const data = await response.json();
            const clienteEncontrado = data.find(c => c.nombre === criterio || c.identification.toString() === criterio);

            if (clienteEncontrado) {
                setCliente(clienteEncontrado);
                setMensajeError("");
            } else {
                setCliente(null);
                setMensajeError("Cliente no encontrado. Por favor, verifica los datos ingresados.");
            }
        } catch (error) {
            console.error("Error fetching data: ", error);
            setMensajeError("Ocurrió un error al obtener los datos. Intenta nuevamente más tarde.");
        }
    };

    // Función para obtener todos los clientes desde el API
    const consultarTodos = async () => {
        try {
            const response = await fetch("https://my.api.mockaroo.com/consultarcliente_mock.json?key=2a692260");
            const data = await response.json();
            setTodosClientes(data);
            setCliente(null);  // Limpia la selección de un solo cliente
            setMensajeError("");
        } catch (error) {
            console.error("Error fetching data: ", error);
            setMensajeError("Ocurrió un error al obtener los datos. Intenta nuevamente más tarde.");
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
                            <Button className="btn btn-secondary mt-3 ms-3" onClick={consultarTodos}>
                                Consultar Todos
                            </Button>
                        </Form>

                        {mensajeError && <Alert variant="danger" className="mt-3">{mensajeError}</Alert>}

                        {/* Mostrar información de un solo cliente si se encuentra */}
                        {cliente && (
                            <>
                                <div className="mt-4 text-center">
                                    <img src={cliente.foto} alt={cliente.nombre} className="img-cliente" />
                                </div>

                                <div className="table-responsive">
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
                                                <td>{cliente.identification}</td>
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
                                                <td>Correo</td>
                                                <td>{cliente.correo}</td>
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
                                </div>
                            </>
                        )}

                        {/* Mostrar todos los clientes si se ha consultado a todos */}
                        {todosClientes.length > 0 && (
                            <div className="table-responsive">
                                <Table striped bordered hover className="mt-4">
                                    <thead>
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Identificación</th>
                                            <th>Teléfono</th>
                                            <th>Correo</th>
                                            <th>Ocupación</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {todosClientes.map((cliente, index) => (
                                            <tr key={index}>
                                                <td>{cliente.nombre}</td>
                                                <td>{cliente.identification}</td>
                                                <td>{cliente.telefono}</td>
                                                <td>{cliente.correo}</td>
                                                <td>{cliente.ocupacion}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        )}

                        {/* Botón para regresar al menú principal */}
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

