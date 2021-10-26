<template>
  <div
    @blur="if (!optionSelected) $emit('annulation');"
    class="tagsList_container"
  >
    <p v-if="chosenList.length == 0">Aucun Tag</p>
    <div v-else class="tags_list">
      <Tag
        v-for="tag of chosenList"
        @click="$emit('tagClick')"
        :key="tag.id"
        :tagId="tag.id"
        :tagName="tag.name"
      />
    </div>

    <div class="gestion_buttons">
      <button v-if="!active" @click="active = true">
        <span>Modifier</span>
      </button>

      <div v-if="active">
        <div v-if="!optionSelected" @click="optionSelected = true">
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

        <div v-if="optionSelected">
          <div>
            <slot name="input"></slot>
          </div>
          <p>Sélectionnez un tag</p>
          <div class="multiButtons">
            <button @click="submitTagRequest"><span>Valider</span></button>
            <button
              @click="
                optionSelected = false;
                $emit('annulation');
              "
            >
              <span>Annuler</span>
            </button>
          </div>
        </div>

        <div>
          <button
            v-if="!optionSelected"
            @click="refresh"
            class="importantButton selected"
          >
            <span>Terminer</span>
          </button>
        </div>
      </div>
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
      optionSelected: false,
    };
  },
  computed: {
    chosenList() {
      return this.$store.state[this.chooseList];
    },
    refreshKey() {
      return this.$store.state.tagGestionRefreshKey;
    },
  },
  methods: {
    async submitTagRequest() {
      await this.$emit("submitTagRequest");
      this.optionSelected = false;
      setTimeout(() => {
        this.$emit("mounted");
      });
    },
    refresh() {
      this.optionSelected = false;
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
        this.$emit("active");
        this.activeKey = this.refreshKey + 1;
        this.mutateKey("tagGestionRefreshKey", this.refreshKey + 1);

        if (this.chosenList.length == 0) {
          // 'raccourci' pour activation de la fonctionnalité de base si liste vide (pas besoin de supprimer)
          this.optionSelected = true;
          this.$emit("chooseListEmpty");
        }
      }
    },
    optionSelected() {
      this.$emit("optionSelected", this.optionSelected);
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
@import "../styles/variables";

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
  & > div:not(.multiButtons) {
    min-width: 200px;
    max-width: 80%;
    width: 80%;
    & button {
      margin-top: 0.5rem;
      width: 100%;
      max-width: 100%;
    }
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
    margin: auto;
    margin-bottom: 0.5rem;
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
