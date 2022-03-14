<template>
  <div class="overlay w-100">
    <div class="position-relative w-100 p-2">
      <!-- Options -->
      <div class="position-absolute top-0 container-fluid p-0">
        <component :is="'Options' + $route.name" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  name: "Overlay",
  components: {
    OptionsAllCards: defineAsyncComponent(() =>
      import("@/components/OptionsAllCards.vue")
    ),
    OptionsRevision: defineAsyncComponent(() =>
      import("@/components/OptionsRevisions.vue")
    ),
  },
};
</script>
