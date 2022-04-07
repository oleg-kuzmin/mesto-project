const config = {
  urlProfile: 'https://mesto.nomoreparties.co/v1/plus-cohort-8/users/me/',
  urlCards: 'https://mesto.nomoreparties.co/v1/plus-cohort-8/cards/',
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







export {getAllCardsFromServer};