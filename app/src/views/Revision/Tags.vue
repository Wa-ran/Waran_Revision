<template>
  <div class="container">
    <h3>Vos Tags :</h3>
    <TagsGestion
      @mounted="refreshReq('getAllUserTags')"
      @submitTagRequest="submitTagRequest"
      @deleteButton="setTagRequest('deleteTag')"
      :chooseList="'tagsList'"
    >
      <template v-slot:default>
        <button @click="setTagRequest('postTag')">Créer un Tag</button>
        <button @click="setTagRequest('putTag')">Modifier un Tag</button>
      </template>
      <template v-slot:input>
        <input
          v-if="createModif"
          v-model="tagNameInput"
          autofocus
          placeholder="Sélectionnez"
        />
      </template>
    </TagsGestion>

    <h3>Réviser par tags :</h3>
    <div v-if="tagsSelectedList.length > 1">
      <p>Les cartes doivent avoir :</p>
      <div class="multiButtons">
        <button
          @click="changeSearchTagCond('AND')"
          :class="searchTagsCond == 'AND' ? 'selected' : ''"
        >
          Tous les tags
        </button>
        <button
          @click="changeSearchTagCond('OR')"
          :class="searchTagsCond == 'OR' ? 'selected' : ''"
        >
          Un des tags
        </button>
      </div>
      <hr />
    </div>
    <TagsGestion
      @mounted="refreshTagSelection"
      @submitTagRequest="submitTagRequest"
      @deleteButton="setTagRequest('deleteSearchTag')"
      :chooseList="'tagsSelectedList'"
    >
      <div @click="setTagRequest('getCardsToReviseByTags')">
        <button @click="handleTagSelection = 'add'">
          <span>Ajouter un tag</span>
        </button>
        <button
          v-if="tagsSelectedList.length > 0"
          @click="handleTagSelection = 'remove'"
        >
          <span>Enlever un tag</span>
        </button>
      </div>
    </TagsGestion>

    <h3>Carte :</h3>
    <TagsGestion
      @submitTagRequest="submitTagRequest"
      @deleteButton="setTagRequest('deleteCardTag')"
      :chooseList="'cardTagsList'"
    >
      <button @click="setTagRequest('postCardTag')">
        <span>Ajouter un tag à la carte</span>
      </button>
    </TagsGestion>
  </div>
</template>

<script>
import TagsGestion from "@/components/TagsGestion.vue";

export default {
  name: "Tags",
  components: {
    TagsGestion,
  },
  data() {
    return {
      handleTagSelection: false,
      tagNameInput: "",
    };
  },
  computed: {
    actualCard() {
      return this.$store.state.actualCard;
    },
    actualTag() {
      return this.$store.state.actualTag;
    },
    createModif() {
      try {
        return this.tagRequest.match(/[post|put]Tag|/g);
      } catch (error) {
        return false;
      }
    },
    searchTagsCond() {
      return this.$store.state.searchTagsCond;
    },
    tagsSelectedList() {
      return this.$store.state.tagsSelectedList;
    },
    tagRequest() {
      return this.$store.state.tagRequest;
    },
  },
  methods: {
    async submitTagRequest() {
      let req = this.tagRequest;
      if (req == "deleteSearchTag") {
        this.$store.dispatch("mutateStore", {
          fct: "deleteSearchTag",
        });
      } else {
        if (this.createModif) {
          this.$store.dispatch("mutateStore", {
            fct: "mutateKey",
            value: {
              mutate: "actualTag",
              body: {
                id: this.actualTag.id,
                name: this.tagNameInput,
                user_id: this.$store.state.user.id,
              },
            },
          });
        }
        await this.$store.dispatch(req);
      }
    },
    setTagRequest(req) {
      this.$store.dispatch("mutateStore", {
        fct: "mutateKey",
        value: {
          mutate: "tagRequest",
          body: req,
        },
      });
    },
    async refreshReq(req) {
      await this.$store.dispatch(req);
    },
    async refreshTagSelection() {
      if (this.tagsSelectedList.length > 0) {
        await this.refreshReq("getCardsToReviseByTags");
      }
      this.handleTagSelection = false;
    },
    resetKey(key) {
      this.$store.dispatch("mutateStore", {
        fct: "resetKey",
        value: key,
      });
    },
    async changeSearchTagCond(cond) {
      this.setTagRequest("getCardsToReviseByTags");
      this.$store.dispatch("mutateStore", {
        fct: "mutateKey",
        value: {
          mutate: "searchTagsCond",
          body: cond,
        },
      });
      await this.submitTagRequest();
    },
  },
  watch: {
    actualCard() {
      if (this.actualCard.id) this.$store.dispatch("getCardTags");
    },
    actualTag() {
      this.tagNameInput = { ...this.actualTag }.name;
      if (this.actualTag.id) {
        if (this.handleTagSelection == "add") {
          this.$store.dispatch("mutateStore", {
            fct: "mutateKey",
            value: {
              mutate: "tagsSelectedList",
              body: this.actualTag,
            },
          });
        } else if (this.handleTagSelection == "remove") {
          let newList = [];
          for (let tag of this.tagsSelectedList) {
            if (this.actualTag.id != tag.id) newList.unshift(tag);
          }
          this.$store.dispatch("mutateStore", {
            fct: "mutateKey",
            value: {
              mutate: "tagsSelectedList",
              body: newList,
            },
          });
        }
      }
    },
    tagRequest() {
      this.resetKey("actualTag");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/global";

button {
  width: 100%;
}
h3 {
  margin-bottom: 0.5rem;
}
input {
  @include case_style;
  padding: 0.25rem 1rem;
}
.tags_list {
  margin: 1rem 0;
  display: flex;
  flex-wrap: wrap;
  & .tag {
    margin: 0.5rem 1rem 0.5rem 0;
  }
}
</style>
