<template>
  <div class="w-fit bg-body position-absolute end-0 top-0 m-n1">
    <cust-title id="modifCardButton" :text="title" class="w-fit ms-auto">
      <template v-slot:default>
        <button
          @click="link ? $router.push(link) : ''"
          aria-labelledby="modifCardButton"
          class="position-relative btn btn-outline-primary border-2 h-fit w-fit p-1"
        >
          <slot name="btnBody">
            <font-awesome-icon :icon="['fas', 'cog']" size="lg" />
          </slot>
        </button>
      </template>
    </cust-title>
  </div>
</template>

<script>
export default {
  name: "ButtonTopRight",
  props: {
    title: String,
    link: Object,
  },
};
</script>

<style lang="scss" scoped>
.btn > * {
  margin-left: 1px !important;
}
.position-absolute {
  z-index: 1500;
}
</style>
