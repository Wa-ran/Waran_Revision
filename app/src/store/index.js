import { createStore } from "vuex";
import router from "@/router";

export default createStore({
  state: {
    // app
    app: {
      actionDisconnect: false,
      darkMode: false,
      deckCharged: false,
      randomCardPick: true,
    },
    // card
    cardsToReviseBaseList: [],
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

    // deck
    decksList: [],

    // user
    user: {
      id: "",
      pseudo: "",
      token: "",
    },

    //modal
    modal: {
      title: null,
      text: null,
    },

    error: {
      pending: false,
      msg: "",
      status: "",
    },
    loading: false,
    serverAddress: {
      // php_server: "http://waran.xyz/",
      // waran_revision: "http://195.110.59.46:3008",

      // Local Dev
      php_server: "http://localhost:8000",
      waran_revision: "http://localhost:3008",
    },
  },
  mutations: {
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
    setState(state, payload) {
      Object.assign(state, payload);
    },
  },
  actions: {
    async getAllUserDecks() {
      await this.dispatch("APIRequest", {
        method: "GET",
        serverRoute: "/AllUserDecks",
        data: "user/" + this.state.user.id,
        mutate: "decksList",
      });
    },
    async getCardsToReviseOnDeck({ getters }) {
      await this.dispatch("APIRequest", {
        method: "GET",
        serverRoute: "/CardsToReviseOnDeck",
        data: "deck/" + getters.actualDeck.id,
        mutate: "cardsToReviseBaseList",
      });
    },
    async getUserByPseudo() {
      await this.dispatch("APIRequest", {
        method: "POST",
        serverRoute: "/ToGetUserByPseudo",
        data: { user: this.state.user },
        mutate: "user",
      });
    },
    mutateStore(context, payload) {
      // if (payload.value && payload.value.sKey) {
      //   let key = payload.value.sKey;
      //   setTimeout(() => {
      //     this.dispatch("mutateStore", {
      //       fct: "incrementKey",
      //       value: key,
      //     });
      //   });
      // }
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
          headers: req.headers || this.getters.defaultHeaders,
          data: req.data,
          form_data: req.form_data || false,
        })
          .then((response) => {
            if (response) {
              let result = {};
              result["sKey"] = req.mutate;
              result["body"] = response;
              this.dispatch("mutateStore", {
                fct: "mutateKey",
                value: result,
              });
            }

            if (req.mutate == "cardsList") context.commit("prepareDeck");
            // console.log(req.method + ' ' + req.mutate)
            this.dispatch("mutateStore", {
              fct: "mutateKey",
              value: { sKey: "loading", body: false },
            });

            return response;
          })
          .catch((error) => {
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
        let form = new FormData();
        for (let [key, value] of Object.entries(body)) {
          form.append(key, JSON.stringify(value));
        }
        body = form;
      } else if (typeof body === "object") {
        // body = object to send
        body = JSON.stringify(body);
      }

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
            return (res = await res.json().then((res) => {
              return res;
            }));
          } catch (error) {
            return null; // Si le serveur renvois un statut 2XX/3XX seul
          }
        }
      });
    },
  },
  getters: {
    actualCard: (state) => {
      let actualCard;
      let list = state.cardsToReviseBaseList;
      if (state.app.randomCardPick) {
        actualCard = list[Math.floor(Math.random() * list.length)];
      } else {
        actualCard = list[0];
      }
      return actualCard;
    },
    actualDeck: (state) => {
      let actualDeck;
      if (router.currentRoute._value.params.deck) {
        for (const deck of state.decksList) {
          if (deck.id == router.currentRoute._value.params.deck)
            actualDeck = deck;
        }
      } else {
        actualDeck = null;
      }
      return actualDeck;
    },
    defaultHeaders: (state) => {
      let headers = {};
      if (state.user.token) headers.Authorization = state.user.token;
      headers["Content-Type"] = "application/json";
      return headers;
    },
  },
  modules: {},
});
