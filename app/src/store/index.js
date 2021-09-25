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
    loading: false,
    serverAddress: {
      waran_revision: "http://localhost:3000",
    },
    actualTag: {
      id: "",
      name: "",
      user_id: ",",
    },
    tagsList: [],
    searchTagsCond: "OR",
    searchTagsList: [],
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
    mutateKey(state, payload) {
      let mutate = payload.mutate;
      delete payload.mutate;
      if (Array.isArray(state[mutate]) && !Array.isArray(payload.body))
        state[mutate].unshift(payload.body);
      else {
        state[mutate] = payload.body;
      }
    },
    resetKey(state, stateKey) {
      if (Array.isArray(state[stateKey])) state[stateKey] = [];
      else state[stateKey] = "";
    },
    shiftKey(state, stateKey) {
      if (Array.isArray(state[stateKey])) state[stateKey].shift();
      else this.resetKey(stateKey);
    },
    deleteOneSearchTag(state) {
      let index = 0;
      for (let tag of state.searchTagsList) {
        if (tag.id == state.actualTag.id)
          return state.searchTagsList.slice(index, 1);
        index++;
      }
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
      payload.value = payload.value ? payload.value : null;
      context.commit(payload.fct, payload.value);
    },
    deleteCard() {
      this.dispatch("revisionRequest", {
        method: "DELETE",
        serverRoute: "/Card",
        data: { card: this.state.actualCard },
        mutate: "cardsList",
      });
    },
    deleteCardTag() {
      this.dispatch("revisionRequest", {
        method: "DELETE",
        serverRoute: "/CardTags",
        data: { card: this.state.actualCard, tag: this.state.actualTag },
        mutate: "actualCardTagsList",
      });
    },
    deleteTag() {
      this.dispatch("revisionRequest", {
        method: "DELETE",
        serverRoute: "/Tag",
        data: { tag: this.state.actualTag },
        mutate: "tagsList",
      });
    },
    postCard() {
      this.dispatch("revisionRequest", {
        method: "POST",
        serverRoute: "/Card",
        data: { card: this.state.actualCard },
        mutate: "cardsList",
      });
    },
    async postTag() {
      await this.dispatch("revisionRequest", {
        method: "POST",
        serverRoute: "/Tag",
        data: { tag: this.state.actualTag },
      })
        .then(() => {
          this.dispatch("getAllUserTags");
        })
    },
    postCardTags() {
      this.dispatch("revisionRequest", {
        method: "POST",
        serverRoute: "/CardTags",
        data: {
          card: this.state.actualCard,
          tag: this.state.actualCardTagsList,
        },
        mutate: "actualCardTagsList",
      });
    },
    putCard() {
      this.dispatch("revisionRequest", {
        method: "PUT",
        serverRoute: "/Card",
        data: { card: this.state.actualCard },
        mutate: "actualCard",
      });
    },
    async putTag() {
      await this.dispatch("revisionRequest", {
        method: "PUT",
        serverRoute: "/Tag",
        data: { tag: this.state.actualTag },
      })
        .then(() => {
          this.dispatch("getAllUserTags");
        })
    },
    getCardsToRevise() {
      this.dispatch("revisionRequest", {
        method: "GET",
        serverRoute: "/CardsToRevise",
        data: "user/" + this.state.user.id,
        mutate: "cardsList",
      });
    },
    getCardsToReviseByTags() {
      this.dispatch("revisionRequest", {
        method: "POST",
        serverRoute:
          "/getCardsToReviseByTags" + this.state.searchTagsCond.toUpperCase(),
        data: {
          user: this.state.user,
          tag: this.state.searchTagsList,
        },
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
        this.dispatch("mutateStore", { fct: "mutateKey", value: { mutate: "loading", body: true } });
        revisionAPI
          .request(
            req.method,
            this.state.serverAddress.waran_revision,
            req.serverRoute,
            this.state.headers,
            req.data
          )
          .then((response) => {
            if (req.mutate) {
              context.commit("shiftKey", req.mutate);
              let result = {};
              if (response) {
                result["mutate"] = req.mutate;
                result["body"] = response;
                this.dispatch("mutateStore", { fct: "mutateKey", value: result });
              }
            }
            this.dispatch("mutateStore", { fct: "mutateKey", value: { mutate: "loading", body: false } });
          })
          .catch((error) => {
            if (error.status !== 404) console.log(error);
            context.commit("triggError", {
              bool: true,
              status: error.status,
              msg: error.msg,
            });
            this.dispatch("mutateStore", { fct: "mutateKey", value: { mutate: "loading", body: false } });
            throw error;
          });
      }
    },
  },
  getters: {},
  modules: {},
});
