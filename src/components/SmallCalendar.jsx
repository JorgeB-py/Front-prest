import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import './styles/smallCalendar.css';
import { FormattedMessage } from 'react-intl';

const SmallCalendar = ({date_inicial, deudorData}) => {
  const [startDate, setStartDate] = useState(deudorData.fechaPago);

  const setdate = (date) => {
    deudorData.fechaPago = date.toDateString();
    setStartDate(date);
  }
  useEffect(() => {
    setStartDate(date_inicial);
  }, [deudorData]);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-auto">
          <h3 style={{textAlign:'center'}}><FormattedMessage id="app.paymentDate" defaultMessage="Payment date" /></h3>
          <p style={{textAlign:'center'}}>{deudorData.fechaPago}</p>
          <DatePicker
            selected={startDate}
            onChange={(date) => setdate(date)}
            inline
          />
        </div>
      </div>
    </div>
  );
};

export default SmallCalendar;
