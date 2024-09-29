import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import '../App.css';

function Login() {
    
    const [email, setEmail] = useState("");
    const [password, setPass] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/");
    }

    const googlePro = new GoogleAuthProvider();
    async function googleEnter() {
        await signInWithPopup(auth, googlePro);
    }

    return (
      <center>
        <nav className="navbar navbar-expand-lg" style={{ height: "30px" }}></nav>
        <section>
          <div
            className="px-4 py-5 px-md-5 text-center text-lg-start"
            style={{
              backgroundColor: '#131418',
              marginTop: "0px",
              width: "85%",
              height: "590px",
              paddingBottom: "40px",
              boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
              color: 'white',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div className="container">
              <div className="row gx-lg-5 align-items-center">
                <div className="col-lg-6 mb-5 mb-lg-0">
                  <h1 className="my-5 display-3 fw-bold ls-tight" style={{ color: "#ccaa62", borderColor: "#ccaa62" }}>
                    R-Moviezz<br />
                    <span className="text" style={{ color: "gold", fontWeight: "900" }}> GDG RBU</span>
                  </h1>
                  <p style={{ color: 'white' }}>
                    Hello, I am Jyotiraditya. Thank you for giving me the opportunity to participate in the next round.
                    With this project, I aimed to demonstrate my skills in both frontend and backend development.
                    For the backend, I used Firebase, and for the frontend, I utilized React along with Bootstrap CSS.
                  </p>
                </div>

                <div className="col-lg-6 mb-5 mb-lg-0" style={{ backgroundColor: "#1e1c2a", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)" }}>
                  <div className="card" style={{ backgroundColor: "#1e1c2a", border: "none" }}>
                    <h3 style={{ marginLeft: "130px", marginTop: "18px", fontWeight: "900", color: "#ccaa62" }}>
                      Welcome Back
                    </h3>
                    <div className="card-body py-5 px-md-5">
                      <form>
                        <div className="form-outline mb-4">
                          <input type="email" id="form3Example3" placeholder='Email address' value={email} onChange={e => setEmail(e.target.value)} className="form-control" />
                        </div>

                        <div className="form-outline mb-4">
                          <input type="password" id="form3Example4" value={password} onChange={e => setPass(e.target.value)} placeholder='Password (Minimum 6 Characters)' className="form-control" />
                        </div>

                        <div className="form-check d-flex justify-content-center mb-4">
                          <input className="form-check-input me-2" type="checkbox" id="form2Example33" defaultChecked />
                          <label className="form-check-label" htmlFor="form2Example33" style={{ color: "#ccaa62", fontWeight: "700" }}>
                            Move Forward
                          </label>
                        </div>

                        <button type="submit" onClick={handleSubmit} style={{ marginLeft: "150px", backgroundColor: "black", color: "#ccaa62", fontWeight: "700",marginBottom:"40px" }} className="btn btn-block mb-4">
                          Login
                        </button>

                        <div className="text-center">
                          
                          <p style={{ color: "#ccaa62", fontWeight: "700" }}>Don't have an account? <Link to="/register" style={{ color: "#22A7F0", fontWeight: "800" }}>Register</Link></p>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </center>
    );
}

export default Login;
