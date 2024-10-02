import React from 'react';
import { Header } from './header';
import { Container, Row, Col } from 'react-bootstrap';
import './styles/Index.css';
import { Footer } from './footer';
import { FormattedMessage } from 'react-intl';

export default function Index() {
    const [total, setTotal] = React.useState(0);
    const [deudores, setDeudores] = React.useState([]);

    React.useEffect(() => {
        fetch("https://my.api.mockaroo.com/pago_intereses.json?key=b93c22a0")
            .then((response) => response.json())
            .then((data) => {
                setDeudores(data);
                setTotal(data.reduce((acc, deudor) => acc + deudor.pago_intereses, 0));
            });
    }, []);
    const nav_links = [
        { name: "Deudores", url: "/deudores" },
        { name: "Crear Deudor", url: "/crearcliente" },
        { name: "Consultar Deudor", url: "/consultarcliente" },
    ];
    const nombre_usuario = "Jorge";

    const RenderCards = ({ nombre, fecha }) => {
        return (
            <Col>
                <div className="card card-style" style={{ width: "15rem", height: "25rem" }}>
                    <img
                        src="./2148859448.jpg"
                        className="card-img-top"
                        alt="imagen deudor"
                        style={{ height: "200px", objectFit: "cover" }} // Ajusta el tamaño de la imagen
                    />
                    <div className="card-body" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                        <h5 className="card-title">{nombre}</h5>
                        <p className="card-text">
                            <FormattedMessage id="app.Modified" defaultMessage="Modified" />: {fecha}
                        </p>
                        <a href="/infodeudor" className="btn btn-primary">
                            <FormattedMessage id="app.information" defaultMessage="Information" />
                        </a>
                    </div>
                </div>
            </Col>

        )
    }

    return (
        <>
            <Header nav_links={nav_links} logged={true} usuario={nombre_usuario}></Header>
            <Container style={{ display: "grid", padding: '1rem' }}>
                <h1 style={{ textAlign: 'left' }}><FormattedMessage id="app.welcome" defaultMessage="Welcome" />, Jorge</h1>
                <h3><FormattedMessage id="app.thismonth" defaultMessage="This month you have earned" /></h3>
                <h2 style={{ color: "#004AAC" }}>${total}</h2>
                <Col className='filtros'>
                    <Row>
                        <Col className='col'>
                            <a> &gt;1 <FormattedMessage id="app.year" defaultMessage="year" /></a>
                        </Col>
                        <Col className='col'>
                            <a>6 <FormattedMessage id="app.months" defaultMessage="months" /></a>
                        </Col>
                        <Col className='col'>
                            <a>3 <FormattedMessage id="app.months" defaultMessage="months" /></a>
                        </Col>
                        <Col className='col'>
                            <a>1 <FormattedMessage id="app.month" defaultMessage="month" /></a>
                        </Col>
                    </Row>
                </Col>
            </Container>
            <Container>
                <Row style={{ padding: "50px" }}>
                    {
                        deudores.map((deudor, index) => (
                            <RenderCards key={index} nombre={deudor.nombre} fecha={deudor.fecha}></RenderCards>
                        ))
                    }
                </Row>
            </Container>
            <Footer />
        </>
    );
}