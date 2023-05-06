const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-8',
  headers: {
    'Authorization': '79f162b1-a586-4458-ae35-5979e9a8f77a',
    'Content-type': 'application/json'
  },  
}

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
}

function getAllCardsFromServer() {
  return fetch(`${config.baseUrl}/cards/`, {headers: config.headers})
  .then(checkResponse)
}

function getProfile() {
  return fetch(`${config.baseUrl}/users/me`, {headers: config.headers})
  .then(checkResponse)
}

function patchProfile() {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: profileName.value,
      about: profileAboutSelf.value
    }) 
  })
  .then(checkResponse)
}

function patchAvatar() {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarUrl.value
    }) 
  })
  .then(checkResponse)
}

function addCardToServer(item) {
  return fetch(`${config.baseUrl}/cards/`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(item) 
  })
  .then(checkResponse)
}

const removeCardFromServer = (idCard) => {
  return fetch(`${config.baseUrl}/cards/${idCard}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(checkResponse);
};

function addLikeToServer(idCard) {
  return fetch(`${config.baseUrl}/cards/likes/${idCard}`, {
    method: 'PUT',
    headers: config.headers,
  })
  .then(checkResponse);
}

function removeLikeFromServer(idCard) {
  return fetch(`${config.baseUrl}/cards/likes/${idCard}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(checkResponse);
}

export {
  getAllCardsFromServer,
  getProfile,
  patchProfile,
  patchAvatar,
  addCardToServer,
  removeCardFromServer,
  addLikeToServer,
  removeLikeFromServer
};