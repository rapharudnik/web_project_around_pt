export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._image = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    console.log("Seletor usado:", this._cardSelector);
    // método privado para pegar o template
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _handleLikeClick() {
    this._likeButton.classList.toggle("element__like-button_active");
  }

  _handleDeleteClick() {
    this._element.remove();
  }

  _handleImageClick() {
    openPopupImage();
  }

  _setEventListeners() {
    // método privado para adicionar eventos
    //Selecionar botão de curtir
    this._likeButton = this._element.querySelector(".element__like-button");
    //adiciona evento de curtir
    this._likeButton.addEventListener("click", this._handleLikeClick);

    // Selecionar o botão para excluir o card
    this._deleteButton = this._element.querySelector(".element__trash-button");
    //adiciona evento de excluir card
    this._deleteButton.addEventListener("click", this._handleDeleteClick);

    // Selecionar a imagem do card
    this._cardImage = this._element.querySelector(".element__image");
    //seleciona imagem
    this._cardImage.addEventListener("click", this._handleImageClick);
  }

  _setCardData() {
    // Preencher o título
    this._element.querySelector(".element__text").textContent = this._name;

    //preencher a imagem
    const imageElement = this._element.querySelector(".element__image");
    imageElement.src = this._image;
    imageElement.alt = this._text;
  }

  generateCard() {
    // método público que retorna o cartão pronto
    // 1. Obter o template
    this._element = this._getTemplate();

    // 2. Preencher os dados (título, imagem, etc.)
    this._setCardData();

    // 3. Adicionar os event listeners
    this._setEventListeners();

    // 4. Retornar o elemento pronto
    return this._element;
  }
}
