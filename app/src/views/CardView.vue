<template>
  <div class="container-fluid">
    <router-view v-if="$route.name == 'ModifCard'" />
    <div v-else>
      <span class="text-primary">{{
        actualCard.reverse ? "Recto :" : "Question"
      }}</span>
      <div
        v-html="actualCard.recto"
        class="border-start border-primary px-3 mb-3"
      ></div>

      <span class="text-primary">{{
        actualCard.reverse ? "Verso :" : "Réponse"
      }}</span>
      <div
        v-html="actualCard.verso"
        class="border-start border-primary px-3 mb-3"
      ></div>
      <cust-hr class="w-75 mx-auto" />

      <span v-if="actualCard.comment" class="text-primary">Commentaire :</span>
      <span v-else class="text-primary">Pas de commentaire</span>
      <div v-html="actualCard.comment"></div>

      <cust-hr class="w-75 mx-auto" />
      <span class="text-primary">Niveau :&nbsp;&nbsp;</span>
      <span class="bold">{{ showLevel() }}</span>
      <span class="italic">&nbsp;&nbsp;(révision ~ {{ showRevision() }})</span>

      <div class="w-fit ms-auto mt-3">
        <cust-title
          id="modifCardButton"
          :text="'Modifier la carte'"
          class="w-fit ms-auto"
        >
          <template v-slot:default>
            <button
              @click="
                $router.push({
                  name: 'ModifCard',
                  params: {
                    card: actualCard.id,
                  },
                })
              "
              aria-labelledby="modifCardButton"
              class="position-relative btn btn-outline-primary h-fit w-fit p-1"
            >
              <font-awesome-icon :icon="['fas', 'cog']" size="lg" />
            </button>
          </template>
        </cust-title>

        <button
          @click="submitCard"
          class="btn btn-primary h-fit w-fit mt-2 py-0 fs-5"
        >
          Valider
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardView",
  data() {
    return {
      hours: {
        0: 0,
        1: 2,
        2: 6,
        3: 12,
        4: 12,
        5: 21,
        6: 21,
        7: 36,
        8: 36,
        9: 60,
        10: 60,
        11: 96,
        12: 96,
        13: 156,
        14: 156,
        15: 252,
        16: 252,
        17: 408,
        18: 408,
        19: 660,
        20: 660,
        21: 1068,
        22: 1068,
        23: 1728,
        24: 1728,
        25: 2796,
        26: 2796,
        27: 4524,
        28: 4524,
        29: 7320,
        30: 7320,
      },
    };
  },
  computed: {
    actualCard() {
      return this.$store.state.actualCard;
    },
  },
  methods: {
    showLevel() {
      let level = Math.trunc(this.actualCard.level / 2);
      if (this.actualCard.level % 2 === 1) level++;
      else if (level !== 0) level += "+";
      return level;
    },
    showRevision() {
      let next = new Date(
        new Date().setTime(
          new Date().getTime() +
            this.hours[this.actualCard.level] * 60 * 60 * 1000
        )
      );
      let showDate = new Date(next - Date.now());
      if (showDate.getTime() / 3600000 < 48)
        return "toutes les " + Math.round(showDate / 3600000) + " heures.";
      else if (
        showDate.getTime() / 3600000 > 48 &&
        showDate.getTime() / (3600000 * 24) < 14
      )
        return "tous les " + Math.round(showDate / (3600000 * 24)) + " jours.";
      else return "d'ici le " + next.getDate() + "/" + (1 + next.getMonth());
    },
  },
  watch: {
    $route() {
      console.log("coucou");
    },
  },
};
</script>

<style lang="scss" scoped>
.container-fluid {
  width: 80vw;
}
</style>
