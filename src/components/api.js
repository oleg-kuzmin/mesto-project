import {profileTitle, profileSubtitle, avatarImage} from './variables.js';
const config = {
  urlProfile: 'https://mesto.nomoreparties.co/v1/plus-cohort-8/users/me/',
  urlCards: 'https://mesto.nomoreparties.co/v1/plus-cohort-8/cards/',
  urlAvatar: 'https://mesto.nomoreparties.co/v1/plus-cohort-8/users/me/avatar',
  headers: {
    'Authorization': '79f162b1-a586-4458-ae35-5979e9a8f77a',
    'Content-type': 'application/json'
  },  
}


fetch(config.urlProfile, {headers: config.headers})
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);
  })

fetch(config.urlCards, {headers: config.headers})
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);
  })  

const onResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(res)
}

function getAllCardsFromServer() {
  return fetch(config.urlCards, {headers: config.headers})
  .then(onResponse)
}

let profileId;

function getProfile() {
  fetch(config.urlProfile, {headers: config.headers})
  .then((res) => {
    return res.json();
  })
  .then((data) => {    
    profileTitle.textContent = data.name;
    profileSubtitle.textContent = data.about;    
    profileId = data._id;
    avatarImage.src = data.avatar;
  })
}

function patchProfile() {
  return fetch(config.urlProfile, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: profileName.value,
      about: profileAboutSelf.value
    }) 
  })
  .then(onResponse)
}

function patchAvatar() {
  return fetch(config.urlAvatar, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarUrl.value
    }) 
  })
  .then(onResponse)
}

function addCardToServer(item) {
  return fetch(config.urlCards, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(item) 
  })
  .then(onResponse)
}


export {
  getAllCardsFromServer, 
  getProfile, 
  profileId, 
  patchProfile,
  patchAvatar,
  addCardToServer
};