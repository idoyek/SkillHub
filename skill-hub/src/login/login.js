import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (user) navigate("/");
    }, [user, loading, navigate]);

    return (
        <div className="login">
            <div className="login__container">
                <input
                    type="text"
                    className="login__textBox"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail Address"
                />
                <input
                    type="password"
                    className="login__textBox"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button
                    className="login__btn"
                    onClick={() => logInWithEmailAndPassword(email, password)}
                >
                    Login
                </button>
                <button className="login__btn login__google" onClick={signInWithGoogle}>
                    {/* <FontAwesomeIcon icon={faGoogleLogo} style={{ color: "#f01919", }} /> */}
                    Login with Google
                </button>
                <div className="reset-text">
                    <Link to="/reset">Forgot Password</Link>
                </div>
                <div className="register-text">
                    Don't have an account? <Link to="/register">Register</Link> now.
                </div>
            </div>
        </div>
    );
}

export default Login