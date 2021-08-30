<script>
export default {
  name: "cardFollowing",
  methods: {
    cardFollowing() {
      const first = document.querySelector(".card");
      const deck = document.querySelectorAll(".card");

      const cardMovement = (e) => {
        // if (e.target.classList.contains("card")) {
        // const card = e.target;
        const coordBox = first.getBoundingClientRect();
        const centerPointX = coordBox.x + coordBox.width / 2;
        const centerPointY = coordBox.y + coordBox.height / 2;

        const maxRotation = 10;

        //Y rotation
        const rotationFactorY = maxRotation / coordBox.width;
        const yRotation = Math.ceil(
          -1 * (e.clientX - centerPointX) * rotationFactorY
        );

        //X rotation
        const rotationFactorX = maxRotation / coordBox.height;
        const xRotation = Math.ceil(
          (e.clientY - centerPointY) * rotationFactorX
        );

        for (let [index, card] of deck.entries()) {
          card.style.cssText = `transform:
          rotateY(${yRotation}deg)
          rotateX(${xRotation}deg)
          translateZ(${index * 10}px);
          z-index: ${100 - index}`;
        }
        // }
      };

      const cardMovementStop = (e) => {
        if (e.target.classList.contains("card")) {
          first.style.cssText = `transform: rotateY(0deg) rotateX(0deg);`;
        }
      };

      document.addEventListener("mousemove", cardMovement);
      document.addEventListener("mouseout", cardMovementStop);
    },
  },
};
</script>
