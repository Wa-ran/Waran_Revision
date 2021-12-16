import { createStore } from "vuex";

export default createStore({
  state: {
    //card
    actualCard: {},
    cardModifier: false,
    cardsList: [],
    cardsListKey: 0,
    cardsToReviseList: [],
    cardsToReviseListKey: 0,
    userCardsList: [],
    userCardsListKey: 0,
    firstDeckCard: {},
    modifCard: false,
    validModifCard: false,
    modifComment: false,
    newCardCreation: false,
    newCard: {
      recto: "Une carte toute neuve :)",
      verso: "",
      streak: 0,
      next_revision: "",
      user_id: "",
      recto_comment: "",
      verso_comment: "",
      recto_formula: false,
      verso_formula: false,
      recto_image: false,
      verso_image: false,
      reverse: true,
      new: true,
    },
    pickRandom: true,
    reviseByOrder: false,
    cardChrono: true,
    cardReveal: false,
    deckCharged: false,

    error: {
      pending: false,
      msg: "",
      status: "",
    },
    form: {
      APIRequest: null,
      submitPath: null,
    },
    defaultHeaders: {
      Authorization: "",
      "Content-Type": "application/json",
    },
    loading: false,
    serverAddress: {
      // php_server: "http://waran.xyz/",
      // waran_revision: "http://195.110.59.46:3008",

      // Local Dev
      php_server: "http://localhost:8000",
      waran_revision: "http://localhost:3008",
    },

    //tag
    actualTag: {
      id: "",
      name: "",
      user_id: "",
    },
    originCardTagsList: [],
    originCardTagsListKey: 0,
    cardTagsList: [],
    cardTagsListKey: 0,
    searchTagsCond: "AND",
    tagsList: [],
    tagsListKey: 0,
    tagRequest: false,
    tagsSelectedList: [],
    tagsSelectedListKey: 0,
    handleTagSelection: false,
    tagGestionRefreshKey: 0,

    user: {
      id: "",
      pseudo: "",
      token: "",
    },
    randomNum: null,
    showPage: "",
    showModal: false,

    fileTest: '',
    php_res: 'none',
  },
  mutations: {
    changeUser(state, payload) {
      try {
        state.newCard.user_id = payload.id;
        state.defaultHeaders.Authorization = payload.token;
      } catch (error) {
        state.newCard.user_id = "";
        state.defaultHeaders.Authorization = "";
      }
    },
    mutateKey(state, payload) {
      let mutate = payload.sKey;
      delete payload.sKey;
      if (Array.isArray(state[mutate]) && !Array.isArray(payload.body)) {
        if (state[mutate].length > 0) {
          for (let elem of state[mutate]) {
            if (JSON.stringify(elem) == JSON.stringify(payload.body)) return;
          }
        }
        state[mutate].unshift(payload.body);
      } else {
        state[mutate] = payload.body;
      }
    },
    incrementKey(state, sKey) {
      if (state[sKey + "Key"] > -1) ++state[sKey + "Key"];
    },
    resetKey(state, sKey) {
      if (Array.isArray(state[sKey])) state[sKey] = [];
      else state[sKey] = "";
    },
    shiftKey(state, sKey) {
      if (Array.isArray(state[sKey])) state[sKey].shift();
      else state[sKey] = "";
    },
    filterList(state, payload) {
      let sKey = payload.sKey;
      let findId = payload.findId;
      state[sKey] = state[sKey].filter((item) => item.id !== findId);
    },
    deleteSearchTag(state) {
      let index = 0;
      for (let tag of state.tagsSelectedList) {
        if (tag.id == state.actualTag.id)
          return state.tagsSelectedList.slice(index, 1);
        index++;
      }
    },
    prepareDeck(state) {
      state.cardsList.sort(function (a, b) {
        if (a.order === b.order) {
          return b.id - a.id;
        }
        return b.order - a.order;
      });
    },
    triggError(state, payload) {
      if (payload.status !== 404) {
        state.error.pending = payload.bool;
        state.error.msg = payload.msg ? payload.msg : "";
        state.error.status = payload.status ? payload.status : "";
      }
      state.error.pending = false;
    },
  },
  actions: {
    mutateStore(context, payload) {
      if (payload.value && payload.value.sKey) {
        let key = payload.value.sKey;
        setTimeout(() => {
          this.dispatch("mutateStore", {
            fct: "incrementKey",
            value: key,
          });
        });
      }
      if (
        payload.value &&
        payload.value.sKey &&
        payload.value.sKey == "cardsList"
      ) {
        setTimeout(() => {
          payload.value.sKey = "cardsToReviseList";
          this.dispatch("mutateStore", {
            fct: payload.fct,
            value: payload.value,
          });
        });
      }
      context.commit(payload.fct, payload.value || null);
    },
    async deleteCard() {
      await this.dispatch("APIRequest", {
        method: "DELETE",
        serverRoute: "/Card",
        data: { card: this.state.actualCard },
        mutate: "cardsList",
      });
    },
    async deleteCardTag() {
      await this.dispatch("APIRequest", {
        method: "DELETE",
        serverRoute: "/CardTags",
        data: { card: this.state.actualCard, tag: this.state.actualTag },
        mutate: "cardTagsList",
      });
    },
    async deleteTag() {
      await this.dispatch("APIRequest", {
        method: "DELETE",
        serverRoute: "/Tag",
        data: { tag: this.state.actualTag },
        mutate: "tagsList",
      });
    },
    async postCard() {
      if (!this.state.actualCard.user_id)
        this.state.actualCard.user_id = this.state.user.id;
      await this.dispatch("APIRequest", {
        method: "POST",
        serverRoute: "/Card",
        data: {
          card: this.state.actualCard,
          tag: this.state.cardTagsList,
          user: this.state.user,
          assets: {
            order: this.state.actualCard.deck_order,
          },
        },
        mutate: "cardsList",
      });
    },
    async postTag() {
      if (!this.state.actualTag.user_id)
        this.state.actualTag.user_id = this.state.user.id;
      await this.dispatch("APIRequest", {
        method: "POST",
        serverRoute: "/Tag",
        data: { tag: this.state.actualTag },
        mutate: "tagsList",
      });
    },
    async postUser() {
      await this.dispatch("APIRequest", {
        method: "POST",
        serverRoute: "/User",
        data: { user: this.state.user },
        mutate: "user",
        alert: true,
      });
    },
    async postCardTags() {
      if (this.state.actualCard.id) {
        await this.dispatch("APIRequest", {
          method: "POST",
          serverRoute: "/CardTags",
          data: {
            card: this.state.actualCard,
            tag: this.state.cardTagsList,
          },
          mutate: "cardTagsList",
        });
      }
    },
    async putCard() {
      if (this.state.actualCard.id) {
        await this.dispatch("APIRequest", {
          method: "PUT",
          serverRoute: "/Card",
          data: { card: this.state.actualCard },
          mutate: "cardsList",
        });
      }
    },
    async putCardOrder() {
      if (this.state.actualCard.id) {
        await this.dispatch("APIRequest", {
          method: "PUT",
          serverRoute: "/CardOrder",
          data: {
            card: this.state.actualCard,
            assets: {
              order: this.state.actualCard.deck_order,
            },
          },
          mutate: "cardsList",
        });
      }
    },
    async putTag() {
      if (this.state.actualTag.id) {
        await this.dispatch("APIRequest", {
          method: "PUT",
          serverRoute: "/Tag",
          data: { tag: this.state.actualTag },
          mutate: "tagsList",
        });
      }
    },
    async getLastCard() {
      await this.dispatch("APIRequest", {
        method: "GET",
        serverRoute: "/LastCard",
        data: "user/" + this.state.user.id,
        mutate: "cardsList",
      });
    },
    async getCardsToRevise() {
      await this.dispatch("APIRequest", {
        method: "GET",
        serverRoute: "/CardsToRevise",
        data: "user/" + this.state.user.id,
        mutate: "cardsList",
      }).then(() => {
        this.dispatch("mutateStore", {
          fct: "mutateKey",
          value: {
            sKey: "cardsToReviseList",
            body: this.state.cardsList,
          },
        });
      });
    },
    async getCardsToReviseByTags() {
      await this.dispatch("APIRequest", {
        method: "POST",
        serverRoute:
          "/getCardsToReviseByTags" + this.state.searchTagsCond.toUpperCase(),
        data: {
          user: this.state.user,
          tag: this.state.tagsSelectedList,
        },
        mutate: "cardsList",
      });
    },
    async getAllUserCards() {
      await this.dispatch("APIRequest", {
        method: "GET",
        serverRoute: "/AllUserCards",
        data: "user/" + this.state.user.id,
        mutate: "userCardsList",
      });
    },
    async getAllUserTags() {
      await this.dispatch("APIRequest", {
        method: "GET",
        serverRoute: "/AllUserTags",
        data: "user/" + this.state.user.id,
        mutate: "tagsList",
      });
    },
    async getCardTags() {
      await this.dispatch("APIRequest", {
        method: "GET",
        serverRoute: "/CardTags",
        data: "card/" + this.state.actualCard.id,
        mutate: "cardTagsList",
      });
    },
    async getUserByPseudo() {
      await this.dispatch("APIRequest", {
        method: "POST",
        serverRoute: "/getUserByPseudo",
        data: { user: this.state.user },
        mutate: "user",
        alert: true,
      });
    },
    async postImage() {
      await this.dispatch("APIRequest", {
        method: "POST",
        serverAddress: this.state.serverAddress.php_server,
        serverRoute: "/test.php",
        data: {
          'user_image': this.state.fileTest,
          'user': this.state.user,
          'card': this.state.actualCard,
        },
        headers: {
          Authorization: this.state.defaultHeaders.Authorization,
          enctype: 'multipart/form-data',
        },
        "form_data": true,
        mutate: "php_res",
        // alert: true,
      }).then((res) => {
        this.dispatch("mutateStore", {
          fct: "mutateKey",
          value: { sKey: "php_res", body: res },
        });
      })
    },
    async APIRequest(context, req) {
      if (!this.state.error.pending) {
        this.dispatch("mutateStore", {
          fct: "mutateKey",
          value: { sKey: "loading", body: true },
        });
        return this.dispatch("callAPI", {
          method: req.method,
          address: req.serverAddress || this.state.serverAddress.waran_revision,
          route: req.serverRoute,
          headers: req.headers || this.state.defaultHeaders,
          data: req.data,
          form_data: req.form_data || false,
        }).then((response) => {
          if (response) {
            let result = {};
            result["sKey"] = req.mutate;
            result["body"] = response;
            this.dispatch("mutateStore", {
              fct: "mutateKey",
              value: result,
            })
          };

          if (req.mutate == "cardsList") context.commit("prepareDeck");
          // console.log(req.method + ' ' + req.mutate)
          this.dispatch("mutateStore", {
            fct: "mutateKey",
            value: { sKey: "loading", body: false },
          });

          return response
        }).catch((error) => {
          if (req.alert) alert(error.msg);
          if (error.status !== 404) console.log(error);
          context.commit("triggError", {
            bool: true,
            status: error.status,
            msg: error.msg,
          });
          this.dispatch("mutateStore", {
            fct: "mutateKey",
            value: { sKey: "loading", body: false },
          });
          throw error;
        });
      }
    },
    async callAPI(context, req) {
      let method = req.method;
      let address = req.address;
      let route = req.route;
      let headers = req.headers;
      let body = req.data;

      method = method.toUpperCase();

      if (method == "GET") {
        route = route + "/" + body;
        body = null;
      } else if (req.form_data) {
        let form = new FormData;
        for (let [key, value] of Object.entries(body)) {
          form.append(key, JSON.stringify(value))
        }
        body = form
      } else if (typeof body === "object") {
        // body = object to send
        body = JSON.stringify(body);
      };

      return fetch(address + route, {
        method,
        headers,
        body,
      }).then(async (res) => {
        if (res.status >= 400) {
          let err = {};
          let status = res.status;
          let msg = {};

          try {
            msg = await res.json(); // Si le serveur ne renvoie qu'un statut sans corps, '.json' va fail
          } catch (error) {
            msg = res.statusText;
          }

          err["status"] = status;
          err["msg"] = msg;

          throw err;
        } else {
          try {
            return res = await res.json().then((res) => { return res })
          } catch (error) {
            return null; // Si le serveur renvois un statut 2XX/3XX seul
          }
        }
      });
    },
  },
  getters: {
    actualCardId: (state) => {
      let id;
      try {
        id = state.actualCard.id;
      } catch (error) {
        id = null;
      }
      return id;
    },
  },
  modules: {},
});
