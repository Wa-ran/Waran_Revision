<template>
  <div class="container-fluid">
    <h3 class="fs-5 italic mt-2 mb-3">Aperçu :</h3>
    <div class="position-relative w-100 p-0">
      <!-- Bouton modification -->
      <ButtonTopRight
        :link="{
          name: 'ModifCard',
          params: {
            card: actualCard.id,
          },
        }"
        :title="'Modifier la carte'"
      />
      <!-- Summary -->
      <div class="border border-primary rounded px-3 py-2">
        <span class="text-primary">{{
          actualCard.reverse ? "Recto :" : "Question"
        }}</span>
        <div
          v-if="!actualCard.recto_image"
          v-html="actualCard.recto"
          class="text-center px-3 mb-3"
        ></div>
        <CardImage v-else :card="actualCard" :face="'recto'" />

        <span class="text-primary">{{
          actualCard.reverse ? "Verso :" : "Réponse"
        }}</span>
        <div
          v-if="!actualCard.verso_image"
          v-html="actualCard.verso"
          class="text-center px-3 mb-3"
        ></div>
        <CardImage v-else :card="actualCard" :face="'verso'" />

        <cust-hr class="w-75 mx-auto" />

        <span v-if="actualCard.comment" class="text-center text-primary"
          >Commentaire :</span
        >
        <span v-else class="text-primary">Pas de commentaire</span>
        <div v-html="actualCard.comment" class="px-3 mb-3"></div>

        <cust-hr class="w-75 mx-auto" />
        <div class="mb-2">
          <span class="text-primary">Niveau :&nbsp;&nbsp;</span>
          <span class="bold">{{ mixShowLevel(actualCard) }}</span>
          <span v-if="mixShowRevision(actualCard)" class="italic"
            >&nbsp;&nbsp;(révision {{ mixShowRevision(actualCard) }})</span
          >
        </div>

        <div
          v-if="positionSaved && positionSaved.name == 'Revision'"
          class="mb-2"
        >
          <span class="text-primary">Révision :&nbsp;&nbsp;</span>
          <span v-if="actualCard.win == false">Perdue</span>
          <span v-else-if="actualCard.win == null">Presque</span>
          <span v-else>Gagnée</span>
        </div>

        <div class="mb-2">
          <span class="text-primary">Deck :&nbsp;&nbsp;</span>
          <span>{{ mixShowDeck(actualCard) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import card from "@/mixins/card";

export default {
  name: "CardView",
  computed: {
    actualCard() {
      return this.$store.state.actualCard;
    },
    positionSaved() {
      return this.$store.state.app.positionSaved;
    },
  },
  mixins: [card],
};
</script>
