import React from "react";
import Soluciones from "./Soluciones";
import Nosotros from "./Nosotros";
import Recursos from "./Recursos";
import Signup from "./Signup"
import Login from "./Login"
import Landing from "./Landing";
import { Routes, Route } from "react-router-dom";
import Index from "./Index";

export default function App() {
    const nav_links = [
        { url: "soluciones", component: Soluciones },
        { url: "nosotros", component: Nosotros },
        { url: "recursos", component: Recursos },
        { url: "signup", component: Signup },
        { url: "login", component: Login},
        { url: "/", component: Landing },
        { url:"index", component: Index}
    ];
    return (
        <Routes>
            {nav_links.map((link, index) => (
                <Route key={index} path={link.url} element={<link.component />} />
            ))}
        </Routes>
    );
}