<template>
  <div @click="checked = !checked" class="check--button">
    <div v-if="checked" @click="$emit('check', false)">
      <button class="icon default">
        <font-awesome-icon :icon="['fas', 'check']" size="xs" />
      </button>
      <div>{{ desc }}</div>
    </div>
    <div v-else @click="$emit('check', true)">
      <button class="icon circle"></button>
      <div>{{ desc }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    desc: String,
    preChecked: { type: String, default: "" },
  },
  data() {
    return {
      checked: false,
    };
  },
  mounted() {
    this.checked = this.preChecked;
  },
};
</script>

<style lang="scss" scoped>
button.icon {
  padding: 0.25rem;
  border-radius: 100%;
  min-width: 1.1rem;
  max-width: 1.1rem;
  min-height: 1.1rem;
  max-height: 1.1rem;
  & > svg {
    margin: 0;
  }
}

.check--button {
  display: flex;
  & * {
    margin: 0.2rem;
  }
  & > div {
    margin-left: 0.3rem;
    display: flex;
  }
}
</style>
