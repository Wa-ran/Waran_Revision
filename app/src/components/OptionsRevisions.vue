<template>
  <Options :btnText="'Options de révisions'" :optionsList="optionsList" />
</template>

<script>
export default {
  name: "OptionsRevisions",
  data() {
    return {
      optionsList: [
        {
          appKey: "cardHideCheck",
          desc: "Cacher les cartes",
        },
        {
          appKey: "cardChronoCheck",
          desc: "Chronomètre",
        },
        {
          appKey: "cardFastCheck",
          desc: "Mode rapide",
          tooltipText: "Les cartes s'enchaînent, pas de modification !",
        },
      ],
    };
  },
};
</script>
