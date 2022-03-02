import { createStore } from "vuex";
import router from "@/router";

export default createStore({
  state: {
    // app
    app: {
      // state
      actionDisconnect: false,
      actualCardChange: 0,
      allCardsShowCheck: false,
      cardsListCharged: false,
      cardReviserCharged: false,
      deckSelected: false,
      decksCharged: false,
      isFormPage: false,
      positionSaved: null,
      revealCard: false,
      // check
      cardHideCheck: true,
      cardChronoCheck: true,
      darkMode: false,
      fastMode: true,
      formVerif: true,
      randomCardPick: true,
    },

    // card
    allCardsList: [],
    cardsToReviseBaseList: [],
    cardsToReviseReserved: [],
    actualCard: {},
    cardModifInProgress: false, // true when forms/modifCard mounted ; false when card submit
    newCard: {
      recto: "Une carte toute neuve :)",
      verso: "",
      level: 0,
      next_revision: "",
      user_id: "",
      comment: "",
      recto_formula: false,
      verso_formula: false,
      recto_image: false,
      verso_image: false,
      reverse: true,
      new: true,
      win: null,
    },

    // deck
    decksList: [],

    // user
    user: {
      id: "",
      pseudo: "",
      token: "",
    },

    //form
    formCompare: {
      source: null,
      modified: null,
    },

    //modal
    modal: {
      title: null,
      text: null,
    },
    modalAnswer: false,
    modalDisplay: false,

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
    mergeReservedCards(state) {
      state.cardsToReviseBaseList = [
        ...state.cardsToReviseBaseList,
        ...state.cardsToReviseReserved,
      ];
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
        state[mutate].push(payload.body);
      } else {
        state[mutate] = payload.body;
      }
    },
    removeCard(state) {
      let index = state.cardsToReviseBaseList.indexOf(state.actualCard.key);
      state.cardsToReviseBaseList.splice(index, 1);
    },
    setState(state, payload) {
      Object.assign(state, payload);
    },
  },
  actions: {
    mutateStore(context, payload) {
      context.commit(payload.fct, payload.value || null);
    },
    reserveCard(context) {
      context.commit("mutateKey", {
        sKey: "cardsToReviseReserved",
        body: this.state.actualCard,
      });
      context.commit("removeCard");
    },
    async deleteCard() {
      await this.dispatch("APIRequest", {
        method: "DELETE",
        serverRoute: "/Card",
        data: { card: this.state.actualCard },
      });
    },
    async deleteDeck() {
      await this.dispatch("APIRequest", {
        method: "DELETE",
        serverRoute: "/Deck",
        data: { deck: this.getters.actualDeck },
      });
    },
    async getAllUserDecks() {
      await this.dispatch("APIRequest", {
        method: "GET",
        serverRoute: "/AllUserDecks",
        data: "user/" + this.state.user.id,
        mutate: "decksList",
      });
    },
    async getAllUserCards() {
      await this.dispatch("APIRequest", {
        method: "GET",
        serverRoute: "/AllUserCards",
        data: "user/" + this.state.user.id,
        mutate: "allCardsList",
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
    async postCard() {
      await this.dispatch("APIRequest", {
        method: "POST",
        serverRoute: "/Card",
        data: { card: this.state.actualCard },
      });
    },
    async postDeck(context, deck) {
      await this.dispatch("APIRequest", {
        method: "POST",
        serverRoute: "/Deck",
        data: { deck },
        mutate: "deckList",
      });
    },
    async putCard() {
      await this.dispatch("APIRequest", {
        method: "PUT",
        serverRoute: "/Card",
        data: { card: this.state.actualCard },
        mutate: "actualCard",
      });
    },
    async putDeck({ getters }, deck) {
      await this.dispatch("APIRequest", {
        method: "PUT",
        serverRoute: "/Deck",
        data: { deck: Object.assign(getters.actualDeck, deck) },
        mutate: "deckList",
      });
    },
    async putUser(context, payload) {
      await this.dispatch("APIRequest", {
        method: "PUT",
        serverRoute: "/User",
        data: { user: payload },
      });
    },
    async submitCard() {
      await new Promise(() => {
        if (!this.state.actualCard.id) return this.dispatch("postCard");
        else return this.dispatch("putCard");
      });
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
    pickCard: (state) => {
      let pickCard;
      let list = state.cardsToReviseBaseList;
      if (state.app.randomCardPick) {
        let rand = Math.floor(Math.random() * list.length);
        pickCard = list[rand];
        pickCard.key = rand;
      } else {
        pickCard = list[0];
        pickCard.key = 0;
      }
      return pickCard;
    },
    actualDeck: (state) => {
      let actualDeck;
      if (router.currentRoute._value.params.deck) {
        for (const deck of state.decksList) {
          if (deck.id == router.currentRoute._value.params.deck)
            actualDeck = deck;
        }
      } else if (router.currentRoute._value.params.card) {
        for (const deck of state.decksList) {
          if (deck.id == state.actualCard.deck_id) actualDeck = deck;
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
