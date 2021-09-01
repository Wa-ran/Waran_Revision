import { createStore } from "vuex";

import revisionAPI from "../assets/API/revisionAPI";

export default createStore({
  state: {
    error: {
      pending: false,
      msg: "",
      status: "",
    },
    card: {
      card_id: "",
      recto: "",
      verso: "",
      streak: "",
      next_revision: "",
      user_id: "",
      required_cards: [],
      tags: [],
    },
    cardsList: [],
    defaultCard: {
      card_id: "",
      recto: "T'as lu le Texte du Jour ?",
      verso: '""',
      streak: 0,
      next_revision: "",
      user_id: "",
      required_cards: [],
      tags: [],
    },
    form: {
      revisionAPI: null,
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
      id: "",
      pseudo: "",
      token: "",
    },
  },
  mutations: {
    handleResponse(state, payload) {
      // state.cardsList = payload.cardsList;
      // state.tagsList = payload.tagsList;
      // state.user = payload.user;
      for (let res of payload) {
        if (state[res]) state[res] = res;
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
    },
    setSubmit(state, payload) {
      state.form.revisionAPI = payload.revisionAPI;
      state.form.submitPath = payload.submitPath;
    },
  },
  actions: {
    setLoading(context, payload) {
      context.commit("isLoading", payload);
    },
    setError(context, payload) {
      context.commit("triggError", { bool: payload });
    },
    chooseSubmit(context, payload) {
      context.commit("setSubmit", payload);
    },
    revisionAPI(context, req) {
      // req = { method: ..., serverRoute: ..., data: ...}
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
            context.commit("handleResponse", res);
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
