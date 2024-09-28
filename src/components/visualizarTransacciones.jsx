import { useState, useEffect } from "react";
import { Col, Container, Row, Table, Form, Alert, Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom"; // Para capturar el ID del crédito y redirigir al menú
import { Header } from "./header";
import { Footer } from "./footer";
import "./styles/visualizarTransacciones.css"; // Asegúrate de que esta ruta apunte a tu archivo CSS

export default function VisualizarTransacciones() {
    const { id } = useParams(); // Capturar el ID del crédito desde la URL
    const [credito, setCredito] = useState(null); // Estado para almacenar la información del crédito

    // Simulación de créditos (esto debería venir de una API en un entorno real)
    const creditosMock = [
        { id: 1, nombre: "Crédito Hipotecario", monto: 100000 },
        { id: 2, nombre: "Crédito Vehicular", monto: 50000 },
        { id: 3, nombre: "Crédito Personal", monto: 20000 },
    ];

    // Buscar el crédito por ID
    useEffect(() => {
        const creditoEncontrado = creditosMock.find(c => c.id === parseInt(id));
        if (creditoEncontrado) {
            setCredito(creditoEncontrado);
        }
    }, [id]);

    const [filtro, setFiltro] = useState({ fecha: "", total: "", balance: "" });
    const [transaccionesFiltradas, setTransaccionesFiltradas] = useState([]); // Para guardar transacciones filtradas
    const [mostrarTodas, setMostrarTodas] = useState(true); // Estado para controlar si se muestran todas las transacciones
    const [mensajeError, setMensajeError] = useState("");

    // Simulación de transacciones para el crédito seleccionado
    const transaccionesMock = [
        { fecha: "2024-09-15", capital: 150, interes: 50, total: 200, balance: 9800, registrado: true },
        { fecha: "2024-09-10", capital: 300, interes: 200, total: 500, balance: 10000, registrado: true },
        { fecha: "2024-09-05", capital: 100, interes: 200, total: 300, balance: 10300, registrado: true },
        { fecha: "2024-08-25", capital: 400, interes: 200, total: 600, balance: 10600, registrado: false }, // Transacción no registrada correctamente
    ];

    // Ordenar transacciones por fecha (más recientes primero)
    const transaccionesOrdenadas = transaccionesMock.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

    // Filtrar transacciones por criterios de fecha, total o balance
    const filtrarTransacciones = () => {
        let transacciones = transaccionesOrdenadas;

        if (filtro.fecha) {
            transacciones = transacciones.filter(t => t.fecha === filtro.fecha);
        }
        if (filtro.total) {
            transacciones = transacciones.filter(t => t.total === parseFloat(filtro.total));
        }
        if (filtro.balance) {
            transacciones = transacciones.filter(t => t.balance === parseFloat(filtro.balance));
        }

        // Si no se encuentran transacciones, mostrar mensaje de error
        if (transacciones.length === 0) {
            setMostrarTodas(false); // Ocultar la tabla si no hay transacciones filtradas
            setMensajeError("No se encontraron transacciones con los filtros seleccionados.");
        } else {
            setTransaccionesFiltradas(transacciones);
            setMostrarTodas(false); // Mostrar solo las transacciones filtradas
            setMensajeError(""); // Limpiar el mensaje de error
        }
    };

    // Función para eliminar los filtros y mostrar todas las transacciones
    const eliminarFiltros = () => {
        setFiltro({ fecha: "", total: "", balance: "" }); // Resetear filtros
        setMostrarTodas(true); // Mostrar todas las transacciones nuevamente
        setMensajeError(""); // Limpiar cualquier mensaje de error
    };

    return (
        <>
            <Header nav_links={[{ name: "Inicio", url: "/" }, { name: "Dashboard", url: "/dashboard" }]} />
            <Container className="visualizar-transacciones-container">
                <Row className="justify-content-md-center">
                    <Col md={10}>
                        {/* Mostrar el nombre del crédito seleccionado */}
                        {credito && <h1>Transacciones de {credito.nombre}</h1>}

                        <Form className="mb-4">
                            <Row>
                                <Col md={4}>
                                    <Form.Group controlId="filtroFecha">
                                        <Form.Label>Filtrar por Fecha</Form.Label>
                                        <Form.Control
                                            type="date"
                                            value={filtro.fecha}
                                            onChange={(e) => setFiltro({ ...filtro, fecha: e.target.value })}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group controlId="filtroTotal">
                                        <Form.Label>Filtrar por Monto Total</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="Monto Total"
                                            value={filtro.total}
                                            onChange={(e) => setFiltro({ ...filtro, total: e.target.value })}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group controlId="filtroBalance">
                                        <Form.Label>Filtrar por Balance</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="Balance"
                                            value={filtro.balance}
                                            onChange={(e) => setFiltro({ ...filtro, balance: e.target.value })}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <div className="mt-3">
                            <Button className="me-2 boton-filtrar" onClick={filtrarTransacciones}>
                                    Filtrar
                                </Button>
                                <Button variant="secondary" onClick={eliminarFiltros}>
                                    Eliminar Filtros
                                </Button>
                            </div>
                        </Form>

                        {/* Mostrar el mensaje de error si no se encontraron transacciones */}
                        {mensajeError && <Alert variant="danger">{mensajeError}</Alert>}

                        {/* Mostrar todas las transacciones o las filtradas */}
                        {mostrarTodas ? (
                            <Table striped bordered hover className="mt-4">
                                <thead>
                                    <tr>
                                        <th>Fecha</th>
                                        <th>Capital</th>
                                        <th>Interés</th>
                                        <th>Total</th>
                                        <th>Balance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transaccionesOrdenadas.map((transaccion, index) => (
                                        <tr key={index}>
                                            <td>{transaccion.fecha}</td>
                                            <td>{transaccion.capital}</td>
                                            <td>{transaccion.interes}</td>
                                            <td>{transaccion.total}</td>
                                            <td>{transaccion.balance}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        ) : (
                            transaccionesFiltradas.length > 0 && (
                                <Table striped bordered hover className="mt-4">
                                    <thead>
                                        <tr>
                                            <th>Fecha</th>
                                            <th>Capital</th>
                                            <th>Interés</th>
                                            <th>Total</th>
                                            <th>Balance</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {transaccionesFiltradas.map((transaccion, index) => (
                                            <tr key={index}>
                                                <td>{transaccion.fecha}</td>
                                                <td>{transaccion.capital}</td>
                                                <td>{transaccion.interes}</td>
                                                <td>{transaccion.total}</td>
                                                <td>{transaccion.balance}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            )
                        )}

                        {/* Botón para regresar al menú principal */}
                        <div className="mt-3 text-end buttom-regresar-container">
                            <Link to="/" className="buttom-regresar">
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

