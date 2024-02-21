import React, { useEffect, useState } from "react";
import Input from "./Input";
import InfoTooltip from "./InfoTooltip";
import { Link, useNavigate, useLocation } from "react-router-dom";
import * as auth from "../utils/auth";

function Login({ title, handleLogin, nameBtn }) {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const [error, setError] = useState(false);
  const [open, setOpen] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state === "success") {
      setOpen(false);
      setError(false);
    }
  }, [location.state]);

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const onLogin = (evt) => {
    evt.preventDefault();
    auth
      .authorize(credentials.password, credentials.email)
      .then((responseData) => {
        if (responseData.token) {
          setCredentials({ email: "", password: "" });
          navigate("/");
          handleLogin();
        }
      })
      .catch((err) => {
        setError(true);
        setCredentials({ email: "", password: "" });
        handleLogin();
        console.log(err);
      });
  };

  const handleCloseInfo = () => {
    setOpen(true);
    navigate("/signin", { state: {} });
  };

  return (
    <>
      <section className="authenticate" id="login">
        <h3 className="title">{title}</h3>
        <form className="authenticate__form" noValidate onSubmit={onLogin}>
          <Input
            className={"authenticate__input"}
            type={"email"}
            placeholder={"Correo electrónico"}
            id={"email"}
            maxLength={"200"}
            onChange={handleChange}
          />
          <Input
            className={"authenticate__input"}
            type={"password"}
            placeholder={"Contraseña"}
            id={"password"}
            maxLength={"200"}
            onChange={handleChange}
          />
          <button className="authenticate__btn">{nameBtn}</button>
        </form>
        <p className="authenticate__register">
          ¿Aún no eres miembro?
          <Link to="/signup" className="link">
            Regístrate aquí
          </Link>
        </p>
      </section>

      <InfoTooltip error={error} onClose={handleCloseInfo} open={open} />
    </>
  );
}

export default Login;
