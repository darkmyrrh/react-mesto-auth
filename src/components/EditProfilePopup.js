import { useEffect, useContext } from "react";

import PopupWithForm from "./PopupWithForm.js";

import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

import { useForm } from "../hooks/useForm.js";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, setValues } = useForm({});

  useEffect(() => {
    setValues({ name: currentUser.name, about: currentUser.about });
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(values);
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      buttonText={isLoading ? "Сохранение..." : "Coхранить"}
    >
      <input
        type="text"
        name="name"
        placeholder="Имя"
        className="form__input form__input_el_name"
        minLength="2"
        maxLength="40"
        required
        id="name-input"
        onChange={handleChange}
        value={values.name || ""}
        autoFocus
      />
      <span className="form__input-error name-input-error"></span>
      <input
        type="text"
        name="about"
        placeholder="Вид деятельности"
        className="form__input form__input_el_job"
        minLength="2"
        maxLength="200"
        required
        id="job-input"
        onChange={handleChange}
        value={values.about || ""}
      />
      <span className="form__input-error job-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
