<template>
  <div class="editor--main">
    <TextEditor @faceChange="changeFace($event)" class="deck" />
    <h3>Options :</h3>
    {{ faceSelected }}
    <CardEditor :cardFace="faceSelected" :key="faceSelected" />
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
