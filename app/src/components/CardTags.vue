<template>
  <div class="container">
    <div v-if="actualCardTags.length > 0" class="container">
      <h3>Tags de la carte :</h3>

      <div class="tags_list">
        <Tag
          v-for="(tag, index) in actualCardTags"
          :key="index"
          :tagId="tag.id"
          :tagName="tag.name"
        />
      </div>
    </div>
  </div>
</template>

<script>
import cardInclination from "../mixins/cardInclination.vue";
import Tag from "@/components/Tag.vue";

export default {
  name: "CardTags",
  components: {
    Tag,
  },
  computed: {
    actualCard() {
      return this.$store.state.actualCard;
    },
    actualCardTags() {
      return this.$store.state.actualCardTagsList;
    },
  },
  async mounted() {
    this.$store.dispatch("mutateStore", {
      fct: "resetKey",
      value: "actualCardTagsList",
    });
    if (this.actualCard.id) await this.$store.dispatch("getCardTags");
  },
  mixins: [cardInclination],
};
</script>
