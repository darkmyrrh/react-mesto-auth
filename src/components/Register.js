import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(formValue.email, formValue.password);
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2 className="auth-form__heading">Регистрация</h2>
      <input
        className="auth-form__input"
        required
        id="email"
        name="email"
        type="email"
        placeholder="Email"
        value={formValue.email}
        onChange={handleChange}
      />
      <input
        className="auth-form__input"
        required
        id="password"
        name="password"
        type="password"
        placeholder="Пароль"
        minLength="6"
        value={formValue.password}
        onChange={handleChange}
      />
      <button type="submit" className="auth-form__submit">
        Зарегистрироваться
      </button>
      <p className="auth-form__paragraph">
        Уже зарегистрированы?{" "}
        <Link className="auth-form__link root__button" to="/signin">
          Войти
        </Link>
      </p>
    </form>
  );
}

export default Register;
