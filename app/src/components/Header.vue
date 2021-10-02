<template>
  <header>
    <select name="user" id="User" @change="changeUser">
      <option value="1">test</option>
      <option value="2">Waran</option>
    </select>
    <label for="User">{{ actualUser }}</label>
  </header>
</template>

<script>
export default {
  name: "Header",
  computed: {
    actualUser() {
      return this.$store.state.user;
    },
  },
  methods: {
    changeUser($event) {
      this.$store.dispatch("mutateStore", {
        fct: "changeUser",
        value: $event.target.value,
      });
      this.$emit("userChange");
    },
  },
};
</script>
