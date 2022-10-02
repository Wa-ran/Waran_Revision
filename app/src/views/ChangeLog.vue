<template>
  <div class="container">
    <h2 class="mt-3">Changelogs :</h2>
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
          date: "27/04/22",
          bugs: [
            "Bug le stockage des caractères spéciaux (exemples: 'é', 'ㅊ').",
          ],
          improvements: [
            "Optimisation de la taille des images et de leur stockage.",
          ],
          todos: [],
        },
        {
          date: "26/04/22",
          bugs: [
            "Bug sur le remplacement des images lors de la modification de carte.",
          ],
          improvements: ["Fond blanc sur les images avec transparence."],
          todos: [],
        },
        {
          date: "23/04/22",
          bugs: [
            "Indexation correcte des éléments cliquables (pour les ceux qui naviguent au clavier et les lecteurs d'écran)(vous êtes aucun je sais)",
          ],
          improvements: [
            "Quelques ajustements graphiques, sur les liens notamment.",
          ],
          todos: [],
        },
        {
          date: "09/04/22",
          bugs: [
            "Mauvais enregistrement des textes <span class=\"italic\">lorsqu'ils n'étaient composés que de caractères numériques</span> (oui c'est très précis...)",
          ],
          improvements: ["Quelques ajustements graphiques."],
          todos: [],
        },
        {
          date: "18/03/22",
          bugs: [],
          improvements: [
            '<span class="bold">C\'est la version 2 du site les amis !</span> <span class="fs-4">&#127881;</span><br/>Au programme :',
            'Les cartes sont maintenant réunies par paquets (<span class="bold">decks</span>), bien plus simple pour organiser ses révisons.',
            'Vous pouvez utiliser des <span class="bold">images</span> !',
            "Le niveau des cartes s'adapte automatiquement si vous n'avez pas révisé depuis longtemps &#128521",
            "Enfin un vrai menu de création/modification de carte...",
            'Mise en place des decks "ordonnés" : un <span class="bold">exemple vous attend</span>...',
            "Pas mal d'ajouts par-ci par-là, j'espère que ça vous plaiera !",
            "Comme d'hab', n'hésitez pas à me faire des retours en cas de bugs ou d'idées d'ammélioration !",
          ],
          todos: [
            "J'espère qu'il n'y en pas, mais je ne me fais pas d'illusions &#128517",
          ],
        },
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
