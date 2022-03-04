<template>
  <div class="container-fluid p-0">
    <component :is="'Aside' + $route.name" />
  </div>
</template>

<script>
export default {
  name: "Aside",
};
</script>
