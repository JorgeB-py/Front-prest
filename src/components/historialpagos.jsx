import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { jsPDF } from 'jspdf';
import config from '../config';

const HistorialPagos = ({ pagos = [], prestamo, onUpdatePago }) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [totalPagado, setTotalPagado] = useState(0);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPago, setSelectedPago] = useState(null);
  const [editedPago, setEditedPago] = useState({});
  const apiurl = config.apiUrl; // Cambia esto a tu URL real del backend

  const handleCloseConfirmationModal = () => setShowConfirmationModal(false);
  const handleCloseEditModal = () => setShowEditModal(false);

  useEffect(() => {
    const total = pagos.reduce((acc, pago) => acc + (pago.capital || 0), 0);
    setTotalPagado(total);
  }, [pagos]);

  const calcularBalance = (index) => {
    let balanceRestante = prestamo.monto;
    for (let i = 0; i <= index; i++) {
      balanceRestante -= pagos[i].capital || 0;
    }
    return balanceRestante;
  };

  const formatDate = (date) => new Date(date).toISOString().split('T')[0];

  const handleEditClick = (pago) => {
    setSelectedPago(pago);
    setEditedPago({ ...pago });
    setShowEditModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPago({ ...editedPago, [name]: name === "fecha" ? value : parseFloat(value) || 0 });
  };

  const handleSaveEdit = async () => {
    // Realizar el fetch para actualizar el pago
    const token = localStorage.getItem('token'); // Asegúrate de tener un token válido o un sistema de autenticación

    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/pagos/${selectedPago.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(editedPago),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el pago');
      }

      // Al actualizar el pago exitosamente, puedes llamar a onUpdatePago si se pasó como prop
      if (onUpdatePago) {
        onUpdatePago(selectedPago, editedPago);
      }

      setShowEditModal(false); // Cerrar el modal
    } catch (error) {
      console.error('Error al actualizar el pago:', error);
    }
  };

  const handleGenerate = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Historial de Pagos', 14, 20);
    const headers = ['Fecha', 'Capital', 'Interés', 'Total Pago', 'Balance'];
    const startY = 30;
    let currentY = startY;
    doc.setFontSize(12);
    headers.forEach((header, index) => {
      doc.text(header, 14 + index * 40, currentY);
    });
    currentY += 10;
    pagos.forEach((pago, index) => {
      doc.text(formatDate(pago?.fecha) || 'N/A', 14, currentY);
      doc.text(`$${(pago?.capital || 0).toLocaleString()}`, 54, currentY);
      doc.text(`$${(pago?.interes || 0).toLocaleString()}`, 94, currentY);
      doc.text(`$${(pago.capital + pago.interes || 0).toLocaleString()}`, 134, currentY);
      doc.text(`$${(calcularBalance(index)).toLocaleString()}`, 174, currentY);
      currentY += 10;
    });
    doc.save('historial_de_pagos.pdf');
    setShowConfirmationModal(false);
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th><FormattedMessage id="app.date" defaultMessage="Date" /></th>
            <th><FormattedMessage id="app.capital" defaultMessage="Capital" /></th>
            <th><FormattedMessage id="app.interest" defaultMessage="Interest" /></th>
            <th><FormattedMessage id="app.quantity" defaultMessage="Total Payment" /></th>
            <th><FormattedMessage id="app.balance" defaultMessage="Balance" /></th>
            <th><FormattedMessage id="app.actions" defaultMessage="Actions" /></th>
          </tr>
        </thead>
        <tbody>
          {pagos && pagos.length > 0 ? (
            pagos.map((pago, index) => (
              <tr key={index}>
                <td>{formatDate(pago?.fecha) || 'N/A'}</td>
                <td>${(pago?.capital || 0).toLocaleString()}</td>
                <td>${(pago?.interes || 0).toLocaleString()}</td>
                <td>${(pago.capital + pago.interes || 0).toLocaleString()}</td>
                <td>${(calcularBalance(index)).toLocaleString()}</td>
                <td>
                  <Button variant="warning" size="sm" onClick={() => handleEditClick(pago)}>
                    <FormattedMessage id="app.edit" defaultMessage="Edit" />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6"><FormattedMessage id="historial.sinDatos" defaultMessage="No data available" /></td>
            </tr>
          )}
        </tbody>
      </table>
      <Button className="btn buttom-general" onClick={() => setShowConfirmationModal(true)}>
        <FormattedMessage id="historial.tituloBotonGenera" />
      </Button>

      <Modal show={showConfirmationModal} onHide={handleCloseConfirmationModal} centered>
        <Modal.Header closeButton>
          <Modal.Title><FormattedMessage id="historial.titulo" /></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button className="btn buttom-general" onClick={handleGenerate}>
            <FormattedMessage id="historial.cerrar" />
          </Button>
        </Modal.Body>
      </Modal>

      <Modal show={showEditModal} onHide={handleCloseEditModal} centered>
        <Modal.Header closeButton>
          <Modal.Title><FormattedMessage id="app.editPayment" defaultMessage="Edit Payment" /></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Fecha</Form.Label>
              <Form.Control type="date" name="fecha" value={editedPago.fecha || ''} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label><FormattedMessage id="app.capital" defaultMessage="Capital" /></Form.Label>
              <Form.Control type="number" name="capital" value={editedPago.capital || 0} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label><FormattedMessage id="app.interest" defaultMessage="Interest" /></Form.Label>
              <Form.Control type="number" name="interes" value={editedPago.interes || 0} onChange={handleInputChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}><FormattedMessage id="app.cancel" defaultMessage="Cancel" /></Button>
          <Button variant="primary" onClick={handleSaveEdit}><FormattedMessage id="app.save" defaultMessage="Save" /></Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default HistorialPagos;
