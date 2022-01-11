<template>
  <div class="mx-auto"><component :is="$route.name"></component></div>
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
  },
};
</script>
