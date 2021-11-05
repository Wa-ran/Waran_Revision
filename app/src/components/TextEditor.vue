<template>
  <div class="container">
    <div class="editor--options">
      <div>
        <button @click="normalContent" class="normal">
          <span>N</span>
        </button>
        <button
          @click="editContent('<span class=\'bold\'>', '</span>')"
          class="icon"
        >
          <font-awesome-icon :icon="['fas', 'bold']" />
        </button>
        <button
          @click="editContent('<span class=\'italic\'>', '</span>')"
          class="icon"
        >
          <font-awesome-icon :icon="['fas', 'italic']" />
        </button>
        <button
          @click="editContent('<span class=\'underline\'>', '</span>')"
          class="icon"
        >
          <font-awesome-icon :icon="['fas', 'underline']" />
        </button>
        <button @click="editContent('<del>', '</del>')" class="icon">
          <font-awesome-icon :icon="['fas', 'strikethrough']" />
        </button>
      </div>

      <div>
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
    </div>

    <div class="editor--area">
      <div v-if="modifComment" class="comm--title">Commentaire :</div>
      <div
        class="contentEditable"
        v-html="textarea"
        contenteditable="true"
        @blur="mutateModifs(true)"
      ></div>
    </div>

    <div class="undo">
      <button class="resetButton importantButton" @click="resetText">
        <span>Reset</span>
      </button>

      <button
        v-if="changeHist.length > 0"
        @click="reverseChange"
        class="icon default"
      >
        <font-awesome-icon :icon="['fas', 'undo']" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TextEditor",
  props: {
    face: String,
  },
  data() {
    return {
      faceSelected: "",
      changeHist: [],
      textarea: "",
    };
  },
  computed: {
    contEdit() {
      return document.getElementsByClassName("contentEditable")[0];
    },
    faceContent() {
      return this.$store.state.actualCard[this.faceSelected];
    },
    isModifying() {
      return this.$store.state.modifCard;
    },
    modifComment() {
      return this.$store.state.modifComment;
    },
    randomNum() {
      return this.$store.state.randomNum;
    },
  },
  methods: {
    wrapContent() {
      let selection = window.getSelection();

      this.saveChange();

      let startNode = selection.anchorNode;
      let startOffset = selection.anchorOffset;
      let endNode = selection.focusNode;
      let endOffset = selection.focusOffset;
      if (selection.focusOffset < selection.anchorOffset) {
        startNode = selection.focusNode;
        startOffset = selection.focusOffset;
        endNode = selection.anchorNode;
        endOffset = selection.anchorOffset;
      }
      let rand1 = "{1}" + this.randomNum;
      let rand2 = "{2}" + this.randomNum;
      // Insertion d'une chaine random pour retrouver la position de l'insertion

      let start = startNode.textContent.slice(0, startOffset);
      start = startNode.textContent.slice(0, start.lastIndexOf(" ") + 1);
      // if (start.slice(0, 1) === " ") start = start.slice(1);

      if (startNode == endNode) {
        let end = startNode.textContent.slice(endOffset - 1);
        // if (end.slice([end.length] - 1) === " ") end = end.slice(0, end.length - 2);
        if (end.indexOf(" ") !== -1) end = end.slice(end.indexOf(" "));
        else end = "";

        let select = startNode.textContent.slice(
          start.length,
          startNode.textContent.length - end.length
        );

        startNode.textContent = start + rand1 + select + rand2 + end;
      } else {
        startNode.textContent =
          start.slice(0, start.lastIndexOf(" ")) +
          rand1 +
          startNode.textContent.slice(start.lastIndexOf(" ") + 1);

        let end = endNode.textContent.slice(0, endOffset);
        if (end.slice([end.length]) === " ") end = end.slice(0, end.length - 1);
        endNode.textContent =
          end +
          endNode.textContent.slice(
            end.length,
            endNode.textContent.indexOf(" ", end.length)
          ) +
          rand2 +
          endNode.textContent.slice(
            endNode.textContent.indexOf(" ", end.length)
          );
      }
    },
    editContent(wrapStart, wrapEnd) {
      this.wrapContent();

      this.contEdit.innerHTML = this.contEdit.innerHTML
        .replace("{1}" + this.randomNum, wrapStart)
        .replace("{2}" + this.randomNum, wrapEnd);
    },
    normalContent() {
      this.wrapContent();

      let firstStart = this.contEdit.innerHTML.indexOf(
        "<span ",
        this.contEdit.innerHTML.indexOf("{1}" + this.randomNum)
      );
      let firstClose = this.contEdit.innerHTML.indexOf(
        "</span>",
        this.contEdit.innerHTML.indexOf("{1}" + this.randomNum)
      );
      let lastStart = this.contEdit.innerHTML
        .slice(0, this.contEdit.innerHTML.indexOf("{2}" + this.randomNum))
        .lastIndexOf("<span style");
      let lastClose = this.contEdit.innerHTML
        .slice(0, this.contEdit.innerHTML.indexOf("{2}" + this.randomNum))
        .lastIndexOf("</span>");

      let startDelete = Math.min(firstStart, firstClose, lastStart, lastClose);
      let endDelete = Math.max(firstStart, firstClose, lastStart, lastClose);

      let content =
        this.contEdit.innerHTML.slice(0, startDelete) +
        this.contEdit.innerHTML
          .slice(startDelete, endDelete)
          .replace(/(<\/?span([^<>])*>)/g, "") +
        this.contEdit.innerHTML.slice(endDelete);

      this.contEdit.innerHTML = content
        .replace("{1}" + this.randomNum, "")
        .replace("{2}" + this.randomNum, "");
    },
    resetText() {
      this.saveChange();

      let text = this.contEdit;
      text.innerHTML = text.textContent;
    },
    mutateModifs(last = false) {
      let cardModif = { ...this.$store.state.actualCard };
      if (last) cardModif[this.faceSelected] = this.lastOptiContent();
      else cardModif[this.faceSelected] = this.optiContent();
      this.mutateKey("actualCard", cardModif);
    },
    optiContent() {
      return this.contEdit.innerHTML
        .replace(/<div>/, "<br>")
        .replace(/<\/div>/, "");
    },
    lastOptiContent() {
      let opti;
      if (this.contEdit.textContent.match(/\S/) === -1) this.opti == null;
      else {
        opti = this.optiContent();
        opti = opti
          .replace(/<div>/g, "<br>")
          .replace(/<\/div>/g, "")
          .replace(/&nbsp;/g, "");
        while (
          opti.slice(opti.length - 4) == "<br>" ||
          opti.slice(opti.length - 1) == " "
        ) {
          opti =
            opti.slice(opti.length - 4) == "<br>"
              ? opti.slice(0, opti.length - 4)
              : opti.slice(0, opti.length - 1);
        }
      }
      return opti;
    },
    reverseChange() {
      if (this.changeHist.length <= 2) {
        if (this.changeHist.length > 1) this.changeHist.pop();
        this.contEdit.innerHTML = this.changeHist[0];
      } else {
        this.changeHist.pop();
        this.contEdit.innerHTML = this.changeHist.pop();
      }
      setTimeout(() => {
        this.mutateModifs();
      });
    },
    saveChange() {
      if (
        this.changeHist.length == 0 ||
        this.changeHist[this.changeHist.length - 1].length !=
          this.contEdit.innerHTML.length
      ) {
        this.changeHist.push(this.contEdit.innerHTML);
        this.mutateModifs();
      }
      setTimeout(() => {
        if (
          this.changeHist[this.changeHist.length - 1].length ==
          this.contEdit.innerHTML.length
        )
          this.listenEdition();
        else this.saveChange();
      }, 200);
    },
    listenEdition() {
      this.contEdit.addEventListener("keyup", () => this.saveChange(), {
        once: true,
      });
    },
  },
  mounted() {
    this.faceSelected = this.face;
    this.textarea = this.faceContent;
    setTimeout(() => {
      this.saveChange();
    }, 200);
    this.contEdit.addEventListener("paste", () => {
      setTimeout(() => {
        this.resetText();
        this.resetText();
      });
    });
  },
  watch: {
    isModifying() {
      if (!this.isModifying && !this.$store.state.validModifCard) {
        this.contEdit.innerHTML = this.changeHist[0];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/variables";

.container {
  position: relative;
  min-height: 100%;
  max-height: 100%;
  min-width: 100%;
  padding-bottom: 1rem;
  display: flex;
  & .face {
    position: absolute;
    bottom: -0.5rem;
    left: -0.25rem;
  }
  .normal {
    padding: 0;
    & span {
      font-size: 1.1rem;
      margin: 0;
    }
  }
}
.undo {
  position: absolute;
  top: -0.25rem;
  right: -0.5rem;
  & > button {
    margin-left: auto;
    padding: 0.2rem;
    border-radius: 0.5rem;
    & svg {
      margin: 0 0.25rem;
    }
  }
}
.resetButton {
  margin-top: -1px;
  & span {
    margin: 0;
  }
}

.editor--area {
  max-height: 200px !important;
  width: 100%;
  padding: 1rem 0.5rem;
  margin-top: 2rem;
  overflow-x: hidden;
  overflow-y: scroll;
}
.contentEditable {
  height: fit-content;
  min-height: 80%;
  margin: auto;
  padding: 1rem 0.5rem;
}

.editor--options {
  position: absolute;
  top: -0.25rem;
  left: -0.5rem;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  overflow-x: scroll;
  & > div {
    width: 100%;
    display: flex;
    &:first-child {
      margin-bottom: -1px;
    }
  }
  & button {
    min-width: 30px;
    min-height: 23px;
    border-radius: 0.5rem;
    &:not(:last-child) {
      margin-right: -1px;
    }
    & > svg,
    & > span {
      margin: 0 0.25rem;
      padding: 0;
    }
  }
  & button.color:hover {
    background-color: currentColor;
    & svg {
      color: $dark_blue;
    }
  }
}
</style>
