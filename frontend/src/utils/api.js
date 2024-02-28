class Api {
  constructor() {
    this._authorization =
      "33ee3393b29f3de681e2bf179e056c8fae6efdba6f91c2a9405e56d2eae15d58";
  }

  async _useFetch(url, method, body) {
    const res = await fetch(url, {
      headers: {
        authorization: this._authorization,
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
      const res = await this._useFetch(
        "http://proyectoaroundisa.twilightparadox.com/users/me",
        "GET"
      );

      return res;
    } catch (err) {
      console.log(err);
    }
  }

  async getCards() {
    try {
      const res = await this._useFetch(
        "http://proyectoaroundisa.twilightparadox.com/cards",
        "GET"
      );
      return res;
    } catch (err) {
      console.log(err);
    }
  }

  async saveDataToServer(name, about) {
    try {
      const res = await this._useFetch(
        "http://proyectoaroundisa.twilightparadox.com/users/me",
        "PATCH",
        {
          name,
          about,
        }
      );

      return res;
    } catch (err) {
      console.log(err);
    }
  }

  async addNewCardToServer(name, link) {
    try {
      const res = await this._useFetch(
        "http://proyectoaroundisa.twilightparadox.com/cards",
        "POST",
        {
          name: name,
          link: link,
        }
      );
      return res;
    } catch (err) {
      console.log(err);
    }
  }

  async deleteCardFromServer(cardId) {
    try {
      const res = await this._useFetch(
        `http://proyectoaroundisa.twilightparadox.com/cards/${cardId}`,
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
        `http://proyectoaroundisa.twilightparadox.com/cards/likes/${cardId}`,
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
        `http://proyectoaroundisa.twilightparadox.com/cards/likes/${cardId}`,
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
          "http://proyectoaroundisa.twilightparadox.com/users/me/avatar",
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
  address: "http://proyectoaroundisa.twilightparadox.com",
  token: `33ee3393b29f3de681e2bf179e056c8fae6efdba6f91c2a9405e56d2eae15d58`,
});

export default api;
