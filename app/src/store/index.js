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
    defaultCard: {
      id: "",
      recto: "Luc 17:5",
      verso: "Donne nous plus de foi.",
      streak: 0,
      next_revision: "",
      user_id: 2,
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
      id: "",
      pseudo: "",
      token: "",
    },
  },
  mutations: {
    createCard(state) {
      state.cardsList.unshift(state.defaultCard);
    },
    shiftCard(state) {
      state.cardsList.shift();
    },
    handleResponse(state, payload) {
      console.log(payload);
      if (payload.mutate == "card") {
        delete payload.mutate;
        state.cardsList.unshift(payload);
      } else {
        // Liste entière reçu
        for (let value of Object.entries(payload)) {
          state[payload.mutate] = value;
        }
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
    createCard(context) {
      context.commit("createCard");
    },
    submitCard(context) {
      let newCard = { ...this.state.cardsList[0] };
      context.commit("shiftCard");
      this.dispatch("revisionRequest", {
        method: "POST",
        serverRoute: "/OneCard",
        data: newCard,
        mutate: "card",
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
            res["mutate"] = req.mutate;
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
