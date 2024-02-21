const BASE_URL = "https://register.nomoreparties.co";

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  })
    .then((response) => {
      console.log(response);
      if (!response.ok) {
        throw new Error(`Error al registrarse: ${response.status}`);
      }

      return response.json();
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw new Error(`Error en la solicitud de registro: ${err.message}`);
    });
};

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  })
    .then((response) => {
      return response.json();
    })
    .then((credentials) => {
      if (credentials.token) {
        localStorage.setItem("jwt", credentials.token);
        return credentials;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
