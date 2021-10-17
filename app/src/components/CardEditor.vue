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
      :preChecked="false"
    />
    <div
      v-if="tagsListLength > 0"
      class="container--gestion"
      :key="actualCard.id"
    >
      <h3>Carte :</h3>

      <TagsGestion
        @active="
          gestionActive = true;
          selectedList = 'cardTagsList';
          setTagRequest('postCardTags');
        "
        @mounted="if (actualCard.id) submitTagRequest('getCardTags');"
        @submitTagRequest="
          submitTagRequest();
          cardTagsListKey++;
        "
        @deleteButton="setTagRequest('deleteCardTag')"
        @forcedOption="
          handleTagSelection = 'add';
          setTagRequest('postCardTags');
        "
        :chooseList="'cardTagsList'"
        :key="cardTagsListKey"
      >
        <div>
          <button
            @click="
              handleTagSelection = 'add';
              setTagRequest('postCardTags');
            "
          >
            <span>Ajouter un tag</span>
          </button>
        </div>
      </TagsGestion>
    </div>
  </div>
</template>

<script>
import CheckButton from "@/components/CheckButton.vue";
import TagsGestion from "@/components/TagsGestion.vue";

export default {
  name: "CardEditor",
  components: {
    CheckButton,
    TagsGestion,
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
