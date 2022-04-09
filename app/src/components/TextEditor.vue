<template>
  <div class="container">
    <div class="editorOptions">
      <div>
        <button
          @click.prevent="normalContent"
          class="normal btn btn-outline-primary bg-body not-dark"
        >
          <span>N</span>
        </button>
        <button
          @click.prevent="editContent('<span class=\'bold\'>', '</span>')"
          class="btn btn-outline-primary bg-body not-dark"
        >
          <font-awesome-icon :icon="['fas', 'bold']" />
        </button>
        <button
          @click.prevent="editContent('<span class=\'italic\'>', '</span>')"
          class="btn btn-outline-primary bg-body not-dark"
        >
          <font-awesome-icon :icon="['fas', 'italic']" />
        </button>
        <button
          @click.prevent="editContent('<span class=\'underline\'>', '</span>')"
          class="btn btn-outline-primary bg-body not-dark"
        >
          <font-awesome-icon :icon="['fas', 'underline']" />
        </button>
        <button
          @click.prevent="
            editContent('<span class=\'linethrough\'>', '</span>')
          "
          class="btn btn-outline-primary bg-body not-dark"
        >
          <font-awesome-icon :icon="['fas', 'strikethrough']" />
        </button>
      </div>

      <div>
        <button
          class="color cust_red btn btn-outline-primary bg-body not-dark"
          @click.prevent="editContent('<span class=\'cust_red\'>', '</span>')"
        >
          <font-awesome-icon :icon="['fas', 'tint']" />
        </button>
        <button
          class="color cust_orange btn btn-outline-primary bg-body not-dark"
          @click.prevent="
            editContent('<span class=\'cust_orange\'>', '</span>')
          "
        >
          <font-awesome-icon :icon="['fas', 'tint']" />
        </button>
        <button
          class="color cust_yellow btn btn-outline-primary bg-body not-dark"
          @click.prevent="
            editContent('<span class=\'cust_yellow\'>', '</span>')
          "
        >
          <font-awesome-icon :icon="['fas', 'tint']" />
        </button>
        <button
          class="color cust_green btn btn-outline-primary bg-body not-dark"
          @click.prevent="editContent('<span class=\'cust_green\'>', '</span>')"
        >
          <font-awesome-icon :icon="['fas', 'tint']" />
        </button>
        <button
          class="color cust_blue btn btn-outline-primary bg-body not-dark"
          @click.prevent="editContent('<span class=\'cust_blue\'>', '</span>')"
        >
          <font-awesome-icon :icon="['fas', 'tint']" />
        </button>
      </div>
    </div>

    <div class="undo">
      <button
        class="resetButton btn btn-outline-primary bg-body not-dark"
        @click.prevent="resetText"
      >
        <span>Reset</span>
      </button>

      <button
        v-if="modifsHist.length > 0"
        @click.prevent="reverseChange"
        class="btn btn-outline-primary bg-body not-dark"
      >
        <font-awesome-icon :icon="['fas', 'undo']" />
      </button>
    </div>

    <div class="editorArea border border-primary rounded">
      <div
        class="contentEditable text-center"
        v-html="textarea"
        contenteditable="true"
        @keydown.tab="tabHandle"
        :id="randomNum"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TextEditor",
  props: {
    contentId: String,
    text: String,
  },
  data() {
    return {
      contEdit: null,
      modifsHist: [],
      textarea: "",
      randomNum: null,
      timer: null,
    };
  },
  methods: {
    wrapContent() {
      let selection = window.getSelection();
      if (
        selection.baseNode.id &&
        selection.baseNode.id !== this.randomNum &&
        selection.baseNode.parentNode.id &&
        selection.baseNode.parentNode.id !== this.randomNum
      )
        throw Error;

      let startNode = selection.anchorNode;
      let startOffset = selection.anchorOffset;
      let endOffset = selection.focusOffset;

      if (startOffset == endOffset) throw Error;

      this.saveChange();

      if (selection.focusOffset < selection.anchorOffset) {
        startNode = selection.focusNode;
        startOffset = selection.focusOffset;
        endOffset = selection.anchorOffset;
      }
      let rand1 = "{1}" + this.randomNum;
      let rand2 = "{2}" + this.randomNum;
      // Insertion d'une chaine random pour retrouver la position de l'insertion

      let start = startNode.textContent.slice(0, startOffset);
      let end = startNode.textContent.slice(endOffset);
      let select = startNode.textContent.slice(
        start.length,
        startNode.textContent.length - end.length
      );

      startNode.textContent = start + rand1 + select + rand2 + end;
    },
    editContent(wrapStart, wrapEnd) {
      try {
        this.wrapContent();
      } catch (error) {
        return;
      }

      this.contEdit.innerHTML = this.contEdit.innerHTML
        .replace("{1}" + this.randomNum, wrapStart)
        .replace("{2}" + this.randomNum, wrapEnd);
    },
    normalContent() {
      this.wrapContent();

      let content = this.contEdit.innerHTML;

      let start = content.slice(0, content.indexOf("{1}" + this.randomNum));
      start = start.slice(0, start.search(/(<span([^>])*>)(?!.*<\/span>)/));

      let end = content.slice(content.indexOf("{2}" + this.randomNum));
      end = end.slice(end.indexOf("</span>") + 6);

      let select = content.slice(start.length, content.length - end.length);
      select = select.replace(/(<\/?span([^>])*>)/g, "");

      let normalize = start + select + end;

      this.contEdit.innerHTML = normalize
        .replace("{1}" + this.randomNum, "")
        .replace("{2}" + this.randomNum, "");
    },
    resetText() {
      this.saveChange();

      let text = this.contEdit;
      text.innerHTML = text.textContent;
    },
    validModif() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        let cardModif = this.lastOptiContent();
        this.$emit("validModif", cardModif);
      }, 200);
    },
    optiContent() {
      let useless = document.querySelectorAll(
        ".contentEditable span:not([class])"
      );
      for (let span of useless) {
        span.replaceWith(span.textContent);
      }
      return this.contEdit.innerHTML
        .replace(/<div>/, "<br>")
        .replace(/<\/div>/, "")
        .replace(/(\w*[^class])="[^"]*"(?=[^<]*>)/, "");
    },
    lastOptiContent() {
      let opti;
      if (this.contEdit.textContent.match(/\S/) === -1) this.opti == null;
      else {
        opti = this.optiContent();
        opti = opti
          .replace(/<div>/g, "<br>")
          .replace(/<\/div>/g, "")
          .replace(/&nbsp;/g, " ")
          .replace(/\s+/g, " ");
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
      if (opti === "") opti = null;
      opti += " ";
      return opti;
    },
    reverseChange() {
      if (this.modifsHist.length <= 2) {
        if (this.modifsHist.length > 1) this.modifsHist.pop();
        this.contEdit.innerHTML = this.modifsHist[0];
      } else {
        this.modifsHist.pop();
        this.contEdit.innerHTML = this.modifsHist.pop();
      }
      this.validModif();
    },
    saveChange() {
      this.validModif();
      if (
        this.modifsHist.length == 0 ||
        this.modifsHist[this.modifsHist.length - 1].length !=
          this.contEdit.innerHTML.length
      ) {
        this.modifsHist.push(this.contEdit.innerHTML);
      }
      setTimeout(() => {
        if (
          this.modifsHist[this.modifsHist.length - 1].length ==
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
    tabHandle() {
      if (document.activeElement == this.contEdit) this.$emit("tabClick");
    },
  },
  mounted() {
    this.contEdit = document.querySelector(
      "#" + this.contentId + " .contentEditable"
    );
    this.textarea = this.text;
    this.randomNum = (Math.random() + 1).toString(36).substring(7);

    setTimeout(() => {
      this.saveChange();
    }, 200);
    this.contEdit.addEventListener("paste", () => {
      setTimeout(() => {
        this.resetText();
        this.contEdit.innerHTML = this.contEdit.innerHTML
          .replace(/&nbsp;/g, " ")
          .replace(/\s+/g, " ");
        this.resetText();
      });
    });
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/_variables.scss";

button {
  z-index: 10;
  color: $primary;
  &:hover,
  &:focus {
    background-color: $primary !important;
    color: currentColor !important;
    box-shadow: none !important;
  }
}

.container {
  position: relative;
  height: fit-content;
  min-width: 100%;
  padding: 0;
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
  top: 0.25rem;
  right: -1rem;
  z-index: 10;
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
  margin-bottom: -1px;
  & span {
    margin: 0;
  }
}

.editorArea {
  width: 100%;
  min-height: 50px;
  height: fit-content;
  max-height: 50vh;
  padding: 0 0.5rem;
  margin-top: 1.25rem;
  overflow-x: hidden;
  overflow-y: scroll;
}
div[contenteditable="true"] {
  font-size: 1.1rem;
  height: fit-content !important;
  min-height: 100%;
  max-width: 500px;
  margin: auto;
  outline: none;
  padding: 1.5rem 0.5rem 1rem 0.5rem;
  @media (max-width: 575.98px) {
    padding: 3rem 0.5rem 1rem 0.5rem;
  }
}

.editorOptions {
  position: absolute;
  top: 0.25rem;
  left: -0.5rem;
  display: flex;
  justify-content: flex-start;
  overflow-x: scroll;
  width: 85%;
  @media (max-width: 575.98px) {
    flex-direction: column;
  }
  & > div {
    width: fit-content;
    display: flex;
    margin-right: 0.25rem;
  }
  & button {
    min-width: 30px;
    min-height: 23px;
    border-radius: 0.5rem;
    padding: 0;
    &:not(:last-child) {
      margin-right: -1px;
    }
    & > svg,
    & > span {
      margin: 0 0.25rem;
      padding: 0;
    }
  }
}
</style>
