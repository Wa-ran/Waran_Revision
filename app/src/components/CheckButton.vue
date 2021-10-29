<template>
  <div class="check--button">
    <div @click="handleCheck">
      <button :class="checked ? 'icon default' : 'icon unchecked'">
        <font-awesome-icon :icon="['fas', 'check']" size="xs" />
      </button>
      <div>{{ desc }}</div>
    </div>
    <!-- <div>
      <button @click="handleCheck($event)" class="icon circle"></button>
      <div>{{ desc }}</div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    desc: String,
    preChecked: { type: Boolean, default: false },
  },
  data() {
    return {
      checked: false,
    };
  },
  methods: {
    handleCheck() {
      this.checked = !this.checked;
      this.$emit("check", this.checked);
    },
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
.unchecked {
  color: transparent;
}
</style>
