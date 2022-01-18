<template>
  <div class="container-fluid">
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
  },
};
</script>
