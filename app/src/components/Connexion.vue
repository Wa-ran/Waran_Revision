<template>
  <div class="d-flex justify-content-end">
    <div v-if="!connectForm" class="d-flex">
      <button
        type="button"
        class="btn btn-primary me-3"
        @click="connectForm = true"
      >
        Connexion
      </button>
      <button
        @click="setModal(modalSetting)"
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#modal"
        class="btn btn-outline-primary"
      >
        Inscription
      </button>
    </div>

    <div v-else class="w-75 d-flex justify-content-center">
      <FormConnexion />
      <button
        @click="connectForm = false"
        type="button"
        class="btn btn-outline-primary"
      >
        <font-awesome-icon :icon="['fas', 'times']" size="lg" />
      </button>
    </div>
  </div>
</template>

<script>
import FormConnexion from "@/components/forms/FormConnexion";

export default {
  name: "Connexion",
  components: {
    FormConnexion,
  },
  data() {
    return {
      connectForm: false,
      modalSetting: {
        title: "Site en développement !",
        text: 'Les inscriptions sont régulées pour le moment, vous pouvez m\'adresser une demande par mail à <a href = "mailto: mgs.gilles@gmail.com">mgs.gilles@gmail.com</a>.',
      },
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/global.scss";
input.form-control {
  background-color: $orange-100 !important;
}
</style>
