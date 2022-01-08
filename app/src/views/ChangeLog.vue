<template>
  <div class="container">
    <h2>Changelogs :</h2>
    <BetaMajInfo
      v-for="(log, index) in logs"
      :key="index"
      :defaultShow="index == 0 ? true : false"
      :date="log.date"
      :bugs="log.bugs"
      :improvements="log.improvements"
      :todos="log.todos"
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
          date: "05/12/21",
          bugs: [
            "Bug au copier/coller lors de la création de carte.",
            "Bugs de l'éditeur de texte.",
          ],
          improvements: [
            "Amélioration de l'algorithme : l'objectif est d'atteindre le <span class=\"bold\">niveau 10</span> sur les cartes (délai de révision de 2 semaines) : à ce niveau, la carte devient quasi innoubliable !",
          ],
          todos: [],
        },
        {
          date: "08/11/21",
          bugs: [
            '<span class="italic">Notre hébergeur, OVH, a effectué une mise à jour <span class="underline">indépendante de la volonté de la direction</span>, dans la nuit du 09 novembre ; nos plus plates (comme une crèpe) excuses !</span>',
          ],
          improvements: [
            '<span class="underline">Ajout d\'une page ou vous pouvez <span class="bold">voir et modifer</span> TOUTES vos cartes !</span> ^^',
          ],
          todos: [
            "Sûrement de nouveaux bugs suite à l'implémentation de la récupération de toutes les cartes, notamment :",
            '<span class="bold">Connu</span> : il faut resélectionner la carte dans la liste pour constater les changements fais dessus.',
            '<span class="bold">Connu</span> : Les cartes modifées voient leur prochaine révision être mise à jour ! (Exemple : si vous modifez une carte de niveau 10, qui doit être révisée dans 1 jour, son compteur sera remis à zéro, vous la réviserez donc dans 3 jours).',
            '<span class="bold">Connu</span> : Il n\'est pas possible de supprimer une carte depuis cette page (vous pouvez cependant la mettre au niveau 0 et aller la supprimer dans l\'onglet "Révision").<br><br>',
            "Problèmes avec les formules mathématiques à confirmer...",
            "La révision de plusieurs cartes dans l'ordre (bêta) est presque prête !",
            "Aurélien me l'a dit hier mais il semblerait que je ne soit pas très drôle ?",
          ],
        },
        {
          date: "05/11/21",
          bugs: [
            '<span class="bold">Hotfix</span> : Les modifications sur des cartes existantes avec un niveau de 0 n\'étaient (toujours) pas bien prises en comptes !',
            "<span class=\"bold\">SuperHotfix</span> : lorsque vous n'aviez plus qu'une carte, le site se bloquait !!",
            '<span class="bold">UltraHotfix</span> : l\'inscription ne marchait pas !!! x_x',
            "Un commentaire vide est automatiquement supprimé.",
            "La dernière carte (à réviser ou en création) ne disparaissait pas.",
            "L'éditeur de texte n'enregistrait pas la dernière modification.",
          ],
          improvements: [
            "Moins d'appels au serveur (économie de bande passante).",
            "Optimisation du code (le site est plus rapide).",
            "Je peux changer l'apparence du texte des changelogs :-)",
          ],
          todos: [
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
          todos: [
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
          todos: [
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
  padding: 0.5rem 5%;
}

@media (min-width: 767px) {
  .container {
    margin-left: -5rem;
    width: 600px;
  }
}
</style>
