<template>
  <div id="home">
    <Card />
    <Card />
    <Card />
    <Card />
    <Card />
    <Card />
    <Card />
    <Card />
    <Card />
  </div>
</template>

<script>
// @ is an alias to /src
import Card from "@/components/Card.vue";

export default {
  name: "Home",
  components: {
    Card,
  },
};
</script>

<style lang="scss" scoped>
#home {
  width: 100%;

  display: flex;
  justify-content: center;

  padding-top: 15vh;
}
.card {
  min-width: 300px;
  min-height: 500px;
  margin: auto;

  position: absolute;

  &:last-child {
    box-shadow: 0 0 15px 5px rgba(0, 0, 0, 0.5);
  }
}
</style>
