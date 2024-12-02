import React from 'react';
import { Header } from './header';
import { Container, Row, Col, Form } from 'react-bootstrap';
import './styles/Index.css';
import { Footer } from './footer';
import { FormattedMessage } from 'react-intl';
import { useEffect } from 'react';
import "./styles/deudores.css";


export default function Index() {
    const [total, setTotal] = React.useState(0);
    const [prestamista, setPrestamista] = React.useState({
        nombre: "John Doe",
        direccion: "123 Main Street",
        telefono: "1234567890",
        correo: "john.doe@example.com",
        foto: "https://example.com/john.jpg",
        fondosTotales: 100000,
        saldo: 50000,
        prestamos:[
            {
                id:1,
                nomrbre:"Estudios",
                monto:1000000,
                interes:5,
                fechainicio:"2024-11-03",
                fechafin:"2024-12-03",
                saldo:1000000,
                historialpagos:[{
                    id:1,
                    capital:100000,
                    interes:5000,
                    fecha:"2024-11-3",
                    saldo:900000
                }]
            }
        ]
    });
    const [deudores, setDeudores] = React.useState([
        {
            id:1,
            nombrecompleto:"Mariana",
            direccion:"La esmeralda",
            cedula:"106686400",
            fecha:"2024-11-3",
            telefono:"3115322015",
            situacionLaboral:"empleado",
            email:"marianamarin@gmail.com",
            ocupacion:"estudiante",
            foto:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.dzoom.org.es%2F11-consejos-para-hacer-mejores-fotos-que-siempre-me-funcionan%2F&psig=AOvVaw3sSLz7eBigqa2xj-7adQxE&ust=1732147608494000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKidpenO6YkDFQAAAAAdAAAAABAJ",
            prestamos:[{
                id:1,
                nomrbre:"Estudios",
                monto:1000000,
                interes:5,
                fechainicio:"2024-11-03",
                fechafin:"2024-12-03",
                saldo:1000000,
                prestamista:{
                    id:1,
                    nombre:"John Doe",
                    direccion:"123 Main Street",
                    telefono:"1234567890",
                    correo:"nose@gmail.com"
                },
                historialpagos:[{
                    id:1,
                    capital:100000,
                    interes:5000,
                    fecha:"2024-11-3",
                    saldo:900000
                }]
            }]
        }
    ]);
    const [filteredDeudores, setFilteredDeudores] = React.useState([]);
    const [searchTerm, setSearchTerm] = React.useState("");

    useEffect(() => {
        const token = localStorage.getItem('token');
        localStorage.setItem('prestamistaId', 1);
        const prestamistaId = localStorage.getItem('prestamistaId');

        if (token) {
            fetch(`http://localhost:3000/prestamistas/${prestamistaId}/deudores`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.message!="El prestamista con el id proporcionado no fue encontrado") {
                        setDeudores(data.deudores);
                        setFilteredDeudores(data.deudores);
                        setTotal(data.interesesGanados);
                    }
                    
                })
                .catch((error) => {
                    console.error('Error al obtener los deudores:', error);
                });
        } else {
            console.error('No hay token disponible');
        }
        fetch(`http://localhost:3000/prestamistas/${prestamistaId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message!="El prestamista con el id proporcionado no fue encontrado") {
                    setPrestamista(data);
                }
            })
            .catch((error) => {
                console.error('Error al obtener el prestamista:', error);
            });
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
    const nombre_usuario = prestamista.nombre;

    const handleSendId = (e, id) => {
        localStorage.setItem('deudorId', id);
    }

    const RenderCards = ({ deudor }) => {
        return (
            <Col>
                <div className="card card-style" data-testid="deudor-card" style={{ width: "15rem", height: "25rem" }}>
                    <img
                        src={deudor.foto}
                        className="card-img-top"
                        alt="imagen deudor"
                        style={{ height: "200px", objectFit: "cover" }} // Ajusta el tamaño de la imagen
                    />
                    <div className="card-body" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                        <h5 className="card-title">{deudor.nombrecompleto}</h5>
                        <p className="card-text">{deudor.fecha}</p>
                        <a href="/infodeudor" className="btn btn-primary" onClick={(e) => handleSendId(e, deudor.id)}>
                            <FormattedMessage id="app.information" defaultMessage="Information" />
                        </a>
                    </div>
                </div>
            </Col>
        );
    };

    return (
        <div className='all'>
            <Header nav_links={nav_links} logged={true} usuario={nombre_usuario}></Header>
            <main>
                <Container style={{ display: "grid", padding: '1rem' }}>
                    <h1 style={{ textAlign: 'left' }}><FormattedMessage id="app.welcome" defaultMessage="Welcome" />, {nombre_usuario}</h1>
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
                                <RenderCards key={index} deudor={deudor}></RenderCards>
                            ))
                        }
                    </Row>
                </Container>
            </main>
            <Footer />
        </div>
    );
}
