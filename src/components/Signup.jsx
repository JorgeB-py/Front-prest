import React, { useState } from "react";
import config from "../config";

export default function Signup() {
    const apiurl = config.apiUrl;
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        nombre: "",
        direccion: "",
        telefono: "",
        correo: "",
        foto: "",
        fondosTotales: "",
        saldo: "",
        role: "prestamista"
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const goLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${apiurl}/users/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                window.location.href = "/login";
            } else {
                console.error("Error al registrar el usuario");
            }
        } catch (error) {
            console.error("Error al registrar el usuario", error);
        }
    };

    return (
        <section style={{ backgroundColor: "#eee", padding: "50px 0" }}>
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-lg-8 col-xl-7">
                        <div className="card text-black shadow-lg" style={{ borderRadius: "25px" }}>
                            <div className="card-body p-md-5">
                                <p className="text-center h1 fw-bold mb-4">Sign up</p>

                                <form className="mx-1 mx-md-4" onSubmit={goLogin}>
                                    <div className="row g-3">
                                        {Object.keys(formData).map((key) => (
                                            key !== "role" && ( // Oculta el campo role
                                                <div key={key} className="col-md-6">
                                                    <label className="form-label" htmlFor={key}>
                                                        {key.charAt(0).toUpperCase() + key.slice(1)}
                                                    </label>
                                                    <input
                                                        type={key === "password" ? "password" : "text"}
                                                        id={key}
                                                        name={key}
                                                        className="form-control"
                                                        value={formData[key]}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            )
                                        ))}
                                    </div>

                                    <div className="form-check d-flex justify-content-center mt-4">
                                        <input className="form-check-input me-2" type="checkbox" id="terms" required />
                                        <label className="form-check-label" htmlFor="terms">
                                            I agree to all statements in <a href="#!">Terms of service</a>
                                        </label>
                                    </div>

                                    <div className="d-flex justify-content-center mt-4">
                                        <button type="submit" className="btn btn-primary btn-lg">Register</button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
