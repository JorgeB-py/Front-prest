import React from 'react';
import './styles/deudorInfo.css';  // Agrega un archivo CSS para estilos personalizados
import { Row, Col, Image, Button} from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';  // Importar FormattedMessage de react-intl

const DeudorInfo = ({ deudor, setShowModal }) => {
  let frecuenciaPago = <FormattedMessage id="app.Semanal" defaultMessage="Semanalx" />;
  let estado = "OK";


  if (deudor.state==="Mora") {
    estado = <FormattedMessage id="app.Mora" defaultMessage="Mora" />;
  }

  if(deudor.frecuenciaPago==="Quincenal"){
    frecuenciaPago=<FormattedMessage id="app.Quincenal" defaultMessage="Quincenalx" />;
  } else if(deudor.frecuenciaPago==="Mensual"){
    frecuenciaPago=<FormattedMessage id="app.Mensual" defaultMessage="Mensualx" />;
  }

  const language = navigator.language.split(/[-_]/)[0]; 
  return (
    <>
      <Row className="align-items-start">
        <Col xs={12} md={3} >
          <Image src='./2148859448.jpg' roundedCircle width={200} height={200} className="mb-3" alt='imgperfil' />
        </Col>
        <Col xs={12} md={2}>
          <Row className="my-3">
            <h4 className="mb-0"><FormattedMessage id="app.name" defaultMessage="Name" /></h4>
            <p className="mb-0 value-data">{deudor.nombre}</p>
          </Row>
          <Row className="my-3">
            <h4 className="mt-2 mb-0"><FormattedMessage id="app.startDate" defaultMessage="Start date" /></h4>
            <p className="mb-0 value-data">
              {deudor.fechaInicio.toLocaleDateString(language, {day: 'numeric',month: 'long',year: 'numeric'})}  {/*//TODO traducir*/}
            </p>
          </Row>
          
          <Row className="my-3">
            <h4 className="mt-2 mb-0"><FormattedMessage id="app.dueDate" defaultMessage="Due date" /></h4>
            <p className="mb-0 value-data">
              {deudor.fechaVencimiento.toLocaleDateString(language, {day: 'numeric',month: 'long',year: 'numeric'})}  {/*//TODO traducir*/}
            </p>
          </Row>
        </Col>
        <Col xs={12} md={2}>
          <Row className="my-3">
            <h4 className="mb-0"><FormattedMessage id="app.capital" defaultMessage="Capital" /></h4>
            <p className="mb-0 value-data">$ {deudor.prestado.toLocaleString()}</p>
          </Row>
          <Row className="my-3">
            <h4 className="mb-0"><FormattedMessage id="app.balance" defaultMessage="Balance Total" /></h4>
            <p className="mb-0 value-data">$ {deudor.getBalance().toLocaleString()}</p>
          </Row>
          <Row className="my-3">
            <h4 className="mb-0"><FormattedMessage id="app.interestRate" defaultMessage="Interest Rate" /></h4>
            <p className="mb-0 value-data">{deudor.interes}%</p>
          </Row>
          <Row className="my-3">
            <h4 className="mb-0"><FormattedMessage id="app.totalInterest" defaultMessage="Total Interest" /></h4>
            <p className="mb-0 value-data">$ {deudor.totalInterest().toLocaleString()}</p>
          </Row>
        </Col>
        <Col xs={12} md={3}>
          <Row className="my-3">
            <h4 className="mb-0"><FormattedMessage id="app.paymentFrequency" defaultMessage="Frecuencia de Pago" /></h4>
            <p className="text-primary mb-0 value-data">{frecuenciaPago}</p> {/*//TODO traducir*/}
          </Row>
          <Row className="my-3">
            <h4 className="mb-0"><FormattedMessage id="app.debtState" defaultMessage="Estado de la Deuda" /></h4>
            <p className="text-primary mb-0 value-data">{estado}</p> {/*//TODO traducir*/}
          </Row>
        </Col>
        <Col xs={12} md={"auto"}>
          {/* Botón para modificar el interés */}
          <Button className="mt-3 btn-add" style={{display:'flex'}} onClick={() => setShowModal(true)}>
              <i className="bi bi-pencil-square"></i>&nbsp;
              <FormattedMessage id="app.editInfo" defaultMessage="Edit" /> {}
            </Button>
        </Col>
      </Row>
    </>
  );
};

export default DeudorInfo;
