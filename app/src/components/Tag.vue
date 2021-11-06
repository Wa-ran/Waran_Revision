<template>
  <button
    v-if="tagId"
    @click="changeActualTag"
    :class="selected ? 'tag highlight' : 'tag'"
  >
    <slot>
      <span>{{ tagName }}</span>
    </slot>
  </button>
</template>

<script>
export default {
  name: "Tag",
  props: {
    tagId: Number,
    tagName: String,
  },
  data() {
    return {
      selected: false,
    };
  },
  computed: {
    actualtagId() {
      return this.$store.state.actualTag.id;
    },
    tagsSelectedList() {
      return this.$store.state.tagsSelectedList;
    },
    tagsSelectedListKey() {
      return this.$store.state.tagsSelectedListKey;
    },
  },
  methods: {
    changeActualTag() {
      this.mutateKey("actualTag", {
        id: this.tagId,
        name: this.tagName,
        user_id: this.$store.state.user.id,
      });
      this.$emit("chargeTag");
      this.selected = true;
    },
    isSelected() {
      if (this.actualtagId == this.tagId) this.selected = true;
      else if (this.tagsSelectedList.length > 0) {
        for (let tag of this.tagsSelectedList) {
          if (tag.id == this.tagId) {
            this.selected = true;
            return;
          }
          this.selected = false;
        }
      } else this.selected = false;
    },
  },
  mounted() {
    this.isSelected();
  },
  watch: {
    actualtagId() {
      this.isSelected();
    },
    tagsSelectedListKey() {
      this.isSelected();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/variables";

button.tag {
  border-radius: $card_rad;
  width: max-content;
  & > span {
    padding: 0;
  }
}
</style>
