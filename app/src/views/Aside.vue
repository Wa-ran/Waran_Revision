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
    AsideRevision: defineAsyncComponent(() =>
      import("@/components/asides/AsideRevision.vue")
    ),
    AsideCardView: defineAsyncComponent(() =>
      import("@/components/asides/AsideCardView.vue")
    ),
    AsideModifCard: defineAsyncComponent(() =>
      import("@/components/asides/AsideCardView.vue")
    ),
  },
};
</script>
