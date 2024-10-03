import { Container, Row, Col, Modal, Form, Button } from 'react-bootstrap';
import './styles/Pasarela.css';
import { Header } from './header';
import { Footer } from './footer';
import  { React, useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from "react-router-dom";


export default function Pasarela() {

    const [showModalCard, setShowModalCard] = useState(false);
    const [showModalNequi, setShowModalNequi] = useState(false);
    const [showModalPSE, setShowModalPSE] = useState(false);
    const [nombreDeudor, setNombreDeudor] = useState("Pedro");
    const [nombreDeuda, setNombreDeuda] = useState("Carro");
    const [paymentData,setPaymentData] = useState(0)
    const [messageErrorModal,setMessageErrorModal] =useState("")


    const mesesNumeros = [1,2,3,4,5,6,7,8,9,10,11,12];
    const aniosNumeros = [2024,2025,2026,2027,2028,2029,2030,2031,2032,2033,2034];
    const navigate = useNavigate();

    // Links de navegación
    const nav_links = [
        { name: <FormattedMessage id="app.MyCredits"/>, url: "/creditos" },
    ];

    useEffect(()=>{
        // fetch("https://my.api.mockaroo.com/hhuu_payment.json?key=70f6caa0")
        // .then((response) => response.json())
        // .then((data) => {
        //     setNombreDeudor(data.nombreDeudor);
        //     setNombreDeuda(data.deudaNombre);
        // })
    },[]);
    
    function validateForm(type){
        if (paymentData.principal+paymentData.interest===0){
            setMessageErrorModal([<Form.Text className="text-danger"><FormattedMessage id="app.TodosLosCampos" defaultMessage="Todos los campos no están completos" /><br/></Form.Text>])
            return false;
        }
        for (let i in paymentData){
            if (i==="interest" || i==="principal")continue;
            if (paymentData[i]==="" || paymentData[i]===0){
                setMessageErrorModal([<Form.Text className="text-danger"><FormattedMessage id="app.TodosLosCampos" defaultMessage="Todos los campos no están completos" /><br/></Form.Text>])
                return false;
            }
        }
        const errorsArray = []
        if (type==="card"){
            if (paymentData.ccv.length!==3){
                errorsArray.push(<Form.Text className="text-danger"><FormattedMessage id="app.ELCVV" defaultMessage="El ccv debe tener 3 digitos" /><br/></Form.Text>)
            }
            if (paymentData.cardNumber.length<15 || paymentData.cardNumber.length>16 ){
                errorsArray.push(<Form.Text className="text-danger"><FormattedMessage id="app.LaTarjeta" defaultMessage="La tarjeta de credito debe tener entre 15 o 16 digitos" /><br/></Form.Text>)
            }
        }else if (type==="nequi"){
            if(paymentData.phoneNumber.length!==10){
                errorsArray.push(<Form.Text className="text-danger"><FormattedMessage id="app.ELnumero" defaultMessage="El numero telefónico debe tener 10 digitos" /><br/></Form.Text>)
            }
        }else if (type==="pse"){
            if(paymentData.phoneNumber.length!==10){
                errorsArray.push(<Form.Text className="text-danger"><FormattedMessage id="app.ELnumero" defaultMessage="El numero telefónico debe tener 10 digitos" /><br/></Form.Text>)
            }
            if (paymentData.id<6 || paymentData.id>9){
                errorsArray.push(<Form.Text className="text-danger"><FormattedMessage id="app.ELID" defaultMessage="El ID debe tener entre 6-9 digitos" /><br/></Form.Text>)
            }
        }
        setMessageErrorModal(errorsArray);
        if (errorsArray.length===0){
            return true;
        }
        return false;
        

    }
    return(<div>
        <Header nav_links={nav_links} logged={true} usuario={'Jorge'} />
        <Container>
            <Row >
                <Col>
                <div className="lock-circle">
                    <i class="bi bi-lock"></i>
                </div>
                </Col>
        <Row style={{'margin-bottom':"30px"}}>
            <Col>
            <span className='como-pagar'>
                <FormattedMessage id="paserela.elige" values={{ nombreDeudor: nombreDeudor, nombreDeuda: nombreDeuda}} />
            </span>
            </Col>
        </Row>
        <Row style={{'margin-bottom':"30px"}}>
            <Col>
            <span className='pago-seguro'><FormattedMessage id="pasarela.secure"/></span>
            </Col>
        </Row>
        <Row>
            <Col>
            <Container className='custom-container'>
                <Row className="align-items-center">
                    <Col>
                        <span className='tipo-pago'><FormattedMessage id="pasarela.card"/></span>
                        <img src="/visa.png" alt="visa" width="50" height="50" className="img-fluid" />
                        <img src="/mastercard.png" alt="mastercard" width="50" height="50" className="img-fluid" />
                    </Col>
                    <Col md = {1} className="arrow-right-col" onClick={() => {
                        setShowModalCard(true);
                        setPaymentData({interest:0,principal:0,cardNumber:0,dueMonth:"",dueYear:"",ccv:0});
                        }}>
                        <i style = {{"font-size":"30px", "cursor": "pointer"}} class="bi bi-arrow-right"></i>
                    </Col>
                </Row>
            </Container>
            </Col>
        </Row>
        <Row>
            <Col>
            <Container className='custom-container'>
                <Row>
                    <Col>
                        <span className='tipo-pago'>Nequi</span>
                        <img src="/nequi.jpg" alt="nequi" width="50" height="50" className="img-fluid" />
                    </Col>
                    <Col md={1} className="arrow-right-col" onClick={() => {
                        setShowModalNequi(true)
                        setPaymentData({interest:0,principal:0,phoneNumber:0});
                        }}>
                        <i style = {{"font-size":"30px", "cursor": "pointer"}} class="bi bi-arrow-right"></i>
                    </Col>
                </Row>
            </Container>
            </Col>
        </Row>
        <Row className='row-bottom-margin'>
            <Col>
            <Container className='custom-container'>
                <Row>
                    <Col>
                        <span className='tipo-pago'>PSE</span>
                        <img src="/pse.png" alt="pse" width="45" height="45" className="img-fluid" style={{"margin-left":"10px"}}/>
                    </Col>
                    <Col md={1} className="arrow-right-col" onClick={() => {
                        setShowModalPSE(true);
                        setPaymentData({interest:0,principal:0,fullName:"",phoneNumber:0,id:0,});
                        }}>
                        <i style = {{"font-size":"30px", "cursor": "pointer"}} class="bi bi-arrow-right"></i>
                    </Col>
                </Row>
            </Container>
            </Col>
        </Row>

        </Row>
        </Container>
        <Footer />


        {/* TODO states*/}
        <Modal show={showModalCard} onHide={() => {setShowModalCard(false);setMessageErrorModal([])}}>
            <Modal.Header closeButton style={{ borderBottom: 'none' }}>
                <Modal.Title className="TWK-titulo-modal"><FormattedMessage id="pasarela.CardPayment" defaultMessage="Card Payment" /></Modal.Title> {/* TODO traducir */}
            </Modal.Header>
            <Modal.Body>
                <Container className='mt-0'>
                    <Form>
                        <Row className='mt-0'>
                        <Col>
                            <Form.Label><FormattedMessage id="pasarela.Interest" defaultMessage="Interest" /></Form.Label> {/*TODO traducir*/}
                            <Form.Control
                            type="number"
                            value={paymentData.interest}
                            onChange={(e)=>{
                                let value = Number(e.target.value)
                                if (isNaN(value))value=0;
                                setPaymentData({...paymentData,interest:value})}
                            }
                            /> 
                        </Col>
                        
                        </Row>
                        <Row className='mt-0'>
                        <Col>
                            <Form.Label>Principal</Form.Label> {/*TODO traducir*/}
                            <Form.Control
                            type="number"
                            value={paymentData.principal}
                            onChange={(e)=>{
                                let value = Number(e.target.value)
                                if (isNaN(value))value=0;
                                setPaymentData({...paymentData,principal:value})}
                            }
                            /> 
                        </Col>
                        
                        </Row>
                        <Row className='mt-0'>
                        <Col>
                            <Form.Label><FormattedMessage id="pasarela.CardNumber" defaultMessage="Card number" /></Form.Label> {/*TODO traducir*/}
                            <Form.Control
                            type="number" 
                            value={paymentData?.cardNumber}
                            onChange={(e)=>setPaymentData({...paymentData,  cardNumber:e.target.value})}
                            /> 
                        </Col>
                        
                        </Row>
                        <Row>
                            <Form.Label><FormattedMessage id="pasarela.FechaVencimiento" defaultMessage="Due date" /></Form.Label> {/*TODO traducir*/}
                            <Col md = {6}>
                                <Form.Select value={paymentData?.dueMonth || "non-sel"} onChange={(e)=>setPaymentData({...paymentData,dueMonth:e.target.value})}>
                                    <option><FormattedMessage id="pasarela.SelectMonth" defaultMessage="Select month" value="non-sel"/></option>
                                    {
                                        mesesNumeros.map((mes) => {
                                            return <option value={mes}>{mes}</option>
                                        })
                                    }
                                </Form.Select>
                            </Col>
                            <Col md = {6}>
                                <Form.Select value={paymentData?.dueYear || "non-sel"} onChange={(e)=>setPaymentData({...paymentData,dueYear:e.target.value})}>
                                    <option><FormattedMessage id="pasarela.SelectYear" defaultMessage="Select year" /></option>
                                    {
                                        aniosNumeros.map((anio) => {
                                            return <option value={anio}>{anio}</option>
                                        })
                                    }
                                </Form.Select>
                            </Col>
                            <Row>
                                <Col>
                                <Form.Label>CVV</Form.Label> {/*TODO traducir*/}
                                <Form.Control
                                type="number"
                                value={paymentData.ccv}
                                onChange={(e)=>setPaymentData({...paymentData,ccv:e.target.value})}
                                /> 
                                </Col>
                            </Row>
                            <Row>
                                <Col>{messageErrorModal}</Col> {/*TODO traducir*/}
                            </Row>
                        </Row>
                    </Form>
                </Container>
            </Modal.Body>
            <Modal.Footer style={{ borderTop: 'none' }} >
                <Button variant="secondary" onClick={() => setShowModalCard(false)}>
                    <FormattedMessage id="app.cancel" defaultMessage="Cancel" />
                </Button>
                <Button variant="primary" onClick={ ()=>{if(validateForm("card"))navigate('/visualizar-transacciones/1')}}> {/*TODO VALIDACIÓN */}
                    <FormattedMessage id="app.save" defaultMessage="Save" />
                </Button>
            </Modal.Footer>
        </Modal>


        <Modal show={showModalNequi} onHide={() => {setShowModalNequi(false);setMessageErrorModal([])}}>
            <Modal.Header closeButton style={{ borderBottom: 'none' }}>
                <Modal.Title className="TWK-titulo-modal"><FormattedMessage id="pasarela.NequiPayment" defaultMessage="Nequi Payment" /></Modal.Title> {/* TODO traducir */}
            </Modal.Header>
            <Modal.Body>
                <Container className='mt-0'>
                    <Form>
                        <Row className='mt-0'>
                        <Col>
                            <Form.Label><FormattedMessage id="pasarela.Interest" defaultMessage="Interest" /></Form.Label> {/*TODO traducir*/}
                            <Form.Control
                            type="number"
                            value={paymentData.interest}
                            onChange={(e)=>{
                                let value = Number(e.target.value)
                                if (isNaN(value))value=0;
                                setPaymentData({...paymentData,interest:value})}
                            }
                            /> 
                        </Col>
                        
                        </Row>
                        <Row className='mt-0'>
                        <Col>
                            <Form.Label><FormattedMessage id="pasarela.Principal" defaultMessage="Principal" /></Form.Label> {/*TODO traducir*/}
                            <Form.Control
                            type="number" 
                            value={paymentData.principal}
                            onChange={(e)=>{
                                let value = Number(e.target.value)
                                if (isNaN(value))value=0;
                                setPaymentData({...paymentData,principal:value})}
                            }
                            /> 
                        </Col>
                        
                        </Row>
                        <Row className='mt-0'>
                        <Col>
                            <Form.Label><FormattedMessage id="pasarela.PhoneNumber" defaultMessage="Phone number" /></Form.Label> {/*TODO traducir*/}
                            <Form.Control
                            type="text" 
                            value={paymentData.phoneNumber}
                            onChange={(e)=>setPaymentData({...paymentData,phoneNumber:e.target.value})}
                            /> 
                        </Col>
                        </Row>
                        <Row>
                            <Col>{messageErrorModal}</Col> {/*TODO traducir*/}
                        </Row>
                    </Form>
                </Container>
            </Modal.Body>
            <Modal.Footer style={{ borderTop: 'none' }} >
                <Button variant="secondary" onClick={() => setShowModalNequi(false)}>
                    <FormattedMessage id="app.cancel" defaultMessage="Cancel" />
                </Button>
                <Button variant="primary" onClick={ ()=>{if(validateForm("nequi"))navigate('/visualizar-transacciones/1')}}> {/*TODO VALIDACIÓN */}
                    <FormattedMessage id="app.save" defaultMessage="Save" />
                </Button>
            </Modal.Footer>
        </Modal>


        <Modal show={showModalPSE} onHide={() => {setShowModalPSE(false);setMessageErrorModal([])}}>
            <Modal.Header closeButton style={{ borderBottom: 'none' }}>
                <Modal.Title className="TWK-titulo-modal"><FormattedMessage id="pasarela.PSEPayment" defaultMessage="PSE Payment" /></Modal.Title> {/* TODO traducir */}
            </Modal.Header>
            <Modal.Body>
                <Container className='mt-0'>
                    <Form>
                        <Row className='mt-0'>
                        <Col>
                            <Form.Label><FormattedMessage id="pasarela.Interest" defaultMessage="Interest" /></Form.Label> {/*TODO traducir*/}
                            <Form.Control
                            type="number" 
                            value={paymentData.interest}
                            onChange={(e)=>{
                                let value = Number(e.target.value)
                                if (isNaN(value))value=0;
                                setPaymentData({...paymentData,interest:value})}
                            }
                            /> 
                        </Col>
                        
                        </Row>
                        <Row className='mt-0'>
                        <Col>
                            <Form.Label><FormattedMessage id="pasarela.Principal" defaultMessage="Principal" /></Form.Label> {/*TODO traducir*/}
                            <Form.Control
                            type="number"
                            value={paymentData.principal}
                            onChange={(e)=>{
                                let value = Number(e.target.value)
                                if (isNaN(value))value=0;
                                setPaymentData({...paymentData,principal:value})}
                            }
                            /> 
                        </Col>
                        
                        </Row>
                        <Row className='mt-0'>
                            <Col>
                                <Form.Label><FormattedMessage id="pasarela.FullName" defaultMessage="Full Name" /></Form.Label> {/*TODO traducir*/}
                                <Form.Control
                                type="text"
                                value={paymentData.fullName}
                                onChange={(e)=>setPaymentData({...paymentData,fullName:e.target.value})}
                                /> 
                            </Col>
                        </Row>
                        <Row className='mt-0'>
                            <Col>
                                <Form.Label><FormattedMessage id="pasarela.PhoneNumber" defaultMessage="Phone number" /></Form.Label> {/*TODO traducir*/}
                                <Form.Control
                                type="text" 
                                value={paymentData.phoneNumber}
                                onChange={(e)=>setPaymentData({...paymentData,phoneNumber:e.target.value})}
                                /> 
                            </Col>
                            <Col>
                                <Form.Label><FormattedMessage id="pasarela.ID" defaultMessage="ID" /></Form.Label> {/*TODO traducir*/}
                                <Form.Control
                                type="number"
                                value={paymentData.id}
                                onChange={(e)=>setPaymentData({...paymentData,id:e.target.value})}
                                /> 
                            </Col>
                        <Row>
                            <Col>{messageErrorModal}</Col> {/*TODO traducir*/}
                        </Row>
                        </Row>
                    </Form>
                </Container>
            </Modal.Body>
            <Modal.Footer style={{ borderTop: 'none' }} >
                <Button variant="secondary" onClick={() => setShowModalPSE(false)}>
                    <FormattedMessage id="app.cancel" defaultMessage="Cancel" />
                </Button>
                <Button variant="primary" onClick={ ()=>{if(validateForm("pse"))navigate('/visualizar-transacciones/1')}}> {/*TODO VALIDACIÓN */}
                    <FormattedMessage id="app.save" defaultMessage="Save"/>
                </Button>
            </Modal.Footer>
        </Modal>
        
    </div>

    );

}