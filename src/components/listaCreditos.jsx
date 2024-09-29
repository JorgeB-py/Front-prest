import { useState, useEffect } from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Header } from "./header";
import { Footer } from "./footer";
import "./styles/listaCreditos.css";

// Simulación de usuario autenticado
const user = { id: 1, email: "user@example.com" }; // ID del usuario autenticado

export default function ListaCreditos() {
    const [creditosUsuario, setCreditosUsuario] = useState([]);
    const [error, setError] = useState(null); // Para manejar errores
    const [loading, setLoading] = useState(true); // Para mostrar un estado de carga

    // Fetch de créditos del API
    useEffect(() => {
        const fetchCreditos = async () => {
            try {
                const response = await fetch("https://my.api.mockaroo.com/lista_creditos_mock.json?key=2a692260");
                if (!response.ok) {
                    throw new Error("Error al obtener los datos del API");
                }
                const data = await response.json();

                // Filtrar los créditos para mostrar solo los del usuario autenticado
                const creditosFiltrados = data.filter((credito) => credito.usuarioId === user.id);
                setCreditosUsuario(creditosFiltrados);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false); // Terminar el estado de carga
            }
        };

        fetchCreditos();
    }, []);

    return (
        <>
            <Header nav_links={[{ name: "Inicio", url: "/" }, { name: "Dashboard", url: "/dashboard" }]} />
            <Container className="lista-creditos-container">
                <Row className="justify-content-md-center">
                    <Col md={8}>
                        <h1>Mis Créditos</h1>
                        {loading ? (
                            <p>Cargando créditos...</p>
                        ) : error ? (
                            <p>Error: {error}</p>
                        ) : (
                            <ListGroup>
                                {creditosUsuario.length > 0 ? (
                                    creditosUsuario.map((credito) => (
                                        <ListGroup.Item key={credito.id}>
                                            {/* Pasar los detalles del crédito como state al componente de Visualizar Transacciones */}
                                            <Link 
                                                to={{
                                                    pathname: `/visualizar-transacciones/${credito.id}`,
                                                    state: {
                                                        nombre: credito.nombre,
                                                        monto: credito.monto,
                                                        fechaPago: credito.fechaPago,
                                                        estado: credito.estado
                                                    }
                                                }}
                                            >
                                                <div>
                                                    <strong>{credito.nombre}</strong> - ${credito.monto}
                                                </div>
                                                <div>Fecha de Pago: {credito.fechaPago}</div>
                                                <div>Estado: {credito.estado}</div>
                                            </Link>
                                        </ListGroup.Item>
                                    ))
                                ) : (
                                    <p>No tienes créditos registrados.</p>
                                )}
                            </ListGroup>
                        )}
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    );
}
