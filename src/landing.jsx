import { Footer } from "./components/footer";
import { Header } from "./components/header";
import "./landing.css"
import { Col,Container, Row} from "react-bootstrap";

export function Landing(){
   return (
    <>
        <Header></Header>
        <section className="landing-top">
            <Container className="container-md ">
                <Row>
                    <Col className="me-4">
                        <Row>
                            <h1>Administra tus préstamos sin esfuerzo</h1>
                            <p>Olvídate de las hojas de cálculo, y dile hola a una plataforma que administre tus préstamos en un solo lugar</p>
                        </Row>
                        <a href="/registro" className="btn buttom-empieza-landing buttom-general">Empieza ahora</a>
                    </Col>
                    <Col className="ms-4">
                        <img src="/Imagen_landing_1.png" alt="imagen_principal"/>
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
                        <a href="/registro" className="btn buttom-media-landing buttom-general">Ir a dashboard</a>
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