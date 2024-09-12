import React from 'react';

const DeudorInfo = ({ deudor }) => {
  return (
    <div className="card mb-4">
      <div className="card-header">
        <h5>Información del Deudor</h5>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item"><strong>Nombre:</strong> {deudor.nombre}</li>
        <li className="list-group-item"><strong>Fecha de Vencimiento:</strong> {deudor.fechaVencimiento}</li>
        <li className="list-group-item"><strong>Balance Actual:</strong> ${deudor.balance}</li>
        <li className="list-group-item"><strong>Última Fecha de Pago:</strong> {deudor.fechaPago}</li>
      </ul>
    </div>
  );
};

export default DeudorInfo;