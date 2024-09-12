import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Header() {

    const nav_links=[{
        name:"Prest",
        url:"/",
    },
    {
        name:"Soluciones",
        url:"/soluciones",
    },
    {
        name:"Nosotros",
        url:"/nosotros",
    },
    {
        name:"Recursos",
        url:"/Recursos",

    },{
        name:"Entra",
        url:"/login"
    },
    {
        name:"Empieza ahora",
        url:"/register"
    }
    ]
    return (
        <section className="header_index">
        <nav class="nav nav-pills flex-column flex-sm-row">
            {
                nav_links.map((link,index)=>{
                    return(
                        <a key={index} class="flex-sm-fill text-sm-center nav-link" href={link.url}>{link.name}</a>
                    )
                })
        }
            
            
        </nav>
        </section>
    );
}