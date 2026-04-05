import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__info-function",
  avatarSelector: ".profile__avatar-image",
});

let cardSection;

// Criar instância do popup de imagem
const popupWithImage = new PopupWithImage(".popup_type_image");
popupWithImage.setEventListeners();

// Criar instância da API PRIMEIRO
const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "07a92065-5399-49c2-9b22-c1495ae371b4",
    "Content-Type": "application/json",
  },
});

api
  .getUserInfo()
  .then((userData) => {
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData.avatar);
  })
  .catch(console.error);

//instancia de popupWithConfirmation
const confirmationPopup = new PopupWithConfirmation(".popup_type_confirmation");
confirmationPopup.setEventListeners();

//funcao callback para like
function handleLikeClick(cardId, isLiked) {
  if (isLiked) {
    return api.unlikeCard(cardId);
  } else {
    return api.likeCard(cardId);
  }
}

function handleCardClick(imageUrl, imageName) {
  popupWithImage.open(imageUrl, imageName);
}

// DEPOIS usar a API para buscar dados e renderizar
api
  .getInitialCards()
  .then((cards) => {
    cardSection = new Section(
      {
        items: cards,
        renderer: (item) => {
          const card = new Card(
            item,
            "#card-template",
            handleCardClick,
            handleLikeClick,
            handleDeleteClick,
          );
          return card.generateCard();
        },
      },
      ".elements",
    );

    cardSection.renderItems();
  })
  .catch(console.error);

function handleProfileFormSubmit(inputValues) {
  // Muda o texto do botão para "Salvando..."
  const submitButton = document.querySelector(".popup__profile .popup__button");
  const originalText = submitButton.textContent;
  submitButton.textContent = "Salvando...";

  api
    .updateUserInfo({
      name: inputValues["form__input-name"],
      about: inputValues["form__input-function"],
    })
    .then((updatedUser) => {
      // Atualiza a interface com os novos dados
      userInfo.setUserInfo(updatedUser);
      // Fecha o popup
      profileEditPopup.close();
    })
    .catch((err) => {
      console.log("Erro ao atualizar perfil:", err);
    })
    .finally(() => {
      // Restaura o texto original do botão
      submitButton.textContent = originalText;
    });
}

const profileEditPopup = new PopupWithForm(
  ".popup__profile",
  handleProfileFormSubmit,
);

profileEditPopup.setEventListeners();

// Seleciona o botão de editar perfil
const editButton = document.querySelector(".profile__info-edit-button");

editButton.addEventListener("click", () => {
  // Pega os dados atuais do usuário
  const currentUserInfo = userInfo.getUserInfo();

  // Preenche os campos com os dados atuais
  document.getElementById("form__input-name").value = currentUserInfo.name;
  document.getElementById("form__input-function").value = currentUserInfo.about;

  // Abre o popup
  profileEditPopup.open();
});

// Selecionar os elementos principais
const addPlace = document.querySelector(".profile__add-button");

const nameInput = document.querySelector("#form__input-name");
const functionInput = document.querySelector("#form__input-function");

const popupNewPlace = new PopupWithForm(".popup__newplace", (formData) => {
  const name = formData["form__input-title"];
  const link = formData["form__input-image"];
  if (!cardSection) return;

  api
    .addCard({ name, link })
    .then((newCard) => {
      const card = new Card(
        newCard,
        "#card-template",
        handleCardClick,
        handleLikeClick,
        handleDeleteClick,
      );
      const cardElement = card.generateCard();
      cardSection.addItem(cardElement);
      popupNewPlace.close();
    })
    .catch(console.error)
    .finally(() => {
      popupNewPlace._renderLoading(false); // 👈 restaura o botão
    });
});

popupNewPlace.setEventListeners();

addPlace.addEventListener("click", () => {
  popupNewPlace.open();
});

// funcao para deletar card
function handleDeleteClick(cardId, cardElement) {
  confirmationPopup.open();

  confirmationPopup.setSubmitAction(() => {
    api
      .deleteCard(cardId)
      .then(() => {
        cardElement.remove();
        confirmationPopup.close();
      })
      .catch(console.error);
  });
}

const editAvatarPopup = new PopupWithForm(
  ".popup_type_edit-avatar",
  (formData) => {
    const avatarUrl = formData["form__input-avatar"];

    editAvatarPopup._renderLoading(true);

    api
      .updateAvatar(avatarUrl)
      .then((userData) => {
        // Atualizar a foto na página usando a classe UserInfo
        userInfo.setUserAvatar(userData.avatar);
        editAvatarPopup.close();
        editAvatarPopup.reset();
      })
      .catch(console.error)
      .finally(() => {
        editAvatarPopup._renderLoading(false); // Parar o loading
      });
  },
);

// Selecionar o botão de edição do avatar
const avatarEditButton = document.querySelector(".profile__avatar-edit-button");

// Adicionar listener para abrir o popup
avatarEditButton.addEventListener("click", () => {
  editAvatarPopup.open();
});
editAvatarPopup.setEventListeners();

//instância para cada formulário
// Selecionar cada formulário específico
const profileForm = document.querySelector(".popup__profile .popup__form");

const newPlaceForm = document.querySelector(".popup__newplace .popup__form");

const editAvatarForm = document.querySelector(
  ".popup_type_edit-avatar .popup__form",
);

// Criar uma instância para cada formulário
const profileValidator = new FormValidator(config, profileForm);
const newPlaceValidator = new FormValidator(config, newPlaceForm);
const editAvatarValidator = new FormValidator(config, editAvatarForm);

// Ativar a validação para cada formulário
profileValidator.enableValidation();
newPlaceValidator.enableValidation();
editAvatarValidator.enableValidation();
