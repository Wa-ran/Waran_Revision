<template>
  <div class="mx-auto">
    <ModifDeck />
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  name: "Modification",
  components: {
    ModifDeck: defineAsyncComponent(() =>
      import("@/components/forms/ModifDeck.vue")
    ),
  },
};
</script>
