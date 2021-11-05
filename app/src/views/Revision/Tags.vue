<template>
  <div class="container">
    <div class="container--gestion">
      <h3>Vos Tags :</h3>

      <TagsGestion
        @active="
          setTagRequest('getAllUserTags');
          userTagSelected = true;
        "
        @optionSelected="userTagSelected = $event"
        @mounted="submitTagRequest('getAllUserTags')"
        @submitTagRequest="submitTagRequest(null, 'tagsListKey')"
        @deleteButton="setTagRequest('deleteTag')"
        @tagClick="
          if (!modifCard && !userTagSelected) {
            selectedList = 'tagsSelectedList';
            modifSearchTag('add', true);
          }
        "
        :chooseList="'tagsList'"
        :key="tagsListKey"
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

    <div v-if="tagsListLength > 0 && !modifCard" class="container--gestion">
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
        @submitTagRequest="refreshTagSelection('tagsSelectedListKey')"
        @deleteButton="mutateKey('handleTagSelection', 'remove')"
        @tagClick="
          if (!modifCard) {
            selectedList = 'tagsSelectedList';
            modifSearchTag('remove', true);
          }
        "
        @chooseListEmpty="mutateKey('handleTagSelection', 'add')"
        :chooseList="'tagsSelectedList'"
        :key="tagsSelectedListKey"
      >
        <div>
          <button @click="mutateKey('handleTagSelection', 'add')">
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
      tagsListKey: 0,
      tagsSelectedListKey: 0,
      cardTagsListKey: 0,
      tagNameInput: "",
      selectedList: "",
      userTagSelected: false,
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
    handleTagSelection() {
      return this.$store.state.handleTagSelection;
    },
    modifCard() {
      return this.$store.state.modifCard;
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
    async modifSearchTag(action, immediate = false) {
      action = action ? action : this.handleTagSelection;
      this.tagNameInput = { ...this.actualTag }.name;
      if (this.actualTag.id) {
        if (action == "add") {
          this.mutateKey(this.selectedList, this.actualTag);
        } else if (action == "remove") {
          let newList = [];
          for (let tag of this.$store.state[this.selectedList]) {
            if (this.actualTag.id != tag.id) newList.unshift(tag);
          }
          this.mutateKey(this.selectedList, newList);
        }
      }
      if (immediate) await this.submitTagRequest("getCardsToReviseByTags");
    },
    async submitTagRequest(req = null, refreshKey) {
      req = req ? req : this.tagRequest;
      if (this.createOrModif) {
        this.mutateKey("actualTag", {
          id: this.actualTag.id,
          name: this.tagNameInput,
          user_id: this.$store.state.user.id,
        });
      }
      if (
        req == "getCardsToReviseByTags" &&
        this.tagsSelectedList.length == 0
      ) {
        req = "getCardsToRevise";
      }
      await this.$store.dispatch(req).then(() => this[refreshKey]++);
    },
    setTagRequest(req) {
      this.mutateKey("tagRequest", req);
    },
    async refreshTagSelection(key) {
      if (this.tagsSelectedList.length == 0) {
        await this.submitTagRequest("getCardsToRevise", key);
      } else await this.submitTagRequest(null, key);
      this.mutateKey("handleTagSelection", false);
    },
    resetKey(key) {
      this.$store.dispatch("mutateStore", {
        fct: "resetKey",
        value: key,
      });
    },
    async changeSearchTagCond(cond) {
      this.mutateKey("searchTagsCond", cond);
      await this.submitTagRequest("getCardsToReviseByTags");
    },
  },
  watch: {
    actualTag() {
      if (!this.modifCard) this.modifSearchTag();
    },
    tagRequest() {
      this.resetKey("actualTag");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/variables";

h3 {
  margin-bottom: 0.5rem;
}
input {
  @include case_style;
  padding: 0.25rem 1rem;
}

.container {
  display: flex;
  flex-direction: column;
}
.tags_list {
  margin: 1rem 0;
  display: flex;
  flex-wrap: wrap;
  & .tag {
    margin: 0.5rem 1rem 0.5rem 0;
  }
}
.multiButtons {
  justify-content: center;
}
</style>
