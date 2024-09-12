// src/components/DeudorApp.js
import React from 'react';
import DeudorInfo from './deudorInfo';
import HistorialPagos from './historialpagos';

const DeudorApp = () => { 
  const deudorData = {
    nombre: 'Juan Pérez',
    fechaVencimiento: '2024-09-30',
    balance: 5000,
    fechaPago: '2024-09-10',
  };

  const historialPagos = [
    { fecha: '2024-08-15', cantidad: 500, interes: 50, principal: 450, balance: 4550 },
    { fecha: '2024-07-15', cantidad: 500, interes: 55, principal: 445, balance: 5000 },
  ];

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Información de Deuda</h1>
      <DeudorInfo deudor={deudorData} />

      <h2 className="mt-5">Historial de Pagos</h2>
      <HistorialPagos pagos={historialPagos} />
    </div>
  );
};

export default DeudorApp;
