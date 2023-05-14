export default class Api {
  constructor(object) {
    this.url = object.url;
    this.headers = object.headers;
  }

  checkResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  };

  getProfileInformation() {
    return fetch(`${this.url}/users/me`, {
      headers: this.headers,
    }).then(this.checkResponse);
  }

  editProfileInformation(profileInformation) {
    return fetch(`${this.url}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(profileInformation),
    }).then(this.checkResponse);
  }

  editProfileAvatar(profileAvatar) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(profileAvatar),
    }).then(this.checkResponse);
  }

  getCardsArray() {
    return fetch(`${this.url}/cards`, {
      headers: this.headers,
    }).then(this.checkResponse);
  }

  addCardToServer(data) {
    return fetch(`${this.url}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(data),
    }).then(this.checkResponse);
  }

  removeCardToServer(cardId) {
    return fetch(`${this.url}/cards/${cardId}`, {
      headers: this.headers,
      method: "DELETE",
    }).then(this.checkResponse);
  }

  addLike(cardId) {
    return fetch(`${this.url}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this.headers,
    }).then(this.checkResponse);
  }

  removeLike(cardId) {
    return fetch(`${this.url}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    }).then(this.checkResponse);
  }
}
