<template>
  <div class="editor--main">
    <div class="deck">
      <div class="card">
        <div class="doodle">
          <css-doodle>
            @grid: 32; @size: 1px calc(35px + 70%); transform:
            rotate(@r(±90deg)); background: #e7576a; opacity: calc(1 - 1 / 1000
            * @index);
          </css-doodle>
        </div>

        <div class="recto">
          <div class="card--main flex-grow-1">
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
                class="icon color cust_red"
                @click="editContent('<span class=\'cust_red\'>', '</span>')"
              >
                <font-awesome-icon :icon="['fas', 'tint']" />
              </button>
              <button
                class="icon color cust_orange"
                @click="editContent('<span class=\'cust_orange\'>', '</span>')"
              >
                <font-awesome-icon :icon="['fas', 'tint']" />
              </button>
              <button
                class="icon color cust_yellow"
                @click="editContent('<span class=\'cust_yellow\'>', '</span>')"
              >
                <font-awesome-icon :icon="['fas', 'tint']" />
              </button>
              <button
                class="icon color cust_green"
                @click="editContent('<span class=\'cust_green\'>', '</span>')"
              >
                <font-awesome-icon :icon="['fas', 'tint']" />
              </button>
              <button
                class="icon color cust_blue"
                @click="editContent('<span class=\'cust_blue\'>', '</span>')"
              >
                <font-awesome-icon :icon="['fas', 'tint']" />
              </button>
            </div>
            <button class="icon resetButton importantButton" @click="resetText">
              <span>Reset</span>
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
              <button @click="mutateModifs" class="default">
                <span>Valider</span>
              </button>
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
        node.textContent.substring(0, selection.anchorOffset) +
        rand1 +
        node.textContent.substring(
          selection.anchorOffset,
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

.editor--main {
  width: 90%;
  & > * {
    max-width: 100%;
  }
}
.deck {
  margin-bottom: 2rem;
  & .card {
    height: auto;
    margin: 1rem;
    margin-top: 3rem;
    margin: auto;

    position: relative;
  }
  & .recto {
    position: relative;
    margin-bottom: 2rem;
  }
}

.card--main {
  position: relative;
  height: fit-content;
  min-width: fit-content;
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
  padding: 3rem 1rem;
  min-height: 100%;
  max-height: 300px;
  overflow: auto;
}

.editor--options {
  position: absolute;
  top: -0.75rem;
  left: -0.5rem;
  width: 95%;
  display: flex;
  justify-content: space-between;
  & button.color:hover {
    background-color: currentColor;
    & svg {
      color: $dark_blue;
    }
  }
}
.resetButton {
  position: absolute;
  top: 0.75rem;
  left: -0.5rem;
  & span {
    padding: 0;
  }
}
.editor--options button,
.resetButton {
  min-width: 30px;
  border-radius: 0.5rem;
}

@media screen and (max-width: 767px) {
  .editor--main {
    margin: 0;
    width: 100%;
    & > *:not(.deck) {
      margin: 0 !important;
    }
  }
}
</style>
