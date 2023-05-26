import { usePopupClose } from "../hooks/usePopupClose.js";
import success from "../images/success.svg";
import error from "../images/error.svg";

function InfoToolTip({ isOpen, onClose, isSuccessful }) {
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
        {isSuccessful ? (
          <div className="tooltip">
            <img src={success} alt="Успешно" className="tooltip__image" />
            <h2 className="tooltip__title">Вы успешно зарегистрировались!</h2>
          </div>
        ) : (
          <div className="tooltip">
            <img src={error} alt="Ошибка" className="tooltip__image" />
            <h2 className="tooltip__title">Что-то пошло не так! Попробуйте ещё раз.</h2>
          </div>
        )}
      </div>
    </section>
  );
}

export default InfoToolTip;
