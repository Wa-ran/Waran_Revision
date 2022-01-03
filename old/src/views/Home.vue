<template>
  <main id="home">
    <Header class="z-index-2" />

    <form
      action="http://localhost:8000/test.php"
      method="POST"
      enctype="multipart/form-data"
      target="dummyframe"
      @submit="imageUpload"
    >
      <input
        type="file"
        id="recto_image"
        name="recto"
        accept="image/png, image/jpeg, image/jpg, image/webp"
        @change="filePreview"
      />
      <input
        type="text"
        name="user"
        :value="JSON.stringify($store.state.user)"
        hidden
      />
      <input
        type="text"
        name="card"
        :value="JSON.stringify($store.state.actualCard)"
        hidden
      />
      <img v-if="$store.state.fileTest" :src="$store.state.fileTest" />
      <button type="submit">php</button>
    </form>

    <iframe
      name="dummyframe"
      id="dummyframe"
      style="display: none"
      @load="fileView"
    ></iframe>

    <ChangeLog v-if="!userId" />

    <Modal>
      <div v-show="userId" id="firstLoad">
        <Loader :size="'5x'" />
      </div>
      <div v-show="success && !hasSucceed" id="revisionSuccess">
        <div class="container">
          <span>Bravo, vous avez révisé toutes vos cartes !</span>
          <button @click="endCongratulate()">Yeah ! :D</button>
        </div>
      </div>
    </Modal>

    <main v-if="userId" class="home--main flex-grow-1">
      <!-- <div>
        <img
          src="https://back.waran.xyz/images/setup_de_la_galere.jpg"
          alt=""
        />
      </div> -->
      <div class="page--selector">
        <button @click="mutateKey('showPage', 'RevisionPage')">Réviser</button>
        <button @click="mutateKey('showPage', 'CardsPage')">
          Voir mes cartes
        </button>
      </div>
      <keep-alive>
        <component :is="showPageState" />
      </keep-alive>
    </main>

    <Footer v-if="userId" class="footer" />
  </main>
</template>

<script>
import { defineAsyncComponent } from "vue";

import ChangeLog from "@/components/ChangeLog.vue";
import Loader from "@/components/Loader.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Modal from "@/components/Modal.vue";

const RevisionPage = defineAsyncComponent(() =>
  import("@/views/RevisionPage.vue")
);
const CardsPage = defineAsyncComponent(() => import("@/views/CardsPage.vue"));

export default {
  name: "Home",
  components: {
    Header,
    Footer,
    ChangeLog,
    Loader,
    Modal,
    RevisionPage,
    CardsPage,
  },
  data() {
    return {
      seeAllCards: false,
      success: false,
      hasSucceed: false,
      loaderTimer: false,
    };
  },
  computed: {
    deckChargedState() {
      return this.$store.state.deckCharged;
    },
    loadingState() {
      return this.$store.state.loading;
    },
    showPageState() {
      return this.$store.state.showPage;
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
        this.loaderTimer = setInterval(() => {
          if (!this.loadingState) {
            loader.style = "display: none";
            this.mutateKey("showModal", false);
            clearInterval(this.loaderTimer);
          }
        }, 300);
      }, 500);
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
    filePreview(event) {
      let url = URL.createObjectURL(event.target.files[0]);
      this.mutateKey("fileTest", url);
    },
    fileView(event) {
      console.log(event);
    },
  },
  created() {
    if (location.protocol == "https:") location.protocol = "http:";
    this.mutateKey("showPage", "revisionPage");
  },
  watch: {
    deckChargedState() {
      if (this.deckChargedState) this.stopLoad();
    },
    userId() {
      this.mutateKey("showModal", true);
    },
    success() {
      this.mutateKey("showModal", this.success);
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
    margin-bottom: 1rem;
    & .page--selector {
      position: absolute;
      top: -0.5rem;
      left: 0.5rem;
      width: 100%;
      display: flex;
      & + * {
        padding-top: 1rem;
      }
      & button {
        margin-right: 0.5rem;
      }
    }
  }
}

#firstLoad {
  color: $highlight;
  padding-top: 5rem;
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

.footer {
  margin-top: auto;
}

@media screen and (max-width: 767px) {
  #home *:not(header) > * {
    max-width: 95vw;
  }
  #home .home--main {
    margin: auto;
    margin-bottom: 1rem;
    & .page--selector {
      left: -0.5rem;
      & + * {
        padding-top: 2rem;
      }
    }
  }
}
</style>
