<template>
  <div class="container">
    <div class="container--gestion">
      <h3>Tags de la carte :</h3>
      <TagsGestion
        v-if="tagsListLength > 0"
        @mounted="
          if (actualCard.id && !firstMount) submitTagRequest('getCardTags');
        "
        @submitTagRequest="if (actualCard.id) submitTagRequest();"
        @deleteButton="setTagRequest('deleteCardTag')"
        @annulation="annulation"
        @chooseListEmpty="setTagRequest('postCardTags')"
        :chooseList="'cardTagsList'"
      >
        <div>
          <button @click="setTagRequest('postCardTags')">
            <span>Ajouter un tag</span>
          </button>
        </div>
      </TagsGestion>
      <div v-else>Vous n'avez créé aucun tag.</div>
    </div>
  </div>
</template>

<script>
import TagsGestion from "@/components/TagsGestion.vue";

export default {
  name: "CardTags",
  components: {
    TagsGestion,
  },
  data() {
    return {
      firstMount: true,
      timer: null,
    };
  },
  computed: {
    actualCard() {
      return this.$store.state.actualCard;
    },
    actualTag() {
      return this.$store.state.actualTag;
    },
    originList() {
      return this.$store.state.originCardTagsList;
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
    annulation() {
      this.mutateKey("cardTagsList", this.originList);
    },
    async submitTagRequest(req = null) {
      req = req ? req : this.tagRequest;
      await this.$store.dispatch(req).then(() => {
        if (this.timer) clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.$store.dispatch("getCardTags");
        }, 300);
      });
    },
    setTagRequest(req) {
      this.mutateKey("tagRequest", req);
    },
  },
  mounted() {
    this.firstMount = false;
    if (this.tagsSelectedList.length > 0 && !this.actualCard.id) {
      this.mutateKey("cardTagsList", this.tagsSelectedList);
    }
    this.mutateKey("originCardTagsList", this.$store.state.cardTagsList);
  },
  unmounted() {
    this.mutateKey("originCardTagsList", []);
  },
  watch: {
    actualTag() {
      if (this.actualTag.id)
        if (this.tagRequest == "postCardTags")
          this.mutateKey("cardTagsList", this.actualTag);
      // else if (this.tagRequest == "deleteCardTag")
      //   this.$store.dispatch("mutateStore", {
      //     fct: "filterList",
      //     value: { sKey: "cardTagsList", findId: this.actualTag.id },
      //   });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/variables";

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
</style>
