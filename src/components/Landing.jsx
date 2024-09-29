import { Footer } from "./footer";
import { Header } from "./header";
import "./styles/landing.css";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Landing() {
    return (
        <>
            <Row>
                <Header></Header>

                <Container fluid className="landing-top px-5">
                    <Row className="align-items-center justify-content-center">
                        <Col md={6} className="text-center">
                            <h1>Administra tus préstamos sin esfuerzo</h1>
                            <p>Olvídate de las hojas de cálculo, y dile hola a una plataforma que administre tus préstamos en un solo lugar</p>
                            <Link to="/signup" className="btn button-empieza-landing button-general">Empieza ahora</Link>
                        </Col>
                        <Col md={4} className="text-center">
                            <img src="/Imagen_landing_1.png" alt="imagen_principal" className="img-fluid" />
                        </Col>
                    </Row>
                </Container>

                <Container className="container-medio my-5">
                    <Row className="align-items-center justify-content-center seccion-medio">
                        <Col md={6} className="text-center">
                            <h2>Manejador de préstamos</h2>
                            <p>Toma el control de tus finanzas, y administra sin esfuerzo toda la información de tus deudores</p>
                            <Link to="/signup" className="btn button-media-landing button-general">Ir a dashboard</Link>
                        </Col>
                        <Col md={6} className="text-center">
                            <img src="/Imagen3.png" alt="Imagen_media" style={{width: '40rem', height:'40rem'}}/>
                        </Col>
                    </Row>
                </Container>

                <Container className="my-5">
                    <h1 style={{ textAlign: 'center', paddingBottom:'1rem', fontWeight:'bold', fontSize:'3rem' }}>¿Por qué escoger prest?</h1>
                    <Row className="justify-content-center">
                        {/* Primer contenedor */}
                        <Col md={5} className="d-flex justify-content-center">
                            <Container className="container-medio" style={{ backgroundColor: '#6495ED', borderRadius: '4rem', color: 'white' }}>
                                <Row className="align-items-center justify-content-center seccion-medio">
                                    <Col className="text-center">
                                        <h2 style={{ color: 'white' }}>Con <span style={{ fontWeight: 'bold' }}>prest</span> tienes el control de tus finanzas</h2>
                                        <p>Dile adiós a las hojas de cálculo sin orden, ahora tendrás control sobre lo que prestas</p>
                                        <Link to="/signup" className="btn button-media-landing button-general" style={{ backgroundColor: 'white', color: 'black' }}>Ir a dashboard</Link>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>

                        {/* Segundo contenedor */}
                        <Col md={5} className="d-flex justify-content-center">
                            <Container className="container-medio" style={{ backgroundColor: '#1E3A8A', borderRadius: '4rem', color: 'white' }}>
                                <Row className="align-items-center justify-content-center seccion-medio">
                                    <Col className="text-center">
                                        <h2 style={{ color: 'white' }}>Todo en un solo <span style={{ fontWeight: 'bold' }}>lugar</span> y sin esfuerzo</h2>
                                        <p>Dile adiós a las hojas de cálculo sin orden, ahora tendrás control sobre lo que prestas</p>
                                        <Link to="/signup" className="btn button-media-landing button-general" style={{ backgroundColor: 'white', color: 'black' }}>Ir a dashboard</Link>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                </Container>
                <Container className="my-5">
                    <h1 style={{ textAlign: 'center', paddingBottom:'1rem', fontWeight:'bold', fontSize:'3rem' }}>Historias de clientes</h1>
                    <Row className="justify-content-center">
                        {/* Primer contenedor */}
                        <Col md={5} className="d-flex justify-content-center">
                            <Container className="container-abajo" style={{borderRadius: '4rem', color: 'white' }}>
                                <Row className="align-items-center justify-content-center seccion-medio">
                                    <Col className="text-center">
                                        <img src="https://s3-alpha-sig.figma.com/img/9a56/46a5/2d74e667237a727f1854dd6b03572106?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fgTj2RLYlR6ASfbVYxgqk2Z9ZjYMvWo7LpVPfl6CdgfuMmXkmwVcQOfHVfOkiglCwC3uzAT2Rd3fYY6OObOnbB95PdFdP0kgPz5kRiGWgPtxYuoHI-A9sHH5Luted~1pCI617oih8kfyXHXiabkC~Jz3tJZoUY~T8T-GIs3Fkj59gJrlvcZEzFuIwdPDag43M208QI4eMdXzEU~ynOsObDJ2AIwYgilo80NNeET~Fglkf7PWnJLQcZpLY9nPUcy2vXt-qWWAuSrlDf3ev4ikB4v0qsRa3QUdfluK-3tMe7n9OgyscMIYvl68mAH~VhnpiN3IWgdxpiDdTjZ3woyN5w__" alt="Imagen_media" />
                                        <h4 style={{paddingTop:'1rem', color:'black'}}>Jeremías Valencia, 36 años, Fresno Tolima</h4>
                                        <p style={{color:'black', fontSize:'1rem', padding:'0'}}>Dile adiós a las hojas de cálculo sin orden, ahora tendrás control sobre lo que prestas</p>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>

                        {/* Segundo contenedor */}
                        <Col md={5} className="d-flex justify-content-center">
                            <Container className="container-abajo">
                                <Row className="align-items-center justify-content-center seccion-medio">
                                    <Col className="text-center">
                                        <img className='img-flex' src="https://s3-alpha-sig.figma.com/img/b515/0540/f46956e8e99cf771df40c450a3a55cf9?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=k6MwjEByYivelFP-NKyR33shBFUlRbtk5Hb2rKsdrCMOQqxItJINeghna71EQPfVRL50-HmJ~7ydoTDp1rH3H0dYfhbz27gR~VkjIeoArS2Ex3UZYGjMQhcgdgg5gfJDIOKlZ4qeu9H-pRaO1RQ4Ly0L6DoWxGDYgi3MifhtPp-CxGw8TQ08vzjENK0cozzzIWVwUylscLnvlizEfV9yKyCJXKhCdmkQTy9YUTTQP7uryFkBZOX5P6o4LwvqsAVKryHfZRKPpusV6dz7KBRltk0bxl7yYO1m2DDReqNXYcBqV1hpOOOHDe7gyZAItljLhHMWJyRHmjbfqyczQT~-CA__" alt="Imagen_media" />
                                        <h4 style={{ paddingTop:'1rem'}}>Juan Martínez, 38 años, Bogotá DC.</h4>
                                        <p style={{color:'black', fontSize:'1rem',padding:'0'}}>Juan Martínez se quedó sin trabajo, ahora es un “gota a gota” no usurero.</p>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                </Container>


                <Footer></Footer>
            </Row>
        </>
    );
}
