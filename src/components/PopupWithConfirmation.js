import Card from "./Card.js";
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
  }

  setSubmitAction(callback) {
    // Adiciona event listener ao botão de confirmação
    this._confirmButton.onclick = () => {
      callback(); // Executa a função de exclusão
      this.close();
    };
  }
}
