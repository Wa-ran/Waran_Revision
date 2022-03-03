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
          appKey: "fastMode",
          desc: "Mode rapide",
        },
      ],
    };
  },
};
</script>
