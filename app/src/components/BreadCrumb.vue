<template>
  <div class="container-fluid">
    <nav aria-label="Fil d'ariane" id="breadCrumb" class="my-1">
      <div
        class="mt-n2 pt-2 w-100 d-flex flex-wrap rounded position-relative"
        aria-label="Breadcrumb"
      >
        <Link
          v-for="(link, index) in this.$route.matched"
          :key="index"
          :linkObj="link"
          :linkText="linkDesc(link)"
          class="text-decoration-none"
        >
        </Link>
      </div>
    </nav>
  </div>
</template>

<script>
import Link from "@/components/global/Link";

export default {
  name: "BreadCrumb",
  components: {
    Link,
  },
  data() {
    return {
      scrollPos: 0,
    };
  },
  methods: {
    linkDesc(link) {
      let desc = link.meta.desc;
      if (link.props.default) {
        switch (link.name) {
          case "DeckView":
            desc += ` (${this.$store.getters.actualDeck.title || 'Pas de titre'})`;
            break;
          case "CardView":
            desc += ` (${this.$route.params.card})`;
            break;
          default:
            break;
        }
      }
      return desc;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/_variables.scss";

#breadCrumb > div > a {
  font-size: 0.75rem;
  &:last-child {
    font-style: italic;
  }
}
#breadCrumb > div > a:not(:last-child)::after {
  content: "";
  display: inline-block;
  width: 5px;
  height: 1px;
  margin: 0 0.25rem;
  margin-bottom: 0.25rem;
  background-color: $primary;
}
</style>
