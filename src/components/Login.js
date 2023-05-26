import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as auth from '../utils/auth';

function Login({ handleLogin }) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValue.email || !formValue.password) {
      return;
    }
    auth
      .authorize(formValue.email, formValue.password)
      .then((data) => {
        if (data.token) {
          setFormValue({ email: "", password: "" });
          handleLogin();
          navigate("/cards", { replace: true });
        }
      })
      .catch((err) => alert(err));
  };

  return (
    <form 
      onSubmit={handleSubmit}
       className="auth-form">
      <h2 className="auth-form__heading">Вход</h2>
        <input className="auth-form__input"
          required
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          value={formValue.email || ""}
          onChange={handleChange}
        />
        <input className="auth-form__input"
          required
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
          value={formValue.password || ""}
          onChange={handleChange}
        />
        <button type="submit" className="auth-form__submit">
          Войти
        </button>
      </form>
  );
}

export default Login;
