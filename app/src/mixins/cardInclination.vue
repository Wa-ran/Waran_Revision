<script>
export default {
  name: "cardInclination",
  methods: {
    flipCard(e) {
      let card = e.target;
      while (!card.classList.contains("card")) card = card.parentNode;
      card.classList.add("flip_anim");

      if (card.classList.contains("flip")) card.classList.remove("flip");
      else card.classList.add("flip");

      setTimeout(() => {
        card.classList.remove("flip_anim");
      }, 200);
    },
    cardInclination() {
      const deck = document.querySelectorAll(".card");
      const last = deck[deck.length - 1];

      const cardMovement = (e) => {
        const coordBox = last.getBoundingClientRect();
        const centerPointX = coordBox.x + coordBox.width / 2;
        const centerPointY = coordBox.y + coordBox.height / 2;

        const maxRotation = 10;

        //Y rotation
        const rotationFactorY = maxRotation / coordBox.width;
        let yRotation = Math.ceil(
          -1 * (e.screenX - centerPointX) * rotationFactorY
        );

        //X rotation
        const rotationFactorX = maxRotation / coordBox.height;
        let xRotation = Math.ceil((e.screenY - centerPointY) * rotationFactorX);

        for (let [index, card] of deck.entries()) {
          let xR = xRotation;
          let yR = yRotation;
          if (card.classList.contains("flip")) {
            xR = -xR;
            yR += 180;
          }
          let styleText = `z-index: ${100 - index};
            transition: transform 0.2s;
            transform:
            rotateY(${yR}deg)
            rotateX(${xR}deg)
            translateZ(${index * 10}px)`;
          if (card.classList.contains("flip_anim")) {
            styleText += ` translateX(25px) translateY(20px)`;
            setTimeout(() => {
              cardMovement(e);
            }, 300);
          }
          card.style.cssText = styleText;
        }
      };

      const cardMoveListen = () => {
        document.addEventListener("mousemove", cardMovement);
        document.addEventListener("click", cardMovement);
      };
      const cardMoveListenRemove = () => {
        document.removeEventListener("mousemove", cardMovement);
        document.removeEventListener("click", cardMovement);
      };
      cardMoveListenRemove();
      cardMoveListen();
    },
  },
};
</script>
