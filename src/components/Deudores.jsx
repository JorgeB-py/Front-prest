import React from 'react';
import { Header } from './header';
import { Container, Row, Col, Form } from 'react-bootstrap';
import './styles/Index.css';
import { Footer } from './footer';
import { FormattedMessage } from 'react-intl';
import { useEffect } from 'react';


export default function Index() {
    const [total, setTotal] = React.useState(0);
    const [deudores, setDeudores] = React.useState([]);
    const [filteredDeudores, setFilteredDeudores] = React.useState([]);
    const [searchTerm, setSearchTerm] = React.useState("");

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            fetch("http://localhost:3000/deudor", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Enviar el token en el encabezado
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    setDeudores(data);
                    setFilteredDeudores(data);
                    setTotal(data.reduce((acc, deudor) => acc + deudor.pago_intereses, 0));
                })
                .catch((error) => {
                    console.error('Error al obtener los deudores:', error);
                });
        } else {
            console.error('No hay token disponible');
        }
    }, []);

    // Función para manejar el cambio en el input de búsqueda
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        // Filtrar deudores por nombre
        if (value) {
            const filtered = deudores.filter(deudor =>
                deudor.nombrecompleto.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredDeudores(filtered);
        } else {
            setFilteredDeudores(deudores);
        }
    };

    const nav_links = [
        { name: "Deudores", url: "/deudores" },
        { name: "Crear Deudor", url: "/crearcliente" },
        { name: "Consultar Deudor", url: "/consultarcliente" },
    ];
    const nombre_usuario = "Jorge";

    const RenderCards = ({ nombre, fecha }) => {
        return (
            <Col>
                <div className="card card-style" data-testid="deudor-card" style={{ width: "15rem", height: "25rem" }}>
                    <img
                        src="./2148859448.jpg"
                        className="card-img-top"
                        alt="imagen deudor"
                        style={{ height: "200px", objectFit: "cover" }} // Ajusta el tamaño de la imagen
                    />
                    <div className="card-body" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                        <h5 className="card-title">{nombre}</h5>
                        <p className="card-text">{fecha}</p>
                        <a href="/infodeudor" className="btn btn-primary">
                            <FormattedMessage id="app.information" defaultMessage="Information" />
                        </a>
                    </div>
                </div>
            </Col>
        );
    };

    return (
        <>
            <Header nav_links={nav_links} logged={true} usuario={nombre_usuario}></Header>
            <Container style={{ display: "grid", padding: '1rem' }}>
                <h1 style={{ textAlign: 'left' }}><FormattedMessage id="app.welcome" defaultMessage="Welcome" />, Jorge</h1>
                <h3><FormattedMessage id="app.thismonth" defaultMessage="This month you have earned" /></h3>
                <h2 style={{ color: "#004AAC" }}>${total}</h2>
                
                {/* Filtro por nombre */}
                <Form.Control
                    type="text"
                    placeholder="Buscar por nombre"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={{ marginTop: '20px' }}
                />
            </Container>
            <Container>
                <Row style={{ padding: "50px" }}>
                    {
                        filteredDeudores.map((deudor, index) => (
                            <RenderCards key={index} nombre={deudor.nombrecompleto} fecha={deudor.fecha}></RenderCards>
                        ))
                    }
                </Row>
            </Container>
            <Footer />
        </>
    );
}
