import { Footer } from "./footer";
import { Header } from "./header";
import "./landing.css"
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Landing() {   
    const nav_links = [
        { name: "Soluciones", url: "soluciones"},
        { name: "Nosotros", url: "nosotros"},
        { name: "Recursos", url: "recursos"},
    ]; 
    return (
        <>
            <Header nav_links={nav_links}></Header>
            <section className="landing-top">
                <Container className="container-md ">
                    <Row>
                        <Col className="me-4">
                            <Row>
                                <h1>Administra tus préstamos sin esfuerzo</h1>
                                <p>Olvídate de las hojas de cálculo, y dile hola a una plataforma que administre tus préstamos en un solo lugar</p>
                            </Row>
                            <Link to="/signup" className="btn buttom-empieza-landing buttom-general">Empieza ahora</Link>
                        </Col>
                        <Col className="ms-4">
                            <img src="/Imagen_landing_1.png" alt="imagen_principal" />
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="seccion-medio">
                <Container className="container-md container-medio">
                    <Row>
                        <Col className="me-4">
                            <Row>
                                <h2>Manejador de préstamos</h2>
                                <p>Toma el control de tus finanzas, y administra siesfuerzo  toda la infomación de tus deudores</p>
                            </Row>
                            <Link to="/signup" className="btn buttom-media-landing buttom-general">Ir a dashboard</Link>
                        </Col>
                        <Col className="ms-4">
                            <img src="/Imagen3.png" alt="Imagen_media" />
                        </Col>
                    </Row>
                </Container>
            </section>
            <Footer></Footer>
        </>
    );

}