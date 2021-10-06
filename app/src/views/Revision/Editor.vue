<template>
  <div class="editor--main">
    <TextEditor class="deck" />
    <h3>Options :</h3>
    <CardEditor />
  </div>
</template>

<script>
import CardEditor from "@/components/CardEditor.vue";
import TextEditor from "@/components/TextEditor.vue";

export default {
  name: "Editor",
  components: {
    CardEditor,
    TextEditor,
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/global";

.editor--main {
  width: 100%;
  & > *:not(h3) {
    margin: 1rem;
  }
}

@media screen and (max-width: 767px) {
  .editor--main {
    margin: 0;
    width: 100%;
  }
}
</style>
