import { createStore } from "vuex";

import revisionAPI from "../assets/API/revisionAPI";

export default createStore({
  state: {
    //card
    actualCard: {},
    cardsList: [],
    cardsToReviseLength: 0,
    firstDeckCard: {},
    modifCard: false,
    validModifCard: false,
    modifComment: false,
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
    cardChrono: true,

    error: {
      pending: false,
      msg: "",
      status: "",
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
      waran_revision: "http://195.110.59.46:3008",
      // waran_revision: "http://localhost:3008",
    },

    //tag
    actualTag: {
      id: "",
      name: "",
      user_id: "",
    },
    originCardTagsList: [],
    cardTagsList: [],
    searchTagsCond: "OR",
    tagsList: [],
    tagRequest: false,
    tagsSelectedList: [],
    handleTagSelection: false,
    tagGestionRefreshKey: 0,

    user: {
      id: "",
      pseudo: "",
      token: "",
    },
    randomNum: null,
  },
  mutations: {
    changeUser(state, payload) {
      try {
        state.newCard.user_id = payload.id;
        state.headers.Authorization = payload.token;
      } catch (error) {
        state.newCard.user_id = "";
        state.headers.Authorization = "";
      }
    },
    mutateKey(state, payload) {
      let mutate = payload.mutate;
      delete payload.mutate;
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
    resetKey(state, sKey) {
      if (Array.isArray(state[sKey])) state[sKey] = [];
      else state[sKey] = "";
    },
    shiftKey(state, payload) {
      if (payload == "newCard") {
        state.cardsList.shift();
      } else {
        let sKey = payload.skey;
        let findId = payload.findId ? payload.findId : state.actualCard.id;
        if (sKey == "cardsList") {
          let list = state.cardsList.filter((item) => item.id !== findId);
          state.cardsList = list;
        } else if (Array.isArray(state[sKey])) state[sKey].shift();
        else state[sKey] = "";
      }
    },
    enlistActualCard(state) {
      if (state.actualCard.id) {
        state.cardsList.filter((card) => card.id != state.actualCard.id);
        state.cardsList.unshift({ ...state.actualCard });
      }
    },
    refreshLength(state, sKey) {
      if (Array.isArray(state[sKey])) {
        state[sKey].push("");
        setTimeout(() => {
          state[sKey].pop();
        });
      }
    },
    deleteSearchTag(state) {
      let index = 0;
      for (let tag of state.tagsSelectedList) {
        if (tag.id == state.actualTag.id)
          return state.tagsSelectedList.slice(index, 1);
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
    async deleteCard() {
      await this.dispatch("revisionRequest", {
        method: "DELETE",
        serverRoute: "/Card",
        data: { card: this.state.actualCard },
        mutate: "cardsList",
      });
    },
    async deleteCardTag() {
      await this.dispatch("revisionRequest", {
        method: "DELETE",
        serverRoute: "/CardTags",
        data: { card: this.state.actualCard, tag: this.state.actualTag },
        mutate: "cardTagsList",
      });
    },
    async deleteTag() {
      await this.dispatch("revisionRequest", {
        method: "DELETE",
        serverRoute: "/Tag",
        data: { tag: this.state.actualTag },
        mutate: "tagsList",
      });
    },
    async postCard() {
      if (!this.state.actualCard.user_id)
        this.state.actualCard.user_id = this.state.user.id;
      await this.dispatch("revisionRequest", {
        method: "POST",
        serverRoute: "/Card",
        data: { card: this.state.actualCard },
        mutate: "cardsList",
      });
    },
    async postTag() {
      if (!this.state.actualTag.user_id)
        this.state.actualTag.user_id = this.state.user.id;
      await this.dispatch("revisionRequest", {
        method: "POST",
        serverRoute: "/Tag",
        data: { tag: this.state.actualTag },
        mutate: "tagsList",
      });
    },
    async postUser() {
      await this.dispatch("revisionRequest", {
        method: "POST",
        serverRoute: "/User",
        data: { user: this.state.user },
        mutate: "user",
        alert: true,
      });
    },
    async postCardTags() {
      if (this.state.actualCard.id) {
        await this.dispatch("revisionRequest", {
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
    async postCardWithTags() {
      if (!this.state.actualCard.user_id)
        this.state.actualCard.user_id = this.state.user.id;
      await this.dispatch("revisionRequest", {
        method: "POST",
        serverRoute: "/CardWithTags",
        data: {
          card: this.state.actualCard,
          tag: this.state.cardTagsList,
          user: this.state.user,
        },
        mutate: "cardsList",
      });
    },
    async putCard() {
      if (this.state.actualCard.id) {
        await this.dispatch("revisionRequest", {
          method: "PUT",
          serverRoute: "/Card",
          data: { card: this.state.actualCard },
          mutate: "cardsList",
        });
      }
    },
    async putTag() {
      if (this.state.actualTag.id) {
        await this.dispatch("revisionRequest", {
          method: "PUT",
          serverRoute: "/Tag",
          data: { tag: this.state.actualTag },
          mutate: "tagsList",
        });
      }
    },
    async getCardsToRevise() {
      await this.dispatch("revisionRequest", {
        method: "GET",
        serverRoute: "/CardsToRevise",
        data: "user/" + this.state.user.id,
        mutate: "cardsList",
      }).then(() => {
        this.dispatch("mutateStore", {
          fct: "mutateKey",
          value: {
            mutate: "cardsToReviseLength",
            body: this.state.cardsList.length - 1,
          },
        });
      });
    },
    async getCardsToReviseByTags() {
      await this.dispatch("revisionRequest", {
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
    async getAllUserTags() {
      await this.dispatch("revisionRequest", {
        method: "GET",
        serverRoute: "/AllUserTags",
        data: "user/" + this.state.user.id,
        mutate: "tagsList",
      });
    },
    async getCardTags() {
      await this.dispatch("revisionRequest", {
        method: "GET",
        serverRoute: "/CardTags",
        data: "card/" + this.state.actualCard.id,
        mutate: "cardTagsList",
      });
    },
    async getUser() {
      await this.dispatch("revisionRequest", {
        method: "POST",
        serverRoute: "/getUser",
        data: { user: this.state.user },
        mutate: "user",
        alert: true,
      });
    },
    async revisionRequest(context, req) {
      if (!this.state.error.pending) {
        await this.dispatch("mutateStore", {
          fct: "mutateKey",
          value: { mutate: "loading", body: true },
        });
        await revisionAPI
          .request(
            req.method,
            this.state.serverAddress.waran_revision,
            req.serverRoute,
            this.state.headers,
            req.data
          )
          .then((response) => {
            if (response) {
              let result = {};
              result["mutate"] = req.mutate;
              result["body"] = response;
              this.dispatch("mutateStore", {
                fct: "mutateKey",
                value: result,
              });
            }

            if (req.mutate) {
              context.commit("refreshLength", req.mutate);
            }
            // console.log(req.method + ' ' + req.mutate)
            this.dispatch("mutateStore", {
              fct: "mutateKey",
              value: { mutate: "loading", body: false },
            });
          })
          .catch((error) => {
            if (req.alert) alert(error.msg);
            if (error.status !== 404) console.log(error);
            context.commit("triggError", {
              bool: true,
              status: error.status,
              msg: error.msg,
            });
            this.dispatch("mutateStore", {
              fct: "mutateKey",
              value: { mutate: "loading", body: false },
            });
            throw error;
          });
      }
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
