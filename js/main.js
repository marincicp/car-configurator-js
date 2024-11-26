const topBar = document.querySelector("#top-bar");
const exteriorColorSelection = document.querySelector("#exterior-btns");
const interiorColorSelection = document.querySelector("#interior-btns");
const exteriorImage = document.querySelector("#exterior-image");
const interiorImage = document.querySelector("#interior-image");

// Handle top bar on scroll
function handleScroll() {
  const atTop = window.scrollY === 0;

  topBar.classList.toggle("visible-bar", atTop);
  topBar.classList.toggle("hidden-bar", !atTop);
}

// Image Mapping
const exteriorImages = {
  "Stealth Gray": "./images/model-y-stealth-grey.jpg",
  "Pearl White": "./images/model-y-pearl-white.jpg",
  "Deep Blue": "./images/model-y-deep-blue-metallic.jpg",
  "Solid Black": "./images/model-y-solid-black.jpg",
  "Ultra Red": "./images/model-y-ultra-red.jpg",
  Quicksilver: "./images/model-y-quicksilver.jpg",
};
const interiorImages = {
  Dark: "./images/model-y-interior-dark.jpg",
  Light: "./images/model-y-interior-light.jpg",
};

// Handle color selection
function handleColorButtonClick(e) {
  let button;
  if (e.target.tagName === "IMG") {
    button = e.target.closest("button");
  } else if (e.target.tagName === "BUTTON") {
    button = e.target;
  }

  if (button) {
    const buttons = e.currentTarget.querySelectorAll("button");
    buttons.forEach((btn) => btn.classList.remove("btn-selected"));
    button.classList.add("btn-selected");

    if (e.currentTarget === exteriorColorSelection) {
      const color = button.querySelector("img").alt;
      exteriorImage.src = exteriorImages[color];
    }

    if (e.currentTarget === interiorColorSelection) {
      const color = button.querySelector("img").alt;
      interiorImage.src = interiorImages[color];
    }
  }
}

// event listeners
window.addEventListener("scroll", () => requestAnimationFrame(handleScroll));

exteriorColorSelection.addEventListener("click", handleColorButtonClick);

interiorColorSelection.addEventListener("click", handleColorButtonClick);
