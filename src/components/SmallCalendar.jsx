import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';

const SmallCalendar = ({date}) => {
  const [startDate, setStartDate] = useState(date);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-auto">
          <h5>Selecciona una fecha:</h5>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            inline
          />
        </div>
      </div>
    </div>
  );
};

export default SmallCalendar;
