<template>
  <div id="view">
    <router-view />
  </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap");

html {
  font-family: "Roboto", sans-serif;

  height: 100%;
  width: 100%;

  background-color: rgb(49, 17, 75);
  color: rgb(245, 244, 210);

  & * {
    height: fit-content;
    width: fit-content;
  }
  & hr {
    background-color: rgb(245, 244, 210);
  }
}
body,
#app,
#view {
  height: 100%;
  width: 100%;
  margin: 0;
}

.card {
  background-color: rgb(49, 17, 75);
}
</style>
