import React from 'react';
import { FormattedMessage } from 'react-intl';

const HistorialPagos = ({ pagos }) => {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th><FormattedMessage id="app.date" defaultMessage="Date" /></th>
            <th><FormattedMessage id="app.quantity" defaultMessage="Quantity" /></th>
            <th><FormattedMessage id="app.interest" defaultMessage="Interest" /></th>
            <th><FormattedMessage id="app.interestRate" defaultMessage="Interest rate" /></th>
            <th><FormattedMessage id="app.balance" defaultMessage="Balance" /></th>
          </tr>
        </thead>
        <tbody>
          {pagos.map((pago, index) => (
            <tr key={index}>
              <td>{pago.fecha}</td>
              <td>${pago.cantidad}</td>
              <td>${pago.interes}</td>
              <td>{pago.porcentaje_interes}%</td>
              <td>${pago.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistorialPagos;