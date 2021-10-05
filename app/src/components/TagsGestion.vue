<template :key="chosenList.length">
  <div class="tagsList_container">
    <p v-if="chosenList.length == 0">Aucun Tag</p>
    <div v-else class="tags_list">
      <Tag
        v-for="tag of chosenList"
        :key="tag.id"
        :tagId="tag.id"
        :tagName="tag.name"
      />
    </div>

    <div class="gestion_buttons">
      <button v-if="!active" @click="active = true">Modifier</button>

      <div v-if="!tagRequest && active">
        <div>
          <slot></slot>
        </div>

        <button
          v-if="chosenList.length > 0"
          @click="$emit('deleteButton')"
          class="importantButton"
        >
          <font-awesome-icon :icon="['fas', 'trash-alt']" />
          <span>Supprimer un tag</span>
        </button>
      </div>

      <div v-if="tagRequest && active">
        <div>
          <slot name="input"></slot>
        </div>
        <p>Sélectionnez un tag</p>
        <div class="multiButtons">
          <button @click="submitTagRequest">Valider</button>
          <button @click="setTagRequest(false)">Annuler</button>
        </div>
      </div>

      <button
        v-if="!tagRequest && active"
        @click="refresh"
        class="importantButton selected"
      >
        <span>Terminer</span>
      </button>
    </div>
    <hr />
  </div>
</template>

<script>
import Tag from "@/components/Tag.vue";

export default {
  name: "TagsGestion",
  components: {
    Tag,
  },
  props: {
    chooseList: String,
  },
  data() {
    return {
      active: false,
      activeKey: 0,
    };
  },
  computed: {
    chosenList() {
      return this.$store.state[this.chooseList];
    },
    refreshKey() {
      return this.$store.state.tagGestionRefreshKey;
    },
    tagRequest() {
      return this.$store.state.tagRequest;
    },
  },
  methods: {
    submitTagRequest() {
      this.$emit("submitTagRequest");
      this.setTagRequest(false);
    },
    setTagRequest(req) {
      this.$store.dispatch("mutateStore", {
        fct: "mutateKey",
        value: {
          mutate: "tagRequest",
          body: req,
        },
      });
    },
    refresh() {
      this.setTagRequest(false);
      this.$store.dispatch("mutateStore", {
        fct: "resetKey",
        value: "actualTag",
      });
      this.active = false;
    },
  },
  mounted() {
    this.$emit("mounted");
  },
  watch: {
    active() {
      if (this.active) {
        this.activeKey = this.refreshKey + 1;
        this.$store.dispatch("mutateStore", {
          fct: "mutateKey",
          value: {
            mutate: "tagGestionRefreshKey",
            body: this.refreshKey + 1,
          },
        });
      }
    },
    refreshKey() {
      if (this.activeKey != this.refreshKey) {
        this.active = false;
      }
    },
  },
};
</script>

<style lang="scss">
// Not scoped cause slot
@import "@/styles/global";

.tagsList_container {
  padding: 0.5rem;
  & > *,
  & p {
    margin-top: 0;
  }
  & input {
    margin-bottom: 0.5rem;
  }
  & button {
    margin: auto;
  }
  & hr {
    margin-top: 0.5rem;
    margin-bottom: 0;
  }
}

.gestion_buttons {
  width: auto;
  max-width: 200px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  & button {
    min-width: 100px;
  }
  & *:not(button) {
    width: 100%;
    & *:not(.multiButtons) > button:not(:first-child) {
      margin-top: -1px;
    }
    &.importantButton {
      margin-top: 0.5rem;
    }
  }
  & input {
    @include case_style;
    padding: 0.25rem 1rem;
    width: auto;
  }
}

.tags_list {
  margin: 0;
  margin-bottom: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  & .tag {
    margin: 0.5rem 1rem 0.5rem 0;
  }
}
p {
  text-align: center;
}
</style>
