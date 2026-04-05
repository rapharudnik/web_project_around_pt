class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }
  //metodo pra checar resposta
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  // Método único para fazer requisições
  _request(endpoint, options = {}) {
    return fetch(`${this._baseUrl}${endpoint}`, {
      headers: this._headers,
      ...options,
    }).then(this._checkResponse);
  }

  getUserInfo() {
    return this._request("/users/me");
  }

  getAppInfo() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }

  getInitialCards() {
    return this._request("/cards");
  }

  updateUserInfo(userData) {
    return this._request("/users/me", {
      method: "PATCH",
      body: JSON.stringify(userData),
    });
  }

  addCard(cardData) {
    return this._request("/cards", {
      method: "POST",
      body: JSON.stringify(cardData),
    });
  }

  likeCard(cardId) {
    return this._request(`/cards/${cardId}/likes`, { method: "PUT" });
  }

  unlikeCard(cardId) {
    return this._request(`/cards/${cardId}/likes`, { method: "DELETE" });
  }

  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, { method: "DELETE" });
  }

  updateAvatar(avatar) {
    return this._request("/users/me/avatar", {
      method: "PATCH",
      body: JSON.stringify({ avatar }),
    });
  }
}

export default Api;
