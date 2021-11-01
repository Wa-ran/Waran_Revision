<template>
  <div class="container">
    <h3>Dernière maj :</h3>
    <div>
      <h4>Bugs réglés :</h4>
      <ul>
        <li>
          Le recto de la première carte ne se mettait pas à jour (compliqué pour
          réviser...).
        </li>
      </ul>
    </div>
    <div>
      <h4>Ammélioration :</h4>
      <ul>
        <li>
          Si votre navigateur complète automatiquement le formulaire de
          connexion, vous êtes directement connecté !
        </li>
        <li>
          Après une nouvelle inscription, le nouvel utilisateur est directement
          connecté.
        </li>
      </ul>
    </div>
    <div>
      <h4 class="italic">Bugs non traités :</h4>
      <ul>
        <li>
          L'envoi de tags en même temps qu'une nouvelle carte ne fonctionne pas.
        </li>
        <li>On ne peut pas supprimer de tags sur une carte neuve.</li>
        <li>La fonction Reset de l'éditeur est à amméliorer.</li>
        <li>
          On ne peut pas annuler la création d'une carte après y avoir fait des
          modifications.
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "betaMajInfo",
};
</script>

<style lang="scss" scoped>
.container {
  padding: 1rem;
  & > div {
    padding-left: 1rem;
  }
}
</style>