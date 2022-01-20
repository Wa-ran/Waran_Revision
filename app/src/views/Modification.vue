<template>
  <div class="container fluid mx-auto">
    <component :is="$route.name" :exit="exit"></component>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  name: "Modification",
  components: {
    ModifCard: defineAsyncComponent(() =>
      import("@/components/forms/ModifCard.vue")
    ),
    ModifDeck: defineAsyncComponent(() =>
      import("@/components/forms/ModifDeck.vue")
    ),
    ModifUser: defineAsyncComponent(() =>
      import("@/components/forms/ModifUser.vue")
    ),
  },
  data() {
    return {
      exit: false,
    };
  },
  mounted() {
    this.mutateApp("isFormPage", true);
  },
  unmounted() {
    this.mutateApp("isFormPage", false);
  },
  async beforeRouteLeave(to, from, next) {
    const wait = new Promise((res) => {
      this.exit = true;
      setTimeout(() => {
        res();
      });
    });
    await wait
      .then(() => this.verifUnsavedChange())
      .then((res) => {
        next(res);
      });
  },
};
</script>

<style lang="scss" scoped>
.container-fluid {
  min-width: 300px;
}
</style>
