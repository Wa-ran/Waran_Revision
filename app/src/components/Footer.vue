<template>
  <footer class="footer bg-dark py-2">
    <DarkSwitch v-if="$route.name !== 'ModifUser'" />
  </footer>
</template>

<script>
import DarkSwitch from "@/components/DarkSwitch";

export default {
  name: "Footer",
  components: {
    DarkSwitch,
  },
};
</script>

<style lang="scss" scoped>
footer {
  height: 3rem;
}
</style>
