<template>
  <footer class="footer bg-dark py-2">
    <DarkSwitch />
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
