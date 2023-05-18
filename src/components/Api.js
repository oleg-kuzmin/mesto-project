export default class Api {
  constructor(objectSettings) {
    this.baseUrl = objectSettings.baseUrl;
    this.headers = objectSettings.headers;
  }

  checkResponse(response) {
    return response.ok ? response.json() : Promise.reject(`Ошибка: ${response.status}`);
  }

  getProfile() {
    return fetch(`${this.baseUrl}/users/me`, { headers: this.headers }).then(this.checkResponse);
  }

  getAllCardsFromServer() {
    return fetch(`${this.baseUrl}/cards/`, { headers: this.headers }).then(this.checkResponse);
  }

  patchProfile(inputProfileName, inputProfileAboutSelf) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: inputProfileName,
        about: inputProfileAboutSelf,
      }),
    }).then(this.checkResponse);
  }

  patchAvatar(avatarUrl) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatarUrl,
      }),
    }).then(this.checkResponse);
  }

  addCardToServer(card) {
    return fetch(`${this.baseUrl}/cards/`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(card),
    }).then(this.checkResponse);
  }

  removeCardFromServer(idCard) {
    return fetch(`${this.baseUrl}/cards/${idCard}`, {
      method: 'DELETE',
      headers: this.headers,
    }).then(this.checkResponse);
  }

  addLikeToServer(idCard) {
    return fetch(`${this.baseUrl}/cards/likes/${idCard}`, {
      method: 'PUT',
      headers: this.headers,
    }).then(this.checkResponse);
  }

  removeLikeFromServer() {
    return fetch(`${this.baseUrl}/cards/likes/${idCard}`, {
      method: 'DELETE',
      headers: this.headers,
    }).then(this.checkResponse);
  }
}
