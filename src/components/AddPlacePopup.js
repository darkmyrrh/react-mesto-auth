import PopupWithForm from "./PopupWithForm.js";
import { useForm } from "../hooks/useForm.js";
import { useEffect } from "react";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const { values, handleChange, setValues } = useForm({});

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(values);
  }

  useEffect(() => {
    setValues({});
  }, [isOpen]);

  return (
    <PopupWithForm
      name="add-place"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      buttonText={isLoading ? "Сохранение..." : "Coхранить"}
    >
      <input
        type="text"
        name="name"
        className="form__input form__input_el_place"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        id="place-input"
        autoFocus
        value={values.name || ""}
        onChange={handleChange}
      />
      <span className="form__input-error place-input-error"></span>
      <input
        type="url"
        name="link"
        className="form__input form__input_el_link"
        placeholder="Ссылка на картинку"
        required
        id="link-input"
        value={values.link || ""}
        onChange={handleChange}
      />
      <span className="form__input-error link-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
