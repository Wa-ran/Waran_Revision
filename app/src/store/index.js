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
    actualCard: {},
    defaultCard: {
      id: "",
      recto: "C'est la dernière carte, Félicitation !",
      verso: "",
      streak: 0,
      next_revision: "",
      user_id: 1,
      required_cards: [],
      reverse: true,
      tags: [],
    },
    newCard: {
      id: "",
      recto: "Une carte toute neuve !",
      verso: "",
      streak: 0,
      next_revision: "",
      user_id: 1,
      required_cards: [],
      reverse: true,
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
    buildActualCard(state, payload) {
      state.actualCard = payload;
    },
    changeActualCard(state, payload) {
      state.actualCard[payload.key] = payload.value;
    },
    chargeFirstCard(state) {
      state.firstDeckCard = { ...state.cardsList[0] };
    },
    createCard(state) {
      state.cardsList.unshift(state.newCard);
    },
    shiftCard(state) {
      state.cardsList.shift();
    },
    handleResponse(state, payload) {
      let mutate = payload.mutate;
      delete payload.mutate;
      state[mutate] = payload;
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
    mutateStore(context, payload) {
      context.commit(payload.fct, payload.body);
    },
    submitCard(context) {
      context.commit("shiftCard");
      this.dispatch("revisionRequest", {
        method: "POST",
        serverRoute: "/OneCard",
        data: this.state.actualCard,
      });
    },
    submitCardChanges() {
      this.dispatch("revisionRequest", {
        method: "PUT",
        serverRoute: "/OneCard",
        data: this.state.actualCard,
        mutate: "actualCard",
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
            if (req.mutate) {
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
