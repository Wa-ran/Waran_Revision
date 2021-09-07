import { createStore } from "vuex";

import revisionAPI from "../assets/API/revisionAPI";

export default createStore({
  state: {
    error: {
      pending: false,
      msg: "",
      status: "",
    },
    cardsList: [],
    firstDeckCard: {},
    defaultCard: {
      id: "",
      recto: "Texte du Jour ?",
      verso: "",
      streak: 0,
      next_revision: "",
      user_id: 1,
      required_cards: [],
      tags: [],
    },
    form: {
      revisionRequest: null,
      submitPath: null,
    },
    headers: {
      Authorization: "",
      "Content-Type": "application/json",
    },
    loading: true,
    serverAddress: {
      waran_revision: "http://localhost:3000",
    },
    tagsList: [],
    user: {
      id: 1,
      pseudo: "",
      token: "",
    },
  },
  mutations: {
    changeUser(state, payload) {
      state.user.id = payload;
      state.defaultCard.user_id = payload;
    },
    chargeCard(state) {
      state.firstDeckCard = { ...state.cardsList[0] };
    },
    createCard(state) {
      state.cardsList.unshift(state.defaultCard);
    },
    shiftCard(state) {
      state.cardsList.shift();
    },
    handleResponse(state, payload) {
      let mutate = payload.mutate;
      delete payload.mutate;
      if (mutate == "card") {
        payload.next_revision = new Date(payload.next_revision);
        state.cardsList.unshift(payload);
      } else {
        for (let item of payload) {
          if (item.next_revision)
            item.next_revision = new Date(item.next_revision);
        }
        if (Array.isArray(payload)) state[mutate] = payload;
        else state[mutate].push(payload);
      }
    },
    isLoading(state, payload) {
      state.loading = payload;
    },
    triggError(state, payload) {
      if (payload.status !== 404) {
        state.error.pending = payload.bool;
        state.error.msg = payload.msg ? payload.msg : "";
        state.error.status = payload.status ? payload.status : "";
      }
      state.error.pending = false;
    },
    setSubmit(state, payload) {
      state.form.revisionAPI = payload.revisionAPI;
      state.form.submitPath = payload.submitPath;
    },
  },
  actions: {
    changeUser(context, payload) {
      context.commit("changeUser", payload);
    },
    chargeCard(context) {
      context.commit("chargeCard");
    },
    createCard(context) {
      context.commit("createCard");
    },
    shiftCard(context) {
      context.commit("shiftCard");
    },
    submitCard(context, actualcard) {
      context.commit("shiftCard");
      this.dispatch("revisionRequest", {
        method: "POST",
        serverRoute: "/OneCard",
        data: actualcard,
        mutate: "card",
        dontChargeDeck: true,
      });
    },
    getCardsToRevise() {
      this.dispatch("revisionRequest", {
        method: "GET",
        serverRoute: "/List/CardsToRevise",
        data: this.state.user.id,
        mutate: "cardsList",
      });
    },
    setLoading(context, payload) {
      context.commit("isLoading", payload);
    },
    setError(context, payload) {
      context.commit("triggError", { bool: payload });
    },
    chooseSubmit(context, payload) {
      context.commit("setSubmit", payload);
    },
    revisionRequest(context, req) {
      if (!this.state.error.pending) {
        context.commit("isLoading", true);
        return revisionAPI
          .request(
            req.method,
            this.state.serverAddress.waran_revision,
            req.serverRoute,
            this.state.headers,
            req.data
          )
          .then((res) => {
            if (!req.dontChargeDeck) {
              res["mutate"] = req.mutate;
              context.commit("handleResponse", res);
            }
            context.commit("isLoading", false);
          })
          .catch((error) => {
            if (error.status !== 404) console.log(error);
            context.commit("triggError", {
              bool: true,
              status: error.status,
              msg: error.msg,
            });
            context.commit("isLoading", false);
            throw error;
          });
      }
    },
  },
  getters: {},
  modules: {},
});
