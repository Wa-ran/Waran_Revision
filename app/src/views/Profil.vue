<template>
  <div class="container-fluid">
    <ModifUser />
  </div>
</template>

<script>
import ModifUser from "@/components/forms/ModifUser";

export default {
  name: "Profil",
  components: { ModifUser },
};
</script>

<style lang="scss" scoped>
.container-fluid {
  width: 80vw;
}
</style>
