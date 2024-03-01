class Api {
  constructor({ address }) {
    this._address = address;
    this._token = localStorage.getItem("token");
  }

  async _useFetch(url, method, body) {
    const res = await fetch(url, {
      headers: {
        Authorization: "Bearer " + this._token,
        "Content-Type": "application/json",
      },
      method,
      body: JSON.stringify(body),
    });

    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Error ${res.status}`);
  }

  async getUserInfoFromServer() {
    try {
      const res = await this._useFetch(this._address + "/users/me", "GET");

      return res;
    } catch (err) {
      console.log(err);
    }
  }

  async getCards() {
    try {
      const res = await this._useFetch(this._address + "/cards", "GET");
      return res;
    } catch (err) {
      console.log(err);
    }
  }

  async saveDataToServer(name, about) {
    try {
      const res = await this._useFetch(this._address + "/users/me", "PATCH", {
        name,
        about,
      });

      return res;
    } catch (err) {
      console.log(err);
    }
  }

  async addNewCardToServer(name, link) {
    try {
      const res = await this._useFetch(this._address + "/cards", "POST", {
        name: name,
        link: link,
      });
      return res;
    } catch (err) {
      console.log(err);
    }
  }

  async deleteCardFromServer(cardId) {
    try {
      const res = await this._useFetch(
        `${this._address}/cards/${cardId}`,
        "DELETE"
      );

      return res;
    } catch (err) {
      console.log(err);
    }
  }

  async addLikeFromCard(cardId) {
    try {
      const res = await this._useFetch(
        `${this._address}/cards/${cardId}/likes`,
        "PUT"
      );

      return res;
    } catch (err) {
      console.log(err);
    }
  }

  async deleteLikeFromCard(cardId) {
    try {
      const res = await this._useFetch(
        `${this._address}/cards/${cardId}/likes`,
        "DELETE"
      );

      return res;
    } catch (err) {
      console.log(err);
    }
  }

  async updateAvatar(avatarUrl) {
    try {
      if (typeof avatarUrl === "string" && /^https?:\/\/\S+$/.test(avatarUrl)) {
        const res = await this._useFetch(
          this._address + "/users/me/avatar",
          "PATCH",
          {
            avatar: avatarUrl,
          }
        );

        return res;
      } else {
        throw new Error("La URL del avatar no es válida");
      }
    } catch (err) {
      console.log(err);
    }
  }
}

const api = new Api({
  address: "https://api.proyectoaroundisa.twilightparadox.com",
});

export default api;
