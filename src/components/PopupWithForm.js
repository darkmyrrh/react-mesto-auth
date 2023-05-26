import { usePopupClose } from "../hooks/usePopupClose.js";
function PopupWithForm({
  name,
  title,
  children,
  buttonText,
  isOpen,
  onClose,
  onSubmit,
}) {
  usePopupClose(isOpen, onClose);

  return (
    <section className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          type="button"
          aria-label="Закрыть"
          className="popup__close root__button"
          onClick={onClose}
        />
        <form className="form" name={`${name}`} onSubmit={onSubmit}>
          <h2 className="form__heading">{`${title}`}</h2>
          {children}
          <button
            type="submit"
            className="form__submit"
          >{`${buttonText}`}</button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
