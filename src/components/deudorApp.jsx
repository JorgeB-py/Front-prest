import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';  // Importar Modal y Form de react-bootstrap
import DeudorInfo from './deudorInfo';
import HistorialPagos from './historialpagos';
import { Header } from './header';
import { Footer } from './footer';
import { Container, Col, Row } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import SmallCalendar from './SmallCalendar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/deudorApp.css';  // Estilos personalizados

export default function DeudorApp() {
  const [deudorData, setDeudorData] = useState({
    nombre: '',
    fechaVencimiento: '',
    prestado: 0,
    interes: 5,
    fechaPago: ''
  });

  const [historialPagos, setHistorialPagos] = useState([]);
  const [showModal, setShowModal] = useState(false);  // Estado para controlar el modal de pagos
  const [showModalInteres, setShowModalInteres] = useState(false); // Estado para controlar el modal de modificar interés
  const [cantidad, setCantidad] = useState(500);      // Estado para la cantidad de pago
  const [nuevoInteres, setNuevoInteres] = useState(0);  // Estado para modificar el interés del deudor

  useEffect(() => {
    fetch("https://my.api.mockaroo.com/userdata.json?key=b93c22a0")
      .then((response) => response.json())
      .then((data) => {
        setDeudorData(data[0]);

        // Inicializar el historial de pagos después de recibir los datos del deudor
        setHistorialPagos([
          { fecha: '2024-08-15', cantidad: 0, interes: 0, porcentaje_interes: data[0].interes ,balance: data[0].prestado }
        ]);

        setNuevoInteres(data[0].interes);  // Inicializar el interés
      });
  }, []);

  // Función para calcular el balance del deudor
  const deudorDataBalance = () => {
    return ({
      nombre: deudorData.nombre,
      fechaVencimiento: deudorData.fechaVencimiento,
      prestado: deudorData.prestado,
      interes: deudorData.interes,
      fechaPago: deudorData.fechaPago,
      sumaIntereses: historialPagos.reduce((acc, pago) => acc + pago.interes, 0), // Sumar todos los intereses
      balance: historialPagos[historialPagos.length - 1]?.balance || 0 // Obtener el último balance
    });
  };

  // Almacenamos el balance calculado en una variable
  const deudorData_lista = deudorDataBalance();

  // Links de navegación
  const nav_links = [
    { name: "Dashboard", url: "/dashboard" },
    { name: "Deudores", url: "/deudores" },
    { name: "Mi dinero", url: "/midinero" },
  ];

  // Función para agregar un nuevo pago
  const agregarPago = () => {
    const ultimoBalance = historialPagos[historialPagos.length - 1].balance;
    const nuevoBalance = ultimoBalance - cantidad;

    const nuevoPago = {
      fecha: new Date().toISOString().split('T')[0], // Fecha actual
      cantidad: cantidad,
      interes: cantidad * (deudorData.interes / 100),
      porcentaje_interes: deudorData.interes,
      balance: nuevoBalance
    };

    // Usar setHistorialPagos con una nueva copia del arreglo (sin mutarlo)
    setHistorialPagos([...historialPagos, nuevoPago]);
    setShowModal(false);  // Cerrar el modal después de agregar el pago
  };

  // Función para actualizar el interés
  const actualizarInteres = () => {
    setDeudorData({
      ...deudorData,
      interes: nuevoInteres
    });
    setShowModalInteres(false); // Cerrar el modal después de actualizar el interés
  };

  return (
    <>
      <Header nav_links={nav_links} logged={true} usuario={'Jorge'} />
      <Container>
        <Row className="mt-4">
          <Col md={6} className="text-center">
            <DeudorInfo deudor={deudorData_lista} />

            {/* Botón para modificar el interés */}
            <Button className="mt-3" style={{display:'flex'}} onClick={() => setShowModalInteres(true)}>
              <FormattedMessage id="app.modifyInterest" defaultMessage="Modify interest" />
            </Button>
          </Col>
          <Col md={6}>
            <Row>
              <Col style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                <SmallCalendar date_inicial={deudorData_lista.fechaPago} deudorData={deudorData_lista} />
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col>
            <h3><FormattedMessage id="app.recents" defaultMessage="Recents" /></h3>
            <Button onClick={() => setShowModal(true)}><FormattedMessage id="app.addPayment" defaultMessage="Add payment" /></Button>
            <HistorialPagos pagos={historialPagos} />
          </Col>
        </Row>
      </Container>
      <Footer />

      {/* Modal para agregar pagos */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title><FormattedMessage id="app.addPayment" defaultMessage="Add payment" /></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label><FormattedMessage id="app.quantity" defaultMessage="Quantity" /></Form.Label>
              <Form.Control
                type="number"
                value={cantidad}
                onChange={(e) => setCantidad(parseFloat(e.target.value))}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            <FormattedMessage id="app.cancel" defaultMessage="Cancel" />
          </Button>
          <Button variant="primary" onClick={agregarPago}>
            <FormattedMessage id="app.addPayment" defaultMessage="Add payment" />
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para modificar el interés */}
      <Modal show={showModalInteres} onHide={() => setShowModalInteres(false)}>
        <Modal.Header closeButton>
          <Modal.Title><FormattedMessage id="app.modifyInterest" defaultMessage="Modify interest" /></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label><FormattedMessage id="app.newInterest" defaultMessage="new Interest (%)" /></Form.Label>
              <Form.Control
                type="number"
                value={nuevoInteres}
                onChange={(e) => setNuevoInteres(parseFloat(e.target.value))}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModalInteres(false)}>
            <FormattedMessage id="app.cancel" defaultMessage="Cancel" />
          </Button>
          <Button variant="primary" onClick={actualizarInteres}>
            <FormattedMessage id="app.save" defaultMessage="Save" />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
