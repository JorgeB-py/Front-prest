import React from 'react';
import './styles/deudorInfo.css';  // Agrega un archivo CSS para estilos personalizados
import { Card, Row, Col, Image } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';  // Importar FormattedMessage de react-intl

const DeudorInfo = ({ deudor }) => {
  return (
    <Card className="border-0 shadow-sm">
      <Card.Body>
        <Row className="align-items-center">
          <Col xs={12} md={4} className="text-center text-md-start mb-3 mb-md-0">
            <Image src='./2148859448.jpg' roundedCircle width={120} height={120} className="mb-3" alt='imgperfil' />
            <div>
              <h5 className="mb-0"><FormattedMessage id="app.name" defaultMessage="Name" /></h5>
              <p className="text-muted mb-0">{deudor.nombre}</p>
              <h5 className="mt-2 mb-0"><FormattedMessage id="app.dueDate" defaultMessage="Due date" /></h5>
              <p className="text-muted mb-0">{deudor.fechaVencimiento}</p>
            </div>
          </Col>
          <Col xs={12} md={8}>
            <Row className="g-3">
              <Col xs={12}>
                <h4 className="mb-0"><FormattedMessage id="app.loan" defaultMessage="Loan" /></h4>
                <p className="display-6 text-primary mb-0">${deudor.prestado.toLocaleString()}</p>
              </Col>
              <Col xs={6}>
                <h4 className="mb-0"><FormattedMessage id="app.interests" defaultMessage="Interests" /></h4>
                <p className="display-6 text-primary mb-0">{deudor.interes}%</p>
              </Col>
              <Col xs={6}>
                <h4 className="mb-0"><FormattedMessage id="app.totalInterest" defaultMessage="Total interests" /></h4>
                <p className="display-6 text-primary mb-0">${deudor.sumaIntereses.toLocaleString()}</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default DeudorInfo;
