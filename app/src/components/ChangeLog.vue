<template>
  <div class="container">
    <h3>Changelogs :</h3>
    <BetaMajInfo
      v-for="(log, index) in logs"
      :key="index"
      :defaultShow="index == 0 ? true : false"
      :date="log.date"
      :bugs="log.bugs"
      :improvements="log.improvements"
      :todo="log.todo"
    />
  </div>
</template>

<script>
import BetaMajInfo from "@/components/BetaMajInfo.vue";

export default {
  name: "Changelog",
  components: {
    BetaMajInfo,
  },
  data() {
    return {
      logs: [
        {
          date: "02/11/21",
          bugs: [
            '<span class="bold">Hotfix</span> : Les modifications sur des cartes existantes avec un niveau de 0 n\'étaient (toujours) pas bien prises en comptes !',
            "<span class=\"bold\">SuperHotfix</span> : lorsque vous n'aviez plus qu'une carte, le site se bloquait !!",
            '<span class="bold">UltraHotfix</span> : l\'inscription ne marchait pas !!! x_x',
            "Un commentaire vide est automatiquement supprimé.",
          ],
          improvements: [
            "Moins d'appels au serveur (économie de bande passante).",
            "Optimisation du code (le site est plus rapide).",
            "Je peux changer l'apparence du text des changelogs :-)",
          ],
          todo: [
            "Problèmes avec les formules mathématiques.",
            "La révision de plusieurs cartes dans l'ordre est en préparation !",
            'Le bouton pour supprimer les commentaires reste à implémenter (<span class="underline">pour le moment, si le commentaire est vide, il sera supprimé</span>).',
          ],
        },
        {
          date: "02/11/21",
          bugs: [
            "L'envoi de tags avec une nouvelle carte fonctionne.",
            "On peut supprimer des tags lors de la création/modification de cartes.",
            "On peut annuler la création d'une carte, même s'il n'y a plus de carte à réviser.",
            "Les modifications sur des cartes existantes avec un niveau de 0 n'étaient pas bien prises en comptes.",
          ],
          improvements: [
            '"Dernière maj" est renommée en "Changelogs"',
            "Vous pouvez voir les anciens changelogs !",
            "Les changelogs, c'est bien :-)",
          ],
          todo: [
            "Problèmes avec les formules mathématiques.",
            "La révision de plusieurs cartes dans l'ordre est en préparation !",
            "Implémentation d'un bouton pour supprimer les commentaires.",
          ],
        },
        {
          date: "31/10/21",
          bugs: [
            "Le recto de la première carte ne se mettait pas à jour (compliqué pour réviser...).",
          ],
          improvements: [
            "Si votre navigateur complète automatiquement le formulaire de connexion, vous êtes directement connecté !",
            "Après une nouvelle inscription, le nouvel utilisateur est directement connecté.",
          ],
          todo: [
            "L'envoi de tags en même temps qu'une nouvelle carte ne fonctionne pas.",
            "On ne peut pas supprimer de tags sur une carte neuve.",
            "On ne peut pas annuler la création d'une carte après y avoir fait des modifications.",
          ],
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 1rem;
  & > div {
    padding-left: 1rem;
  }
}

@media (min-width: 767px) {
  .container {
    margin-left: 5rem;
  }
}
</style>
