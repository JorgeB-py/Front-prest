import { setSeconds } from 'date-fns';
import  { React, useState, useEffect } from 'react';
import { Container, Row, Col, Image, Modal, Form, Button } from 'react-bootstrap';
import './styles/DeudorDetalle.css';
import { Header } from './header';
import { Footer } from './footer';
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from 'react-intl';

export default function DeudorDetalle() {

    const navigate = useNavigate();

    // Links de navegación
    const nav_links = [
        { name: <FormattedMessage id="app.Deudores" defaultMessage="Deudores" />, url: "/deudores" },
        { name: <FormattedMessage id="app.MiDinero" defaultMessage="My Money" />, url: "/midinero" },
    ];

    const [deudor, setDeudor] = useState({
        nombre: 'Armando Casas',
        tipoDocumento: 'C.C.',
        numeroDocumento: '1110450340',
        deudaTotal: 99000, //TODO debería ser un dato calculado cuando hagamos backend
        puntuacion: 8.5,
        situacionLaboral: 'Empleado', //Puede ser: Empleado o Desempleado
        edad:24,
        email:"hola@gmail.com",
        telefono:"3143807270"
      });

    const [deudorEdited,setDeudorEdited] = useState(0);

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

    const [showEditModal,setShowEditModal] = useState(false);
      useEffect(()=>{

        fetch("https://my.api.mockaroo.com/detalledeudor.json?key=eecfef40")
        .then((response) => response.json())
        .then((data) => {setDeudor(data)});

        fetch("https://my.api.mockaroo.com/deudas.json?key=eecfef40")
        .then((response1) => response1.json())
        .then((data1) => {setDeudas(data1)});
        }

      ,[]);

    


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
                    <Col><div><FormattedMessage id="app.TotalLoan" defaultMessage="Total Loan" />: {deudor.deudaTotal} </div></Col>   
                </Row>
                <Row>
                    <Col md={1}><i class="bi bi-star"></i></Col>
                    <Col><div><FormattedMessage id="app.Score" defaultMessage="Score" />: {deudor.puntuacion} </div></Col>   
                </Row>
                <Row>
                    <Col md={1}><i class="bi bi-briefcase"></i></Col>
                    <Col> <span className="Big font"><FormattedMessage id="app.WorkStatus" defaultMessage="Work Status" />: </span> <span className='situacionLaboral'>{deudor.situacionLaboral==="Empleado" ? <FormattedMessage id="app.Empleado" defaultMessage="Empleado" /> :<FormattedMessage id="app.Desempleado" defaultMessage="Desempleado" />} </span></Col>   
                </Row>
                
            </Col>
            <Col className='info-rapida px-0'>
                <Row>
                    <Col md={1}><i class="bi bi-person"></i></Col>
                    <Col><div><FormattedMessage id="app.Age" defaultMessage="" />: {deudor.edad} </div></Col>   
                </Row>
                <Row>
                    <Col md={1}><i class="bi bi-telephone"></i></Col>
                    <Col><div><FormattedMessage id="app.PhoneNumber" defaultMessage="Phone number" />: {deudor.telefono} </div></Col>   
                </Row>
                <Row>
                    <Col md={1}><i class="bi bi-envelope"></i></Col>
                    <Col><div><FormattedMessage id="app.Email" defaultMessage="Email" />: {deudor.email} </div></Col>   
                </Row>
                
            </Col>
            <Col className="d-flex flex-column align-items-center align-self-center">
                <span className="rounded-pill">
                    <i className="bi bi-pencil-square edit-button" style={{ fontSize: '1.5rem',cursor:'pointer' }} onClick={()=>{setDeudorEdited({...deudor});setShowEditModal(true)}}></i>
                </span>
                <p>&nbsp;</p> {/* Placeholder to maintain the same height */}
            </Col>
        </Row>
    </Container>
    

    <Container className="custom-container-2">
        <span className="creditos"><FormattedMessage id="app.Credits" defaultMessage="Credits" /></span>
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
                
            <span className="eye-button" onClick={() => navigate('/deudorApp')}>
                <i className="bi bi-eye"></i>
            </span>
            </Col> 
        </Row>
        </Container>
        })
        }
    </Container>
    <div className="text-center">
      <Button className="btn buttom-general" onClick={() => navigate('/crearPrestamo')}>
        <FormattedMessage id="app.crearPrestamoBoton" />
      </Button>
    </div>
    <Footer />
    <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title><FormattedMessage id="app.editInfo" defaultMessage="Edit Information" /></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label><FormattedMessage id="app.name" defaultMessage="" /></Form.Label>
              <Form.Control
                type="text"
                defaultValue={deudor.nombre}
                onChange={(e)=>setDeudorEdited({...deudorEdited,nombre:e.target.value})}
              />
              <Form.Label><FormattedMessage id="app.idNumber" defaultMessage="" /></Form.Label>
              <Form.Control
                type="text"
                defaultValue={deudor.numeroDocumento}
                onChange={(e)=>setDeudorEdited({...deudorEdited,numeroDocumento:e.target.value})}
              />
              <Form.Label><FormattedMessage id="app.WorkStatus" defaultMessage="" /></Form.Label>
              <Form.Control
                type="text"
                defaultValue={deudor.situacionLaboral}
                onChange={(e)=>setDeudorEdited({...deudorEdited,situacionLaboral:e.target.value})}
              />
              <Form.Label><FormattedMessage id="app.Age" defaultMessage="" /></Form.Label>
              <Form.Control
                type="text"
                defaultValue={deudor.edad}
                onChange={(e)=>setDeudorEdited({...deudorEdited,edad:e.target.value})}
              />
              <Form.Label><FormattedMessage id="pasarela.PhoneNumber" defaultMessage="" /></Form.Label>
              <Form.Control
                type="text"
                defaultValue={deudor.telefono}
                onChange={(e)=>setDeudorEdited({...deudorEdited,telefono:e.target.value})}
              />
              <Form.Label><FormattedMessage id="app.email" defaultMessage="" /></Form.Label>
              <Form.Control
                type="text"
                defaultValue={deudor.email}
                onChange={(e)=>setDeudorEdited({...deudorEdited,email:e.target.value})}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() =>setShowEditModal(false)}>
            <FormattedMessage id="app.cancel" defaultMessage="Cancel" />
          </Button>
          <Button variant="primary" onClick={() =>{
            setDeudor({...deudorEdited})
            setShowEditModal(false)
          }}>
            <FormattedMessage id="app.save" defaultMessage="Save" />
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    
);

    
};