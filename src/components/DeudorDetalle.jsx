import { setSeconds } from 'date-fns';
import  { React, useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Image } from 'react-bootstrap';
import './styles/DeudorDetalle.css';

export default function DeudorDetalle() {
    const [deudor, setDeudor] = useState({
        nombre: 'Armando Casas',
        tipoDocumento: 'C.C.',
        numeroDocumento: '1110450340',
        deudaTotal: 99000, //TODO debería ser un dato calculado cuando hagamos backend
        puntuacion: 8.5,
        situacionLaboral: 'Empleado', //Puede ser: Empleado, Independiente, Desempleado, Pensionado.
      });

    return (<Container>
        <Row className="align-items-center">
            <Col>
                <Image src='./2148859448.jpg' roundedCircle width={200} height={200} className="mb-3" alt='imgperfil' />
            </Col>
            <Col >
                <div>{deudor.nombre}</div>
                <div>{deudor.tipoDocumento+' '+deudor.numeroDocumento}</div>
            </Col>
            <Col>
                <Row>
                    <Col md={1}><i class="bi bi-currency-dollar"></i></Col>
                    <Col><div>Deuda total: {deudor.deudaTotal} </div></Col>   
                </Row>
                <Row>
                    <Col md={1}><i class="bi bi-star"></i></Col>
                    <Col><div>Puntuación: {deudor.puntuacion} </div></Col>   
                </Row>
                <Row>
                    <Col md={1}><i class="bi bi-briefcase"></i></Col>
                    <Col> <span>Situación Laboral: </span> <span className='situacionLaboral'>{deudor.situacionLaboral} </span></Col>   
                </Row>
                
            </Col>
            <Col className="d-flex flex-column align-items-center">
                <Button class="rounded-pill" className = "btn-upload">
                    <i class="bi bi-upload"></i>
                </Button>
                <p>Ver archivos del deudor</p>
            </Col>
            <Col>
                <Button class="rounded-pill">
                    <i class="bi bi-pencil-square"></i>
                </Button>
            </Col>
        </Row>
    </Container>);
};