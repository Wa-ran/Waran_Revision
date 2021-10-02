<template>
  <div class="editor--main">
    <div class="deck">
      <div class="card">
        <div class="doodle">
          <css-doodle use="var(--pattern-card-side)"></css-doodle>
        </div>

        <div class="recto">
          <div class="card--main readingZone flex-grow-1">
            <div class="editor--options">
              <button
                @click="
                  editContent('<span style=\'font-weight: bold\'>', '</span>')
                "
                class="icon"
              >
                <font-awesome-icon :icon="['fas', 'bold']" />
              </button>
              <button
                @click="
                  editContent('<span style=\'font-style: italic\'>', '</span>')
                "
                class="icon"
              >
                <font-awesome-icon :icon="['fas', 'italic']" />
              </button>
              <button
                @click="
                  editContent(
                    '<span style=\'text-decoration: underline\'>',
                    '</span>'
                  )
                "
                class="icon"
              >
                <font-awesome-icon :icon="['fas', 'underline']" />
              </button>
              <button @click="editContent('<del>', '</del>')" class="icon">
                <font-awesome-icon :icon="['fas', 'strikethrough']" />
              </button>

              <button
                class="icon cust_red"
                @click="editContent('<span class=\'cust_red\'>', '</span>')"
              >
                <font-awesome-icon :icon="['fas', 'tint']" />
              </button>
              <button
                class="icon cust_orange"
                @click="editContent('<span class=\'cust_orange\'>', '</span>')"
              >
                <font-awesome-icon :icon="['fas', 'tint']" />
              </button>
              <button
                class="icon cust_yellow"
                @click="editContent('<span class=\'cust_yellow\'>', '</span>')"
              >
                <font-awesome-icon :icon="['fas', 'tint']" />
              </button>
              <button
                class="icon cust_green"
                @click="editContent('<span class=\'cust_green\'>', '</span>')"
              >
                <font-awesome-icon :icon="['fas', 'tint']" />
              </button>
              <button
                class="icon cust_blue"
                @click="editContent('<span class=\'cust_blue\'>', '</span>')"
              >
                <font-awesome-icon :icon="['fas', 'tint']" />
              </button>
            </div>

            <button class="icon resetButton importantButton" @click="resetText">
              <font-awesome-icon :icon="['fas', 'history']" />
            </button>

            <div
              id="contentEditable"
              v-html="textarea"
              contenteditable="true"
              @keyup="saveChange"
            ></div>

            <div class="multiButtons face">
              <button @click="changeFaceSelection('recto')">
                <span>Recto</span>
              </button>
              <button @click="changeFaceSelection('verso')">
                <span>Verso</span>
              </button>
            </div>
            <div class="multiButtons validation">
              <button
                v-if="changeHist.length > 0"
                @click="reverseChange"
                class="icon"
              >
                <font-awesome-icon :icon="['fas', 'undo']" />
              </button>
              <button @click="mutateModifs"><span>Valider</span></button>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="card"></div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "Editor",
  data() {
    return {
      faceSelected: "recto",
      changeHist: [],
    };
  },
  computed: {
    textarea() {
      return this.$store.state.actualCard[this.faceSelected];
    },
  },
  methods: {
    changeFaceSelection(face) {
      this.faceSelected = null;
      setTimeout(() => {
        this.faceSelected = face;
      });
    },
    editContent(wrapStart, wrapEnd) {
      this.saveChange();

      let selection = window.getSelection();
      let node = window.getSelection().focusNode;
      let elemNode;
      if (node.nodeName == "#text") elemNode = node.parentNode;
      else elemNode = node;

      let rand = (Math.random() + 1).toString(36).substring(7);
      let rand1 = "{1}" + rand;
      let rand2 = "{2}" + rand;
      // Insertion d'une chaine random pour retrouver la position de l'insertion

      node.textContent =
        node.textContent.substring(0, selection.baseOffset) +
        rand1 +
        node.textContent.substring(
          selection.baseOffset,
          selection.focusOffset
        ) +
        rand2 +
        node.textContent.substring(selection.focusOffset);

      elemNode.innerHTML = elemNode.innerHTML
        .replace(rand1, wrapStart)
        .replace(rand2, wrapEnd);
    },
    resetText() {
      this.saveChange();

      let text = document.getElementById("contentEditable");
      text.innerHTML = text.textContent;
    },
    mutateModifs() {
      let newContent = document.getElementById("contentEditable").innerHTML;
      let cardModif = { ...this.$store.state.actualCard };
      cardModif[this.faceSelected] = newContent;
      this.$store.dispatch("mutateStore", {
        fct: "mutateKey",
        value: {
          mutate: "actualCard",
          body: cardModif,
        },
      });
      this.changeFaceSelection(this.faceSelected);
    },
    reverseChange() {
      document.getElementById("contentEditable").innerHTML =
        this.changeHist.pop();
    },
    saveChange() {
      this.changeHist.push(
        document.getElementById("contentEditable").innerHTML
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/global";

.editor--main > * {
  width: 100%;
  margin: 2rem 0;
}
.deck {
  height: 250px;
}
.card {
  width: 400px;
  max-width: 90%;
  height: 200px;
  margin: 1rem;
  margin-top: 3rem;
  margin-right: auto;

  position: absolute;
}
.card--main {
  position: relative;
  & .face {
    position: absolute;
    bottom: -0.5rem;
    left: -0.25rem;
  }
  & .validation {
    position: absolute;
    bottom: -0.5rem;
    right: -0.25rem;
  }
}
#contentEditable {
  padding-top: 2rem;
}

.editor--options {
  position: absolute;
  top: -0.75rem;
  left: -0.5rem;

  display: flex;
  & button:hover {
    background-color: currentColor;
    & svg {
      color: $dark_blue;
    }
  }
}
.resetButton {
  position: absolute;
  top: -0.75rem;
  right: -0.5rem;
}
.editor--options button,
.resetButton {
  width: 30px;
  margin-right: 0.25rem;
  border-radius: 20%;
}
</style>
