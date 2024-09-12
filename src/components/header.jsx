import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Header(font) {

    const nav_links = [{
        name: "Prest",
        url: "/",
    },
    {
        name: "Soluciones",
        url: "/soluciones",
    },
    {
        name: "Nosotros",
        url: "/nosotros",
    },
    {
        name: "Recursos",
        url: "/Recursos",

    }, {
        name: "Entra",
        url: "/login"
    },
    {
        name: "Empieza ahora",
        url: "/register"
    }
    ]
    return (
        <section>

            <nav className="nav nav-pills flex-column flex-sm-row">
                {
                    nav_links.map((link, index) => {
                        return (
                            <a key={index} class="flex-sm-fill text-sm-center nav-link" href={link.url}>{link.name}</a>
                        )
                    })
                }
                <a className="navbar-brand" href="/home">
                    <img src="C:\Users\jorgi\Desktop\Uniandes\WEB\ISIS3710_202420_S2_E10_Front\src\img\Logo.png" alt="Logo" width="30" height="24" className="d-inline-block align-text-top" />
                </a>


            </nav>
        </section>
    );
}