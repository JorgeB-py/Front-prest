import React, { useState} from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Container, Col, Row } from 'react-bootstrap'; 
import { Header } from './header';
import { Footer } from './footer';
import { Link } from "react-router-dom";
import { FormattedMessage , useIntl } from 'react-intl';
import DeudorInfoResumen from './DeudorInfoResumen';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/crearPrestamo.css";


export default function CrearPrestamo(){
    const intl = useIntl();

    // Links de navegación
    const nav_links = [
        { name: intl.formatMessage({ id: 'nav.deudores' }), url: "/deudores" },
        { name: intl.formatMessage({ id: 'nav.crearDeudor' }), url: "/crearcliente" },
        { name: intl.formatMessage({ id: 'nav.consultarDeudor' }), url: "/consultarcliente" },
    ];


    // Configuración del modal
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const handleCloseConfirmationModal = () => setShowConfirmationModal(false);

    // Datos de prueba
    const debtorData = {
        nombre: "Armando",
        apellido: "Rueda",
        identificacion: "1110450341",
        deuda: 23000
    };

    const [prestamo, setPrestamo] = useState({
        nombre_prestamo: "",
        monto: "",
        dia_pago: "",
        cuotas: "",
        interes: "",
        valor_cuota: ""

    });

    const handleChange = (e) => {
        const { name, value} = e.target;
        console.log(value);
        setPrestamo({
            ...prestamo,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(prestamo);
        setShowConfirmationModal(true);
    }



    return (
        <>
        <Header nav_links={nav_links} logged={true} usuario={'Jorge'} />
        <Container>
            <DeudorInfoResumen deudor={debtorData} />
        </Container>
        <Container>
            <div className="crear-prestamo">
                <h2><FormattedMessage id="crearPrestamo.titulo" /></h2>
                <Row className="justify-content-md-center">
                    <Col md={10}>
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col>
                                <Form.Group controlId="nombre-prestamo">
                                    <Form.Label><FormattedMessage id="crearPrestamo.nombre" /></Form.Label>
                                    <Form.Control 
                                    type="text" 
                                    name="nombre_prestamo"
                                    value={prestamo.nombre_prestamo}
                                    onChange={handleChange}
                                    placeholder={intl.formatMessage({ id: 'crearPrestamo.placeholderNombre' })}/>
                                </Form.Group>
                                </Col>
                                <Col>
                                <Form.Group controlId="monto-prestamo">
                                    <Form.Label><FormattedMessage id="crearPrestamo.monto" /></Form.Label>
                                    <Form.Control 
                                    type="number" 
                                    name="monto"
                                    value={prestamo.monto}
                                    onChange={handleChange}
                                    placeholder={intl.formatMessage({ id: 'crearPrestamo.placeholderMonto' })} />
                                </Form.Group>
                                </Col>
                                <Col>
                                <Form.Group controlId="dia-pago-prestamo">
                                    <Form.Label><FormattedMessage id="crearPrestamo.fechaPago" /></Form.Label>
                                    <Form.Control 
                                    type="number"
                                    name="dia_pago" 
                                    value={prestamo.dia_pago}
                                    onChange={handleChange}
                                    placeholder={intl.formatMessage({ id: 'crearPrestamo.placeholderFechaPago' })} />
                                </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                <Form.Group controlId="cuotas-prestamo">
                                    <Form.Label><FormattedMessage id="crearPrestamo.cuotas" /></Form.Label>
                                    <Form.Control 
                                    type="number" 
                                    name="cuotas"
                                    value={prestamo.cuotas}
                                    onChange={handleChange}
                                    placeholder={intl.formatMessage({ id: 'crearPrestamo.placeholderCuotas' })}/>
                                </Form.Group>
                                </Col>
                                <Col>
                                <Form.Group controlId="interes-prestamo">
                                    <Form.Label><FormattedMessage id="crearPrestamo.interes" /></Form.Label>
                                    <Form.Control 
                                    type="number"
                                    name="interes" 
                                    value={prestamo.interes}
                                    onChange={handleChange}
                                    placeholder={intl.formatMessage({ id: 'crearPrestamo.placeholderInteres' })} />
                                </Form.Group>
                                </Col>
                                <Col>
                                <Form.Group controlId="valor-cuota">
                                    <Form.Label><FormattedMessage id="crearPrestamo.valorCuota" /></Form.Label>
                                    <Form.Control 
                                    type="number"
                                    name="valor_cuota" 
                                    value={prestamo.valor_cuota}
                                    onChange={handleChange}
                                    placeholder={intl.formatMessage({ id: 'crearPrestamo.placeholderValorCuota' })} />
                                </Form.Group>
                                </Col>
                            </Row>
                            <Container className="botones">
                            <Row>
                                <Col></Col>
                                <Col>
                                    <Button className="btn buttom-general" type="submit">
                                    <FormattedMessage id="crearPrestamo.titulo" />
                                    </Button>
                                </Col>
                                <Col></Col>
                            </Row>
                            </Container>
                            <Container className="botones">
                            <Row>
                                <Col></Col>
                                <Col>
                                    <Link to="/deudores" className="btn buttom-regresar">
                                        <FormattedMessage id="crearPrestamo.volver" />
                                    </Link>
                                </Col>
                                <Col></Col>
                            </Row>
                            </Container>
                        </Form>
                    </Col>
                </Row>
            </div>
        </Container>
        {/* Modal de confirmación de creación */}
        <Modal show={showConfirmationModal} onHide={handleCloseConfirmationModal} dialogClassName="modal-prest" centered>
            <Modal.Header>
            <Modal.Title dialogClassName='text-center'><FormattedMessage id="crearPrestamo.tituloConfirmacion" /></Modal.Title>
            </Modal.Header>
            <Modal.Body className='modal-body'>
            <p><FormattedMessage id="crearPrestamo.confirmacion" /></p>
            <ul>
                <li><FormattedMessage id="crearPrestamo.nombre" />: {prestamo.nombre_prestamo}</li>
                <li><FormattedMessage id="crearPrestamo.monto" />:{prestamo.monto}</li>
                <li><FormattedMessage id="crearPrestamo.fechaPago" />: {prestamo.dia_pago}</li>
                <li><FormattedMessage id="crearPrestamo.cuotas" />: {prestamo.cuotas}</li>
                <li><FormattedMessage id="crearPrestamo.interes" />: {prestamo.interes}</li>
                <li><FormattedMessage id="crearPrestamo.valorCuota" />: {prestamo.valor_cuota}</li>
            </ul>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="btn buttom-regresar" onClick={handleCloseConfirmationModal}>
                    <FormattedMessage id="crearPrestamo.aceptarConfirmacion" />
                </Button>
                <Button className="btn buttom-general" onClick={handleCloseConfirmationModal}>   
                    <FormattedMessage id="crearPrestamo.cancelarConfirmacion" />
                </Button>
            </Modal.Footer>
        </Modal>
        <Footer />
        </>
    );

}