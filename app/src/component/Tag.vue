<template>
  <button
    @click="changeActualTag"
    @blur="selected = false"
    :class="selected ? 'tag selected' : 'tag'"
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
  methods: {
    changeActualTag() {
      this.$store.dispatch("mutateStore", {
        fct: "mutateKey",
        value: {
          mutate: "actualTag",
          body: {
            id: this.tagId,
            name: this.tagName,
            user_id: this.$store.state.user.id,
          },
        },
      });
      this.$emit("chargeTag");
      this.selected = true;
    },
  },
};
</script>
