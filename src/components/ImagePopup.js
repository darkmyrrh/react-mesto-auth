import { usePopupClose } from "../hooks/usePopupClose";

function ImagePopup({ card, isOpen, onClose }) {
  usePopupClose(isOpen, onClose);

  return (
    <section className={`popup popup_dark ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_figure">
        <button
          type="button"
          aria-label="Закрыть"
          className="popup__close root__button"
          onClick={onClose}
        ></button>
        <figure className="figure">
          <img src={card.link} alt={card.name} className="figure__image" />
          <figcaption className="figure__caption">{card.name}</figcaption>
        </figure>
      </div>
    </section>
  );
}

export default ImagePopup;
