import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Header } from "./header";
import { Footer } from "./footer";
import "./styles/landing.css";

export default function Landing() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <header>
                <Header />
            </header>
            <main className="flex-grow-1">
                <section className="landing-top py-5">
                    <Container>
                        <Row className="align-items-center">
                            <Col lg={6} className="text-center text-lg-start mb-4 mb-lg-0">
                                <h1 className="display-4 fw-bold mb-3">Administra tus préstamos sin esfuerzo</h1>
                                <p className="lead mb-4">Olvídate de las hojas de cálculo, y dile hola a una plataforma que administre tus préstamos en un solo lugar</p>
                                <Button as={Link} to="/signup" variant="primary" className="button-empieza-landing" size="lg">Empieza ahora</Button>
                            </Col>
                            <Col lg={6}>
                                <img src="/Imagen_landing_1.png" alt="Imagen principal" className="img-fluid" />
                            </Col>
                        </Row>
                    </Container>
                </section>

                <section className="py-5">
                    <Container className="my-5 container-medio">
                        <Row className="align-items-center justify-content-center seccion-medio">
                            <Col lg={6} className="text-center text-lg-start mb-4 mb-lg-0">
                                <h2 className="display-5 fw-bold mb-3">Manejador de préstamos</h2>
                                <p className="lead mb-4">Toma el control de tus finanzas, y administra sin esfuerzo toda la información de tus deudores</p>
                                <Button as={Link} to="/signup" variant="light" size="lg" className="button-media-landing">Ingresa</Button>
                            </Col>
                            <Col lg={6} className="text-center">
                                <img src="/Imagen3.png" alt="Imagen media" className="img-fluid" />
                            </Col>
                        </Row>
                    </Container>
                </section>

                <section className="bg-light py-5">
                    <Container>
                        <h2 className="display-5 fw-bold text-center mb-5">¿Por qué escoger prest?</h2>
                        <Row className="g-4">
                            <Col md={6}>
                                <Card className="h-100 carta-izquierda carta text-white rounded-4">
                                    <Card.Body className="d-flex flex-column">
                                        <h3 className="card-title fw-bold mb-3">Con <span className="fw-bolder">prest</span> tienes el control de tus finanzas</h3>
                                        <p className="card-text mb-4">Dile adiós a las hojas de cálculo sin orden, ahora tendrás control sobre lo que prestas</p>
                                        <Button as={Link} to="/signup" variant="light" className="button-media-landing mt-auto align-self-center">Ingresa</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={6}>
                                <Card className="h-100 carta-derecha carta text-white rounded-4">
                                    <Card.Body className="d-flex flex-column">
                                        <h3 className="card-title fw-bold mb-3">Todo en un solo <span className="fw-bolder">lugar</span> y sin esfuerzo</h3>
                                        <p className="card-text mb-4">Dile adiós a las hojas de cálculo sin orden, ahora tendrás control sobre lo que prestas</p>
                                        <Button as={Link} to="/signup" variant="light" className="button-media-landing mt-auto align-self-center">Ingresa</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </section>

                <section className="py-5">
                    <Container>
                        <h2 className="display-5 fw-bold text-center mb-5">Historias de clientes</h2>
                        <Row className="g-4">
                            <Col md={6}>
                                <Card className="h-100 shadow-lg rounded-4">
                                    <Card.Body className="text-center">
                                        <img src="https://s3-alpha-sig.figma.com/img/9a56/46a5/2d74e667237a727f1854dd6b03572106?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fgTj2RLYlR6ASfbVYxgqk2Z9ZjYMvWo7LpVPfl6CdgfuMmXkmwVcQOfHVfOkiglCwC3uzAT2Rd3fYY6OObOnbB95PdFdP0kgPz5kRiGWgPtxYuoHI-A9sHH5Luted~1pCI617oih8kfyXHXiabkC~Jz3tJZoUY~T8T-GIs3Fkj59gJrlvcZEzFuIwdPDag43M208QI4eMdXzEU~ynOsObDJ2AIwYgilo80NNeET~Fglkf7PWnJLQcZpLY9nPUcy2vXt-qWWAuSrlDf3ev4ikB4v0qsRa3QUdfluK-3tMe7n9OgyscMIYvl68mAH~VhnpiN3IWgdxpiDdTjZ3woyN5w__" alt="Jeremías Valencia" className="img-fluid mb-4 rounded-circle" style={{width: '200px', height: '200px', objectFit: 'cover'}} />
                                        <h4 className="mt-3 text-dark">Jeremías Valencia, 36 años, Fresno Tolima</h4>
                                        <p className="text-dark">Dile adiós a las hojas de cálculo sin orden, ahora tendrás control sobre lo que prestas</p>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={6}>
                                <Card className="h-100 shadow-lg rounded-4">
                                    <Card.Body className="text-center">
                                        <img src="https://s3-alpha-sig.figma.com/img/b515/0540/f46956e8e99cf771df40c450a3a55cf9?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=k6MwjEByYivelFP-NKyR33shBFUlRbtk5Hb2rKsdrCMOQqxItJINeghna71EQPfVRL50-HmJ~7ydoTDp1rH3H0dYfhbz27gR~VkjIeoArS2Ex3UZYGjMQhcgdgg5gfJDIOKlZ4qeu9H-pRaO1RQ4Ly0L6DoWxGDYgi3MifhtPp-CxGw8TQ08vzjENK0cozzzIWVwUylscLnvlizEfV9yKyCJXKhCdmkQTy9YUTTQP7uryFkBZOX5P6o4LwvqsAVKryHfZRKPpusV6dz7KBRltk0bxl7yYO1m2DDReqNXYcBqV1hpOOOHDe7gyZAItljLhHMWJyRHmjbfqyczQT~-CA__" alt="Juan Martínez" className="img-fluid mb-4 rounded-circle" style={{width: '200px', height: '200px', objectFit: 'cover'}} />
                                        <h4 className="mt-3 text-dark">Juan Martínez, 38 años, Bogotá DC.</h4>
                                        <p className="text-dark">Juan Martínez se quedó sin trabajo, ahora es un "gota a gota" no usurero.</p>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </main>
            <Footer />
        </div>
    );
}