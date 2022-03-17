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
      allCardsDeckCheck: false,
      allCardsDropCheck: false,
      cardsListCharged: false,
      cardReviserCharged: false,
      deckSelected: false,
      decksCharged: false,
      hideFormModal: false,
      isFormPage: false,
      loading: false,
      positionSaved: null,
      revealCard: false,
      // check
      cardHideCheck: true,
      cardChronoCheck: true,
      cardFastCheck: true,
      darkMode: false,
      formVerif: true,
      randomCardPick: true,
      sequenceListCheck: false,
      windowSize: null,
    },

    // card
    allCardsList: [],
    cardsToReviseBaseList: [],
    cardsReservedList: [],
    actualCard: {},
    cardModifInProgress: false, // true when forms/modifCard mounted ; false when card submit
    newCard: {
      id: null,
      deck_id: null,
      recto: null,
      verso: null,
      level: 0,
      next_revision: null,
      user_id: null,
      comment: null,
      recto_formula: false,
      verso_formula: false,
      recto_image: null,
      verso_image: null,
      reverse: true,
      win: null,
    },

    // deck
    actualDeck: {},
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

    //image
    filePreview: null,
    imagePath: "http://127.0.0.1:8887/",
    filesInputs: [],

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
      // php_server: "https://waran.xyz/",
      // waran_revision: "http://195.110.59.46:3008",

      // Local Dev
      php_server: "http://localhost:8000/",
      waran_revision: "http://localhost:3008",
    },
  },
  mutations: {
    mergeReservedCards(state) {
      if (state.cardsReservedList.length > 0) {
        state.cardsToReviseBaseList = [
          ...state.cardsToReviseBaseList,
          ...state.cardsReservedList,
        ];
      }
      state.cardsReservedList = [];
    },
    mutateKey(state, payload) {
      let mutate = payload.sKey;
      if (Array.isArray(state[mutate]) && !Array.isArray(payload.body)) {
        if (state[mutate].length > 0) {
          for (let elem of state[mutate]) {
            if (JSON.stringify(elem) === JSON.stringify(payload.body)) return;
          }
        }
        state[mutate].push(payload.body);
      } else {
        state[mutate] = payload.body;
      }
    },
    removeListItem(state, payload) {
      state[payload.list] = state[payload.list].filter(
        (item) => item.id !== payload.item.id
      );
    },
    setState(state, payload) {
      Object.assign(state, payload);
    },
  },
  actions: {
    mutateStore(context, payload) {
      context.commit(payload.fct, payload.value || null);
    },
    reserveCard(context, payload) {
      context.commit("mutateKey", {
        sKey: "cardsReservedList",
        body: payload.item,
      });
      context.commit("removeListItem", payload);
    },
    async deleteCard(context, payload) {
      let cardId =
        payload && payload.card ? payload.card.id : this.state.actualCard.id;
      await this.dispatch("APIRequest", {
        method: "DELETE",
        serverRoute: "/Card",
        data: "card/" + cardId,
      });
    },
    async deleteDeck() {
      await this.dispatch("APIRequest", {
        method: "DELETE",
        serverRoute: "/Deck",
        data: "deck/" + this.state.actualDeck.id,
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
    async getAllDeckCards() {
      let deck = this.state.actualDeck.id
        ? this.state.actualDeck
        : this.getters.actualDeck;
      await this.dispatch("APIRequest", {
        method: "GET",
        serverRoute: "/AllDeckCards",
        data: "deck/" + deck.id,
        mutate: "allCardsList",
      });
    },
    async getCard(context, payload) {
      let cardId = payload ? payload.id : this.state.actualCard.id;
      await this.dispatch("APIRequest", {
        method: "GET",
        serverRoute: "/Card",
        data: "card/" + cardId,
        mutate: "actualCard",
      });
    },
    async getDeck(context, payload) {
      let deckId = payload ? payload.id : this.getters.actualDeck.id;
      await this.dispatch("APIRequest", {
        method: "GET",
        serverRoute: "/Deck",
        data: "deck/" + deckId,
        mutate: "actualDeck",
      });
    },
    async getCardsToReviseOnDeck() {
      let deck = this.state.actualDeck.id
        ? this.state.actualDeck
        : this.getters.actualDeck;
      await this.dispatch("APIRequest", {
        method: "GET",
        serverRoute: "/CardsToReviseOnDeck",
        data: "deck/" + deck.id,
        mutate: "cardsToReviseBaseList",
      });
    },
    async getLastUserCard() {
      await this.dispatch("APIRequest", {
        method: "GET",
        serverRoute: "/LastUserCard",
        data: "user/" + this.state.user.id,
        mutate: "actualCard",
      });
    },
    async getLastUserDeck() {
      await this.dispatch("APIRequest", {
        method: "GET",
        serverRoute: "/LastUserDeck",
        data: "user/" + this.state.user.id,
        mutate: "decksList",
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
    async postCard(context, req = null) {
      req = req
        ? req
        : {
            method: "POST",
            serverRoute: "/Card",
            data: { card: this.state.actualCard },
          };
      await this.dispatch("APIRequest", req);
    },
    async postDeck(context, deck) {
      await this.dispatch("APIRequest", {
        method: "POST",
        serverRoute: "/Deck",
        data: { deck },
        mutate: "deckList",
      });
    },
    async putCard(context, req = null) {
      req = req
        ? req
        : {
            method: "PUT",
            serverRoute: "/Card",
            data: { card: this.state.actualCard },
          };
      await this.dispatch("APIRequest", req);
    },
    async putDeck(context, deck) {
      await this.dispatch("APIRequest", {
        method: "PUT",
        serverRoute: "/Deck",
        data: { deck: Object.assign(this.state.actualDeck, deck) },
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
      let req = null;
      if (this.state.filesInputs.length > 0) {
        req = {};
        req["method"] = "POST";
        req["serverRoute"] = "";
        req["serverAddress"] =
          this.state.serverAddress.php_server + "post_img.php";
        req["headers"] = { Authorization: this.state.user.token };
        req["formData"] = true;
        req["data"] = {};
        req.data["user"] = this.state.user;
        req.data["card"] = this.state.actualCard;
      }
      if (!this.state.actualCard.id) await this.dispatch("postCard", req);
      else await this.dispatch("putCard", req);
    },
    async APIRequest(context, req) {
      if (!this.state.error.pending) {
        this.dispatch("mutateStore", {
          fct: "mutateKey",
          value: { sKey: "loading", body: true },
        });
        await this.dispatch("callAPI", {
          method: req.method,
          address: req.serverAddress || this.state.serverAddress.waran_revision,
          route: req.serverRoute,
          headers: req.headers || this.getters.defaultHeaders,
          data: req.data,
          formData: req.formData || false,
        })
          .then((response) => {
            if (response && req.mutate) {
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
            if (error.status !== 404) console.log("Error : " + error);
            // context.commit("triggError", {
            //   bool: true,
            //   status: error.status,
            //   msg: error.msg,
            // });
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

      if (method === "GET" || method === "DELETE") {
        route = route + "/" + body;
        body = null;
      } else if (req.formData) {
        route = "";
        let form = new FormData();
        for (let [key, value] of Object.entries(body)) {
          form.append(key, JSON.stringify(value));
        }
        for (let input of this.state.filesInputs) {
          form.append("files[]", input);
        }
        body = form;
      } else if (typeof body === "object") {
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
            return await res.json();
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
      } else if (
        state.actualDeck.sequence &&
        JSON.parse(state.actualDeck.sequence_list.length) > 0
      ) {
        for (let id of JSON.parse(state.actualDeck.sequence_list)) {
          pickCard = list.find((card) => card.id == id);
          if (pickCard) return pickCard;
        }
        pickCard = list[0];
      } else {
        pickCard = list[0];
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
