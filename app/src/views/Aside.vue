<template>
  <div class="container-fluid p-0">
    <component :is="'Aside' + $route.name" />
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  name: "Aside",
  components: {
    AsideCardView: defineAsyncComponent(() =>
      import("@/components/LinkCardView.vue")
    ),
    AsideModifCard: defineAsyncComponent(() =>
      import("@/components/LinkCardView.vue")
    ),
  },
};
</script>