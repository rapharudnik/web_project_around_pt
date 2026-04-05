import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popup) {
    super(popup);
  }

  _getButtons() {
    this._confirmButton = this._popup.querySelector(".popup__confirm-button");
    this._cancelButton = this._popup.querySelector(".popup__cancel-button");
  }

  setEventListeners() {
    super.setEventListeners();

    this._getButtons();

    // Event listener para o botão cancelar
    this._cancelButton.addEventListener("click", () => {
      this.close();
    });

    this._confirmButton.addEventListener("click", () => {
      if (this._handleConfirm) {
        this._handleConfirm();
      }
    });
  }

  setSubmitAction(callback) {
    this._handleConfirm = callback; // só atualiza o callback, sem adicionar novo listener
  }
}
