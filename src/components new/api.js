const apiConfig = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-8',
  headers: {
    Authorization: '79f162b1-a586-4458-ae35-5979e9a8f77a',
    'Content-type': 'application/json',
  },
};

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);
};

const getCards = () => {
  return fetch(`${apiConfig.baseUrl}/cards/`, { headers: apiConfig.headers })
    .then(checkResponse)
    .then((res) => {
      // console.log(res);
    });
};

const getProfile = () => {
  return fetch(`${apiConfig.baseUrl}/users/me`, { headers: apiConfig.headers })
    .then(checkResponse)
    .then((res) => {
      return res;
    });
};

const patchProfile = () => {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: profileName.value,
      about: profileAboutSelf.value,
    }),
  }).then(checkResponse);
};

export { getProfile, patchProfile };
