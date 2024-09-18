import React from 'react';

const HistorialPagos = ({ pagos }) => {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Fecha</th>
            <th>Cantidad</th>
            <th>Interés</th>
            <th>Principal</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {pagos.map((pago, index) => (
            <tr key={index}>
              <td>{pago.fecha}</td>
              <td>${pago.cantidad}</td>
              <td>${pago.interes}</td>
              <td>${pago.principal}</td>
              <td>${pago.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistorialPagos;