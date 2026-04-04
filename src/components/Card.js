export default class Card {
  constructor(
    data,
    cardSelector,
    handleCardClick,
    handleLikeClick,
    handleDeleteClick,
  ) {
    this._name = data.name;
    this._image = data.link;
    this._isLiked = data.isLiked;
    this._id = data._id;
    this._owner = data.owner;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeCallback = handleLikeClick;
    this._handleDeleteCallback = handleDeleteClick;
  }

  _getTemplate() {
    console.log("Seletor usado:", this._cardSelector);
    // método privado para pegar o template
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  _handleLikeClick() {
    // Chama a função callback passando o ID do cartão e o estado atual
    this._handleLikeCallback(this._id, this._isLiked)
      .then((updatedCard) => {
        // Atualiza o estado local apenas se a requisição foi bem-sucedida
        this._isLiked = !this._isLiked;
        this._likeButton.classList.toggle("element__like-button_active");
      })
      .catch((err) => {
        console.log("Erro ao curtir/descurtir:", err);
      });
  }

  _handleDeleteClick() {
    this._handleDeleteCallback(this._id, this._element);
  }

  _setEventListeners() {
    console.log("_setEventListeners foi chamado!");
    // método privado para adicionar eventos
    //Selecionar botão de curtir
    this._likeButton = this._element.querySelector(".element__like-button");

    if (this._isLiked) {
      this._likeButton.classList.add("element__like-button_active");
    }
    //adiciona evento de curtir
    this._likeButton.addEventListener("click", () => this._handleLikeClick());

    // Selecionar o botão para excluir o card
    this._deleteButton = this._element.querySelector(".element__trash-button");
    //adiciona evento de excluir card
    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteClick(),
    );

    // Selecionar a imagem do card
    this._cardImage = this._element.querySelector(".element__image");

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._image, this._name);
    });
  }

  _setCardData() {
    // Preencher o título
    this._element.querySelector(".element__text").textContent = this._name;

    //preencher a imagem
    const imageElement = this._element.querySelector(".element__image");
    imageElement.src = this._image;
    imageElement.alt = this._name;
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
