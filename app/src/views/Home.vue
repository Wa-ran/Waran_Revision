<template>
  <main id="home">
    <Header />

    <ChangeLog v-if="!userId" />

    <div class="modal">
      <div v-show="userId" id="firstLoad">
        <Loader :size="'5x'" />
      </div>
      <div v-show="success && !hasSucceed" id="revisionSuccess">
        <div class="container">
          <span>Bravo, vous avez révisé toutes vos cartes !</span>
          <button @click="endCongratulate()">Yeah ! :D</button>
        </div>
      </div>
    </div>

    <div v-if="userId" :key="userId" class="home--main flex-grow-1">
      <div class="tagsZone">
        <Tags />
        <UserOptions />
      </div>

      <div class="central">
        <Deck @charged="stopLoad" @success="congratulate" />
      </div>

      <div class="edit">
        <Editor id="cardEditor" v-if="isModifying" />
      </div>
    </div>

    <footer></footer>
  </main>
</template>

<script>
import Deck from "@/views/Revision/Deck.vue";
import Editor from "@/views/Revision/Editor.vue";
import Tags from "@/views/Revision/Tags.vue";

import ChangeLog from "@/components/ChangeLog.vue";
import Loader from "@/components/Loader.vue";
import Header from "@/components/Header.vue";
import UserOptions from "@/components/UserOptions.vue";

export default {
  name: "Home",
  components: {
    Deck,
    Editor,
    Header,
    ChangeLog,
    Loader,
    Tags,
    UserOptions,
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
      let loader = document.getElementById("firstLoad");
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
        let congrate = document.getElementById("revisionSuccess");
        congrate.style.cssText += `
        opacity: 0;`;
        window.scrollTo(0, 0);
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
    mounted() {
      let headerHeight = document.querySelector("#home > header").scrollHeight;
      let modal = document.querySelector("modal");
      modal.style.cssText = `top: ${headerHeight + 1}px;`;
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

.modal > * {
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
    min-width: 100%;
    margin-top: 100px;
  }
}
#firstLoad {
  color: $pink;
}
#revisionSuccess {
  & > * {
    text-align: center;
    font-style: italic;
    font-size: 1.25rem;
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
  flex-wrap: wrap;
  > .container {
    min-width: 100%;
  }
}

footer {
  margin-top: 2rem;
}

@media screen and (max-width: 767px) {
  #home *:not(header) > * {
    max-width: 95vw;
  }
  #home .home--main {
    margin: auto;
    & > * {
      width: 100%;
      min-width: 33%;
      max-width: 95vw;
      margin: auto !important;
      padding: 0;
      & > * {
        width: auto;
        margin: auto;
        max-width: 95vw;
      }
    }
    & .central {
      order: 1;
    }
    & .edit {
      order: 2;
    }
    & .tagsZone {
      order: 3;
    }
  }
}
</style>
