import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';  // Importar Modal y Form de react-bootstrap
import DeudorInfo from './deudorInfo';
import HistorialPagos from './historialpagos';
import Calendar from './Calendar'
import { Header } from './header';
import { Footer } from './footer';
import { Container, Col, Row } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/deudorApp.css';  // Estilos personalizados

export default function DeudorApp() {
  const [deudorData, setDeudorData] = useState({
    nombre: 'Joseph',
    fechaInicio: new Date(),
    fechaVencimiento: new Date(),
    prestado: 100000,
    interes: 5,
    frecuenciaPago: 'Semanal',
    state: 'Mora',
    totalInterest:function (){
      return this.prestado*(this.interes/100);
    },
    getBalance:function (){
      return this.prestado+this.totalInterest()
    }
  });

  const [newDeudorData, setNewDeudorData] = useState(0);
  const [newPayment, setNewPayment] = useState(0);      // Estado para la nuevo pago

  const [historialPagos, setHistorialPagos] = useState([]);
  const [showModal, setShowModal] = useState(false);  // Estado para controlar el modal de pagos
  const [showModalInteres, setShowModalInteres] = useState(false); // Estado para controlar el modal de modificar interés
  // Estado para modificar el interés del deudor

  useEffect(() => {
    // fetch("https://my.api.mockaroo.com/userdata.json?key=b93c22a0")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setDeudorData(data[0]);

    //     // Inicializar el historial de pagos después de recibir los datos del deudor
    //     setHistorialPagos([
    //       { fecha: '2024-08-15', cantidad: 0, interes: 0, porcentaje_interes: data[0].interes ,balance: data[0].prestado }
    //     ]);

    //     setNuevoInteres(data[0].interes);  // Inicializar el interés
    //   });
  }, []);

  useEffect(() => {
    if (!showModalInteres) {
      setNewDeudorData({
        fechaInicio: deudorData.fechaInicio,
        fechaVencimiento: deudorData.fechaVencimiento,
        prestado: deudorData.prestado,
        interes: deudorData.interes,
        frecuenciaPago: deudorData.frecuenciaPago,
      })
    }
    if (!showModal) {
      setNewPayment({
        capital:0,
        interes:0,
        totalPayment:0
      })
    }
    if (historialPagos.length>0){
      setDeudorData({
        ...deudorData,
        getBalance:function(){
          return historialPagos[historialPagos.length-1].balance
        }
      })
    }
  }, [showModalInteres,showModal,historialPagos])

  // Links de navegación
  const nav_links = [
    { name: "Deudores", url: "/deudores" },
    { name: "Mi dinero", url: "/midinero" },
  ];

  // Función para agregar un nuevo pago
  const agregarPago = () => {
    const nuevoBalance = deudorData.getBalance() - newPayment.totalPayment;

    const nuevoPago = {
      fecha: new Date().toISOString().split('T')[0], // Fecha actual
      capital: newPayment.capital,
      interest: newPayment.interest,
      totalPayment:newPayment.totalPayment,
      balance: nuevoBalance,
    };
    // Usar setHistorialPagos con una nueva copia del arreglo (sin mutarlo)
    setHistorialPagos([...historialPagos, nuevoPago]);
    setShowModal(false);  // Cerrar el modal después de agregar el pago
  };

  // Función para actualizar el interés
  const actualizarDeudorData = () => {
    setDeudorData({
      ...deudorData,
      ...newDeudorData
    });
    setShowModalInteres(false); // Cerrar el modal después de actualizar el interés
  };

  return (
    <>
      <Header nav_links={nav_links} logged={true} usuario={'Jorge'} />
      <Container>
        <Row className="mt-4">
          <Col className="text-center" md={12}>
            <DeudorInfo deudor={deudorData} setShowModal={setShowModalInteres} />
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <h3><FormattedMessage id="app.recents" defaultMessage="Recents" /></h3>
            <Button className="btn-add" onClick={() => setShowModal(true)}><FormattedMessage id="app.addPayment" defaultMessage="Add payment" /></Button>
            <HistorialPagos pagos={historialPagos} />
          </Col>
        </Row>
      </Container>
      <Footer />

      {/* Modal para modificar el interés */}
      <Modal show={showModalInteres} onHide={() => setShowModalInteres(false)}>
        <Modal.Header closeButton style={{ borderBottom: 'none' }}>
          <Modal.Title className="TWK-titulo-modal"><FormattedMessage id="app.editInfo" /></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container className='mt-0'>
            <Form>
              <Form.Group> {/*// TODO Traducir */}
                <Row className='mt-0'>
                  <Col md={6}>
                    <Form.Label><FormattedMessage id="app.newStartDate" defaultMessage="Start Date" /></Form.Label>
                    <Calendar defaultValue={deudorData.fechaInicio} onChange={(value) => { setNewDeudorData({ ...newDeudorData, fechaInicio: value }) }} />
                  </Col>
                  <Col md={6}>
                    <Form.Label><FormattedMessage id="app.newDueDate" defaultMessage="Due Date" /></Form.Label>
                    <Calendar defaultValue={deudorData.fechaVencimiento} onChange={(value) => { setNewDeudorData({ ...newDeudorData, fechaVencimiento: value }) }} />
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <Form.Label><FormattedMessage id="app.newLoan" defaultMessage="Total Loan" /></Form.Label>
                    <Form.Control
                      type="number"
                      defaultValue={deudorData.prestado}
                      onChange={(e) => setNewDeudorData({ ...newDeudorData, prestado: parseFloat(e.target.value) })}
                    />
                    <Form.Label><FormattedMessage id="app.newInterest" defaultMessage="Interest" /></Form.Label>
                    <Form.Control
                      type="number"
                      defaultValue={deudorData.interes}
                      onChange={(e) => setNewDeudorData({ ...newDeudorData, interes: parseFloat(e.target.value) })}
                    />
                    <Form.Label><FormattedMessage id="app.paymentFrequency" defaultMessage="Payment Frequency" /></Form.Label>
                    <select className="form-select" aria-label="Default select example" defaultValue={deudorData.frecuenciaPago} onChange={(e) => { setNewDeudorData({ ...newDeudorData, frecuenciaPago: e.target.value }) }}> {/*//TODO Traducir */}
                      <option disabled>Selecciona una opcion</option>
                      <option value="Semanal">Semanal</option>
                      <option value="Quincenal">Quincenal</option>
                      <option value="Mensual">Mensual</option>
                    </select>
                  </Col>
                </Row>

              </Form.Group>
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer style={{ borderTop: 'none' }} >
          <Button variant="secondary" onClick={() => setShowModalInteres(false)}>
            <FormattedMessage id="app.cancel" defaultMessage="Cancel" />
          </Button>
          <Button variant="primary" onClick={actualizarDeudorData}>
            <FormattedMessage id="app.save" defaultMessage="Save" />
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para agregar pagos */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title><FormattedMessage id="app.addPayment" defaultMessage="Add payment" /></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label><FormattedMessage id="app.capital" defaultMessage="Capital" /></Form.Label>
              <Form.Control
                type="number"
                defaultValue={newPayment.capital}
                onChange={(e) => {
                  let value = parseFloat(e.target.value);
                  if (isNaN(value))value = 0;
                  setNewPayment({...newPayment,capital:value,totalPayment:newPayment.interest+value})
                }}
              />
              <Form.Label><FormattedMessage id="app.interest" defaultMessage="Interest" /></Form.Label>
              <Form.Control
                type="number"
                defaultValue={newPayment.interest}
                onChange={(e) => {
                  let value = parseFloat(e.target.value);
                  if (isNaN(value))value = 0;
                  setNewPayment({...newPayment,interest:value,totalPayment:newPayment.capital+value})
                }}
              />
              <Form.Label><FormattedMessage id="app.totalPayment" defaultMessage="Total Payment" /></Form.Label>
              <Form.Control
                type="number"
                value={newPayment.totalPayment}
                disabled
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
    </>
  );
}
