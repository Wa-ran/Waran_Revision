<script>
export default {
  name: "cardInclination",
  methods: {
    cardInclinationFlip(e) {
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
      const move = document.querySelectorAll(".move");
      const cardMovement = () => {
        for (let [index, card] of move.entries()) {
          let styleText = `z-index: ${
            100 - index
          }; transition: transform 0.2s;`;
          let flip = 0;
          let Tx = 1;

          // if (card.classList.contains("flip")) {
          //   flip = 180;
          //   Tx = -1;
          // }

          if (index > 0 || card.classList.contains("flip"))
            styleText += `transform:
            rotateY(${flip}deg)
            translateZ(${index * 10}px)`;

          if (card.classList.contains("flip_anim")) {
            styleText += ` translateX(25px) translateY(20px)`;
            setTimeout(() => {
              cardMovement();
            }, 300);
          } else {
            styleText += ` translateX(${6 * Tx * -index}px) translateY(${
              2 * -index
            }px) rotateZ(${-index * 0.7}deg);
            `;
          }
          card.style.cssText = styleText;
        }
        cardMoveListenRemove();
        cardMoveListen();
      };
      const cardMoveListen = () => {
        document.addEventListener("click", cardMovement);
      };
      const cardMoveListenRemove = () => {
        document.removeEventListener("click", cardMovement);
      };
      cardMovement();
    },
    // cardInclination() {
    //   const move = document.querySelectorAll(".move");
    //   // const last = document.querySelector("#actualCard");

    //   const cardMovement = (e) => {
    //     // const coordBox = last.getBoundingClientRect();
    //     // const centerPointX = coordBox.x + coordBox.width / 2;
    //     // const centerPointY = coordBox.y + coordBox.height / 2;

    //     const coordBox = document.body;
    //     const centerPointX = coordBox.scrollWidth / 2;
    //     const centerPointY = coordBox.scrollHeight / 2;

    //     const maxRotation = 25;

    //     //Y rotation
    //     const rotationFactorY = maxRotation / coordBox.scrollWidth;
    //     let yRotation = Math.ceil(
    //       -1 * (e.screenX - centerPointX) * rotationFactorY
    //     );

    //     //X rotation
    //     const rotationFactorX = maxRotation / coordBox.scrollHeight;
    //     let xRotation = Math.ceil((e.screenY - centerPointY) * rotationFactorX);

    //     for (let [index, card] of move.entries()) {
    //       let xR = xRotation;
    //       let yR = yRotation;
    //       if (card.classList.contains("flip")) {
    //         xR = -xR;
    //         yR += 180;
    //       }
    //       let styleText = `z-index: ${10 - index};
    //         transition: transform 0.2s;
    //         transform:
    //         rotateY(${yR}deg)
    //         rotateX(${xR}deg)
    //         translateZ(${index * 10}px)`;
    //       if (card.classList.contains("flip_anim")) {
    //         styleText += ` translateX(25px) translateY(20px)`;
    //         setTimeout(() => {
    //           cardMovement(e);
    //         }, 300);
    //       }
    //       card.style.cssText = styleText;
    //     }
    //   };

    //   const cardMoveListen = () => {
    //     document.addEventListener("mousemove", cardMovement);
    //     document.addEventListener("click", cardMovement);
    //   };
    //   const cardMoveListenRemove = () => {
    //     document.removeEventListener("mousemove", cardMovement);
    //     document.removeEventListener("click", cardMovement);
    //   };
    //   cardMoveListenRemove();
    //   cardMoveListen();
    // },
  },
};
</script>
