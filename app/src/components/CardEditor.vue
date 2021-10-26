<template>
  <div>
    <CheckButton
      @check="setCardParams('reverse', $event)"
      :desc="'Inversion de la carte'"
      :preChecked="actualCard.reverse"
    />
    <CheckButton
      @check="setCardParams([cardFace + '_formula'], $event)"
      :desc="'Formule Mathématique'"
      :preChecked="actualCard[cardFace + '_formula']"
    />
    <CheckButton
      @check="modifComment($event)"
      :desc="'Modifer le commentaire'"
      :preChecked="modifCommentState"
      :key="modifCommentState"
    />
  </div>
</template>

<script>
import CheckButton from "@/components/CheckButton.vue";

export default {
  name: "CardEditor",
  components: {
    CheckButton,
  },
  props: {
    cardFace: { type: String, default: "recto" },
  },
  data() {
    return {
      cardTagsListKey: 0,
    };
  },
  computed: {
    actualCard() {
      return this.$store.state.actualCard;
    },
    modifCommentState() {
      return this.$store.state.modifComment;
    },
    tagsListLength() {
      return this.$store.state.tagsList.length;
    },
  },
  methods: {
    modifComment(modif) {
      this.mutateKey("modifComment", modif);
    },
    setCardParams(key, value) {
      let card = { ...this.$store.state.actualCard };
      card[key] = value;
      this.mutateKey("actualCard", card);
    },
  },
  mounted() {
    this.modifComment(false);
  },
};
</script>
