import React, { useState } from "react";

function Login({ handleLogin }) {
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
    handleLogin(formValue.email, formValue.password);
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2 className="auth-form__heading">Вход</h2>
      <input
        className="auth-form__input"
        required
        id="email"
        name="email"
        type="email"
        placeholder="Email"
        value={formValue.email || ""}
        onChange={handleChange}
      />
      <input
        className="auth-form__input"
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
