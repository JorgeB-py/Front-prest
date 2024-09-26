// src/components/DeudorApp.js
import React from 'react';
import DeudorInfo from './deudorInfo';
import HistorialPagos from './historialpagos';
import { Header } from './header';
import { Footer } from './footer';
import { Container, Col, Row } from 'react-bootstrap';
import SmallCalendar from './SmallCalendar';
import './styles/deudorApp.css';

export default function DeudorApp(){
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

  const nav_links = [
    { name: "Dashboard", url: "dashboard" },
    { name: "Deudores", url: "deudores" },
    { name: "Mi dinero", url: "midinero" },
  ]

  return (
    <>
      <Header nav_links={nav_links} logged={true} usuario={'Jorge'}/>
        <Row>
          <Container>
            <Row>
              <Col className='columna-perfil'>
                <img src="./2148859448.jpg" alt="perfil-img" />
                <DeudorInfo deudor={deudorData}/>
              </Col>
              <Col>
                <Row>
                  <h3>Fecha de pago</h3>
                  <p>{deudorData.fechaPago}</p>
                  <SmallCalendar date={deudorData.fechaPago}/>
                </Row>
              </Col>
            </Row>
          </Container>
          <Container>
            <HistorialPagos pagos={historialPagos}/>
          </Container>
        </Row>
      <Footer/>
    </>
  );
};
