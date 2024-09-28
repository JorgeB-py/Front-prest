import React from "react";
import Soluciones from "./Soluciones";
import Nosotros from "./Nosotros";
import Recursos from "./Recursos";
import Signup from "./Signup"
import Login from "./Login"
import Landing from "./Landing";
import { Routes, Route } from "react-router-dom";
import Index from "./Index";
import DeudorApp from "./deudorApp";
import CrearCliente from "./CrearCliente";
import ConsultarCliente from "./consultarCliente";
import ListaCreditos from "./listaCreditos";
import VisualizarTransacciones from "./visualizarTransacciones";

export default function App() {
    const nav_links = [
        { url: "soluciones", component: Soluciones },
        { url: "nosotros", component: Nosotros },
        { url: "recursos", component: Recursos },
        { url: "signup", component: Signup },
        { url: "login", component: Login},
        { url: "/", component: Landing },
        { url:"index", component: Index},
        { url:"deudorApp", component: DeudorApp}, 
        { url:"crearcliente", component: CrearCliente},
        { url:"consultarcliente", component: ConsultarCliente},
        { url: "creditos", component: ListaCreditos }, 
        { url: "visualizar-transacciones/:id", component: VisualizarTransacciones }

    ];
    return (
        <Routes>
            {nav_links.map((link, index) => (
                <Route key={index} path={link.url} element={<link.component />} />
            ))}
        </Routes>
    );
}