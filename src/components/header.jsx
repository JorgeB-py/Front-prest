import React from "react";
import "./header.css";


export default function Header() {
    return (
        <header>
        <nav className="navigator_bar_index">
            <ul>
            <li>
                <a href="/">Home</a>
            </li>
            <li>
                <a href="/about">About</a>
            </li>
            </ul>
        </nav>
        </header>
    );
}