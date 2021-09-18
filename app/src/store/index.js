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
      user_id: "",
      required_cards: [],
      reverse: true,
    },
    newCard: {
      id: "",
      recto: "Une carte toute neuve !",
      verso: "",
      streak: 0,
      next_revision: "",
      user_id: "",
      required_cards: [],
      reverse: true,
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
    actualTag: {
      id: "",
      name: "",
      user_id: ",",
    },
    tagsList: [],
    actualCardTagsList: [],
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
      if (
        Array.isArray(state.actualCard[payload.key]) &&
        !Array.isArray(payload)
      )
        state.actualCard[payload.key].push(payload.value);
      else state.actualCard[payload.key] = payload.value;
    },
    changeActualTag(state, payload) {
      state.actualTag = payload;
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
    shiftTag(state) {
      state.tagsList.shift();
    },
    addTagToActualCard(state, payload) {
      state.actualCardTagsList.push(payload);
    },
    resetCardTags(state) {
      state.actualCardTagsList = [];
    },
    handleResponse(state, payload) {
      let mutate = payload.mutate;
      delete payload.mutate;
      if (Array.isArray(state[mutate]) && !Array.isArray(payload))
        state[mutate].push(payload);
      else state[mutate] = payload;
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
        serverRoute: "/Card",
        data: { card: this.state.actualCard },
      });
    },
    submitTag() {
      this.dispatch("revisionRequest", {
        method: "POST",
        serverRoute: "/Tag",
        data: { tag: this.state.actualTag },
      });
    },
    submitCardTags() {
      this.dispatch("revisionRequest", {
        method: "POST",
        serverRoute: "/CardTags",
        data: { card: this.state.actualCard, tag: this.state.actualCardTagsList },
        mutate: "actualCardTagsList",
      });
    },
    saveCardChanges() {
      this.dispatch("revisionRequest", {
        method: "PUT",
        serverRoute: "/Card",
        data: { card: this.state.actualCard },
        mutate: "actualCard",
      });
    },
    getCardsToRevise() {
      this.dispatch("revisionRequest", {
        method: "GET",
        serverRoute: "/CardsToRevise",
        data: "user/" + this.state.user.id,
        mutate: "cardsList",
      });
    },
    getAllUserTags() {
      this.dispatch("revisionRequest", {
        method: "GET",
        serverRoute: "/AllUserTags",
        data: "user/" + this.state.user.id,
        mutate: "tagsList",
      });
    },
    getCardTags() {
      this.dispatch("revisionRequest", {
        method: "GET",
        serverRoute: "/CardTags",
        data: "card/" + this.state.actualCard.id,
        mutate: "actualCardTagsList",
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
