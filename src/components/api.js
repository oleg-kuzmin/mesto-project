const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-8',
  headers: {
    Authorization: '79f162b1-a586-4458-ae35-5979e9a8f77a',
    'Content-type': 'application/json',
  },
};

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

const getAllCardsFromServer = () => {
  return fetch(`${config.baseUrl}/cards/`, { headers: config.headers }).then(checkResponse);
};

const getProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, { headers: config.headers }).then(checkResponse);
};

const patchProfile = (inputProfileName, inputProfileAboutSelf) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: inputProfileName.value,
      about: inputProfileAboutSelf.value,
    }),
  }).then(checkResponse);
};

const patchAvatar = (inputAvatarUrl) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: inputAvatarUrl.value,
    }),
  }).then(checkResponse);
};

const addCardToServer = (card) => {
  return fetch(`${config.baseUrl}/cards/`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(card),
  }).then(checkResponse);
};

const removeCardFromServer = (idCard) => {
  return fetch(`${config.baseUrl}/cards/${idCard}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then(checkResponse);
};

const addLikeToServer = (idCard) => {
  return fetch(`${config.baseUrl}/cards/likes/${idCard}`, {
    method: 'PUT',
    headers: config.headers,
  }).then(checkResponse);
};

const removeLikeFromServer = (idCard) => {
  return fetch(`${config.baseUrl}/cards/likes/${idCard}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then(checkResponse);
};

export {
  getAllCardsFromServer,
  getProfile,
  patchProfile,
  patchAvatar,
  addCardToServer,
  removeCardFromServer,
  addLikeToServer,
  removeLikeFromServer,
};
