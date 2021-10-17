<template>
  <main id="home">
    <Header />

    <div v-show="userId" id="firstLoad">
      <Loader :size="'5x'" />
    </div>
    <div v-show="success && !hasSucceed" id="revisionSuccess">
      <div class="container">
        <span>Bravo, vous avez révisé toutes vos cartes !</span>
        <button @click="endCongratulate()">Yeah ! :D</button>
      </div>
    </div>

    <div v-if="userId" :key="userId" class="home--main flex-grow-1">
      <div class="tagsZone">
        <Tags />
      </div>

      <div class="central">
        <Deck @charged="stopLoad" @success="congratulate" />
      </div>

      <div class="edit">
        <Editor id="cardEditor" v-if="isModifying" />
      </div>
    </div>
  </main>
</template>

<script>
import Deck from "@/views/Revision/Deck.vue";
import Editor from "@/views/Revision/Editor.vue";
import Tags from "@/views/Revision/Tags.vue";

import Loader from "@/components/Loader.vue";
import Header from "@/components/Header.vue";

export default {
  name: "Home",
  components: {
    Deck,
    Editor,
    Header,
    Loader,
    Tags,
  },
  data() {
    return {
      success: false,
      hasSucceed: false,
    };
  },
  computed: {
    actualCardId() {
      return this.$store.state.actualCard.id;
    },
    cardsList() {
      return this.$store.state.cardsList;
    },
    isModifying() {
      return this.$store.state.modifCard;
    },
    userId() {
      return this.$store.state.user.id;
    },
  },
  methods: {
    stopLoad() {
      let headerHeight = document.querySelector("#home > header").scrollHeight;
      let loader = document.getElementById("firstLoad");
      loader.style.cssText = `top: ${headerHeight + 1}px;`;
      setTimeout(() => {
        loader.style.cssText += `
          opacity: 0;`;
        setTimeout(() => {
          loader.style = "display: none";
        }, 1000);
      }, 1500);
    },
    congratulate() {
      this.success = true;
      setTimeout(() => {
        let headerHeight =
          document.querySelector("#home > header").scrollHeight;
        let congrate = document.getElementById("revisionSuccess");
        congrate.style.cssText = `top: ${headerHeight + 1}px;`;
        congrate.style.cssText += `
        opacity: 0;`;
        setTimeout(() => {
          congrate.style.cssText += `
        opacity: 1;`;
        });
      });
    },
    endCongratulate() {
      document.getElementById("revisionSuccess").style.cssText += "opacity: 0;";
      setTimeout(() => {
        this.success = false;
        this.hasSucceed = true;
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/variables";

#home {
  width: 100%;
  min-height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  & .home--main {
    position: relative;
    display: flex;
    justify-content: space-around;
    align-content: center;
    flex-wrap: wrap;
    & > * {
      min-width: 380px;
      max-width: 25vw;
      height: fit-content;
      padding: 1rem;
      & > * {
        height: fit-content;
        margin: auto;
      }
    }
    & .central {
      display: flex;
      flex-direction: column;
      min-height: 80vh;
      max-width: 100%;
      & > * {
        margin: 0;
      }
    }
  }
}

#firstLoad,
#revisionSuccess {
  position: absolute;
  left: 0;
  z-index: 1000;
  min-width: 100%;
  min-height: 100%;
  padding: 0;
  background-color: $dark_blue;
  box-shadow: inset 0 0 80px 50px $violet;
  transition: opacity 0.5s;
  & > .container {
    position: absolute;
    top: 100px;
    width: 100%;
  }
}
#firstLoad {
  color: $pink;
}
#revisionSuccess {
  & > * {
    position: absolute;
    width: 100%;
    text-align: center;
    font-style: italic;
    font-size: 1.25rem;
    top: 30%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    & > * {
      width: 100%;
      margin: 1rem 0;
    }
    & button {
      width: fit-content;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
    }
  }
}

.tagsZone {
  display: flex;
  flex-wrap: wrap-reverse;
}

@media screen and (max-width: 767px) {
  #home * {
    max-width: 95vw;
  }
  .home--main {
    & > * {
      width: 100%;
      min-width: 33%;
      max-width: 95vw;
      margin: auto !important;
      & > * {
        width: auto;
        margin: auto;
        max-width: 95vw;
      }
    }
    & .central {
      order: 2;
    }
    & .edit {
      order: 1;
    }
    & .tagsZone {
      order: 3;
    }
  }
}
</style>
