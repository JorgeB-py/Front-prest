import { setSeconds } from 'date-fns';
import  { React, useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Image } from 'react-bootstrap';
import './styles/DeudorDetalle.css';
import { Header } from './header';
import { Footer } from './footer';
import { useNavigate } from "react-router-dom";

export default function DeudorDetalle() {

    const navigate = useNavigate();

    // Links de navegación
    const nav_links = [
        { name: "Deudores", url: "/deudores" },
        { name: "Mi dinero", url: "/midinero" },
    ];

    const [deudor, setDeudor] = useState({
        nombre: 'Armando Casas',
        tipoDocumento: 'C.C.',
        numeroDocumento: '1110450340',
        deudaTotal: 99000, //TODO debería ser un dato calculado cuando hagamos backend
        puntuacion: 8.5,
        situacionLaboral: 'Empleado', //Puede ser: Empleado, Independiente, Desempleado, Pensionado.
      });


    const [deudas, setDeudas] = useState([{
        id:1,
        nombreDeuda:"Estudios",
        deudaTotal:800000,
        deudaRestante:200000
    },{
        id:2,
        nombreDeuda:"Carro",
        deudaTotal:800000,
        deudaRestante:100000
    },{
        id:3,
        nombreDeuda:"Casa",
        deudaTotal:800000,
        deudaRestante:150000
    },{
        id:4,
        nombreDeuda:"Moto",
        deudaTotal:800000,
        deudaRestante:300000
    }]);


    return (
    <div>
    <Header nav_links={nav_links} logged={true} usuario={'Jorge'} />
    <Container className="custom-container">
        <Row className="align-items-center">
            <Col>
                <Image src='./2148859448.jpg' roundedCircle width={200} height={200} className="mb-3" alt='imgperfil' />
            </Col>
            <Col >
                <h4>{deudor.nombre}</h4>
                <div className='documento'>{deudor.tipoDocumento+' '+deudor.numeroDocumento}</div>
            </Col>
            <Col className='info-rapida px-0'>
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
                    <Col> <span className="Big font">Situación Laboral: </span> <span className='situacionLaboral'>{deudor.situacionLaboral} </span></Col>   
                </Row>
                
            </Col>
                <Col className="d-flex flex-column align-items-center align-self-center">
                <Button className="rounded-pill btn">
                    <i className="bi bi-upload" style={{ fontSize: '1.5rem' }}></i>
                </Button>
                <p className='underline-link'>Ver archivos del deudor</p> {/* This creates extra height */}
            </Col>
            <Col className="d-flex flex-column align-items-center align-self-center">
                <Button className="rounded-pill">
                    <i className="bi bi-pencil-square" style={{ fontSize: '1.5rem' }}></i>
                </Button>
                <p>&nbsp;</p> {/* Placeholder to maintain the same height */}
            </Col>
        </Row>
    </Container>
    

    <Container className="custom-container-2">
        <span className="creditos">Créditos</span>
        {deudas.map((deuda) => 
        {return <Container key={deuda.id} className="progress-container">
        <Row>
            <Col lg={11}>
            <div className="progress-details">
                <span className='info-deuda'>{deuda.nombreDeuda}</span>
                <span className='info-deuda'>{deuda.deudaRestante}</span>
            </div>
            <progress 
                className="custom-progress"
                value={(deuda.deudaTotal - deuda.deudaRestante) / deuda.deudaTotal} 
                max="1"
            ></progress>
            </Col>
            <Col lg={1}>
                
            <button className="eye-button" onClick={() => navigate('/deudorApp')}>
                <i className="bi bi-eye"></i>
            </button>
            </Col> 
        </Row>
        </Container>
        })
        }
    </Container>
    <Footer />
    </div>
    );

    
};