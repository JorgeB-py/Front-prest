import React from 'react';
import { FormattedMessage } from 'react-intl';

const HistorialPagos = ({ pagos }) => {
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
    </div>
  );
};

export default HistorialPagos;