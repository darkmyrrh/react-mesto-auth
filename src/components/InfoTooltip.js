import { usePopupClose } from "../hooks/usePopupClose.js";
import success from "../images/success.svg";
import error from "../images/error.svg";

function InfoToolTip({ isOpen, onClose, isSuccessful }) {
  usePopupClose(isOpen, onClose);
  const successRegistrationMessage = "Вы успешно зарегистрировались!";
  const failedRegistrationMessage = "Что-то пошло не так! Попробуйте ещё раз.";

  return (
    <section className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          type="button"
          aria-label="Закрыть"
          className="popup__close root__button"
          onClick={onClose}
        />
        <div className="tooltip">
          <img
            src={isSuccessful ? success : error}
            alt="Регистрация"
            className="tooltip__image"
          />
          <h2 className="tooltip__title">
            {isSuccessful ? successRegistrationMessage : failedRegistrationMessage}
          </h2>
        </div>
      </div>
    </section>
  );
}

export default InfoToolTip;
