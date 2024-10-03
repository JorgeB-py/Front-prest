import React, { useState} from 'react';
import { Modal, Button} from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

const HistorialPagos = ({ pagos }) => {
  // Configuración del modal
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const handleCloseConfirmationModal = () => setShowConfirmationModal(false);

  //Configuración del botón
  const handleGenerate = () => {
    console.log('Historial de pagos descargado correctamente');
    setShowConfirmationModal(false);
  }
  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th><FormattedMessage id="app.date" defaultMessage="Date" /></th>
            <th><FormattedMessage id="app.capital" defaultMessage="Capital" /></th>
            <th><FormattedMessage id="app.interest" defaultMessage="Interest"/></th>
            <th><FormattedMessage id="app.quantity" defaultMessage="Total Payment" /></th>
            <th><FormattedMessage id="app.balance" defaultMessage="Balance" /></th>
          </tr>
        </thead>
        <tbody>
          {pagos.map((pago, index) => (
            <tr key={index}>
              <td>{pago.fecha}</td>
              <td>${pago.capital.toLocaleString()}</td>
              <td>${pago.interest.toLocaleString()}</td>
              <td>${pago.totalPayment.toLocaleString()}</td>
              <td>${pago.balance.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button variant="btn buttom-general" onClick={() => setShowConfirmationModal(true)}>
        <FormattedMessage id="historial.tituloBotonGenera" />
      </Button>
      {/* Modal de confirmación de creación */}
      <Modal show={showConfirmationModal} onHide={handleCloseConfirmationModal} dialogClassName="modal-prest" centered>
        <Modal.Header>
          <Modal.Title dialogClassName='text-center'><FormattedMessage id="historial.titulo" /></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button className="btn buttom-general" onClick={handleGenerate}>   
            <FormattedMessage id="historial.cerrar" />
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default HistorialPagos;