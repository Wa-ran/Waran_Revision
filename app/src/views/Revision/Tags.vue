<template>
  <div class="container">
    <div>
      <h3>Vos Tags :</h3>

      <TagsGestion
        @active="setTagRequest('getAllUserTags')"
        @mounted="submitTagRequest('getAllUserTags')"
        @submitTagRequest="submitTagRequest"
        @deleteButton="setTagRequest('deleteTag')"
        :chooseList="'tagsList'"
      >
        <template v-slot:default>
          <button @click="setTagRequest('postTag')">
            <span>Créer un Tag</span>
          </button>
          <button @click="setTagRequest('putTag')">
            <span>Modifier un Tag</span>
          </button>
        </template>
        <template v-slot:input>
          <input
            v-if="createOrModif"
            v-model="tagNameInput"
            autofocus
            placeholder="Sélectionnez"
          />
        </template>
      </TagsGestion>
    </div>

    <div v-if="tagsListLength > 0">
      <h3>Réviser par tags :</h3>

      <div v-if="tagsSelectedList.length > 1">
        <p>Les cartes doivent avoir :</p>
        <div class="multiButtons">
          <button
            @click="changeSearchTagCond('AND')"
            :class="searchTagsCond == 'AND' ? 'selected' : ''"
          >
            <span>Tous les tags</span>
          </button>
          <button
            @click="changeSearchTagCond('OR')"
            :class="searchTagsCond == 'OR' ? 'selected' : ''"
          >
            <span>Un des tags</span>
          </button>
        </div>
        <hr />
      </div>

      <TagsGestion
        @active="
          selectedList = 'tagsSelectedList';
          setTagRequest('getCardsToReviseByTags');
        "
        @submitTagRequest="refreshTagSelection"
        @deleteButton="handleTagSelection = 'remove'"
        :chooseList="'tagsSelectedList'"
      >
        <div>
          <button @click="handleTagSelection = 'add'">
            <span>Ajouter un tag</span>
          </button>
        </div>
      </TagsGestion>
    </div>

    <div v-if="tagsListLength > 0">
      <h3>Carte :</h3>

      <TagsGestion
        @active="
          selectedList = 'cardTagsList';
          setTagRequest('postCardTags');
        "
        @mounted="submitTagRequest('getCardTags')"
        @submitTagRequest="submitTagRequest"
        @deleteButton="
          handleTagSelection = 'remove';
          setTagRequest('deleteCardTag');
        "
        :chooseList="'cardTagsList'"
        :key="actualCard.id"
      >
        <div>
          <button @click="handleTagSelection = 'add'">
            <span>Ajouter un tag</span>
          </button>
        </div>
      </TagsGestion>
    </div>
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
      selectedList: "",
    };
  },
  computed: {
    actualCard() {
      return this.$store.state.actualCard;
    },
    actualTag() {
      return this.$store.state.actualTag;
    },
    createOrModif() {
      try {
        return this.tagRequest.match(/[post|put]Tag|/g);
      } catch (error) {
        return false;
      }
    },
    searchTagsCond() {
      return this.$store.state.searchTagsCond;
    },
    tagsListLength() {
      return this.$store.state.tagsList.length;
    },
    tagsSelectedList() {
      return this.$store.state.tagsSelectedList;
    },
    tagRequest() {
      return this.$store.state.tagRequest;
    },
  },
  methods: {
    async submitTagRequest(req = null) {
      req = req ? req : this.tagRequest;
      if (this.createOrModif) {
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
      if (
        req == "getCardsToReviseByTags" &&
        this.tagsSelectedList.length == 0
      ) {
        req = "getCardsToRevise";
      }
      await this.$store.dispatch(req);
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
    async refreshTagSelection() {
      if (this.handleTagSelection == "remove") {
        let newList = [];
        for (let tag of this.$store.state[this.selectedList]) {
          if (this.actualTag.id != tag.id) newList.unshift(tag);
        }
        this.$store.dispatch("mutateStore", {
          fct: "mutateKey",
          value: {
            mutate: this.selectedList,
            body: newList,
          },
        });
      }
      if (this.tagsSelectedList.length == 0) {
        await this.submitTagRequest("getCardsToRevise");
      } else await this.submitTagRequest();
      this.handleTagSelection = false;
    },
    resetKey(key) {
      this.$store.dispatch("mutateStore", {
        fct: "resetKey",
        value: key,
      });
    },
    async changeSearchTagCond(cond) {
      this.$store.dispatch("mutateStore", {
        fct: "mutateKey",
        value: {
          mutate: "searchTagsCond",
          body: cond,
        },
      });
      await this.submitTagRequest("getCardsToReviseByTags");
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
              mutate: this.selectedList,
              body: this.actualTag,
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
