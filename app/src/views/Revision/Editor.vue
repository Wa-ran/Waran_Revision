<template>
  <div class="editor--main">
    <!-- <TextEditor @faceChange="changeFace($event)" class="deck" /> -->
    <h3>Options :</h3>
    <CardEditor :cardFace="faceSelected" :key="faceSelected" />
    <CardTags :key="$store.getters.actualCardId" />
  </div>
</template>

<script>
import CardEditor from "@/components/CardEditor.vue";
// import TextEditor from "@/components/TextEditor.vue";
import CardTags from "@/components/CardTags.vue";

export default {
  name: "Editor",
  components: {
    CardEditor,
    // TextEditor,
    CardTags,
  },
  data() {
    return {
      faceSelected: "recto",
    };
  },
  methods: {
    changeFace(face) {
      let newFace = face.replaceAll("_comment", "");
      if (this.faceSelected != newFace) this.faceSelected = newFace;
    },
  },
  mounted() {
    if (!this.$store.state.randomNum)
      this.mutateKey(
        "randomNum",
        (Math.random() + 1).toString(36).substring(7)
      );
  },
};
</script>

<style lang="scss" scoped>
.editor--main {
  width: 100%;
  & > .deck {
    min-width: 350px;
  }
}

@media screen and (max-width: 767px) {
  .editor--main {
    margin: 0;
    width: 100%;
  }
}
</style>
