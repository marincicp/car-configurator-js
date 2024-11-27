const topBar = document.querySelector("#top-bar");
const exteriorColorSelection = document.querySelector("#exterior-btns");
const interiorColorSelection = document.querySelector("#interior-btns");
const exteriorImage = document.querySelector("#exterior-image");
const interiorImage = document.querySelector("#interior-image");
const wheelBtnsSection = document.querySelector("#wheel-btns");
const perfomanceBtn = document.querySelector("#performance-btn");
const totalPriceEl = document.querySelector("#total-price");
const fullSelfDrivingCheckbox = document.querySelector(
  "#full-self-driving-checkbox"
);
const accessoryCheckboxes = document.querySelectorAll(
  ".accessory-form-checkbox"
);

const downPaymentEl = document.querySelector("#down-payment");
const monthlyPaymentEl = document.querySelector("#monthly-payment");

// State
const basePrice = 52490;
let currentPrice = basePrice;

const pricing = {
  "Performance Wheels": 2500,
  "Performance Package": 5000,
  "Full Self-Driving": 8500,
  Accessories: {
    "Center Console Trays": 35,
    Sunshade: 105,
    "All-Weather Interior Liners": 225,
  },
};

// Update total price int the UI
function updateTotalPrice() {
  currentPrice = basePrice;

  if (selectedOptions["Performance Wheels"]) {
    currentPrice += pricing["Performance Wheels"];
  }

  if (selectedOptions["Performance Package"]) {
    currentPrice += pricing["Performance Package"];
  }

  if (selectedOptions["Full Self-Driving"]) {
    currentPrice += pricing["Full Self-Driving"];
  }

  accessoryCheckboxes.forEach((checkbox) => {
    const accessoryLabel = checkbox
      .closest("label")
      .querySelector("span")
      .textContent.trim();

    const accessoryPrice = pricing["Accessories"][accessoryLabel];

    if (checkbox.checked) {
      currentPrice += accessoryPrice;
    }
  });

  totalPriceEl.textContent = `$${currentPrice.toLocaleString()}`;
  updatePaymentBreakdown();
}

let selectedColor = "Stealth Gray";
const selectedOptions = {
  "Performance Wheels": false,
  "Performance Package": false,
  "Full Self-Driving": false,
};

// Update payment breakdown based on current price
function updatePaymentBreakdown() {
  // Calc down payment
  const downPayment = currentPrice * 0.1;
  downPaymentEl.textContent = `$${downPayment.toLocaleString()}`;
  // Calc loan details (assuming 60-month loadn and 3% interest rate)
  const loanTermMonths = 60;
  const interestRate = 0.03;

  const loanAmount = currentPrice - downPayment;
  // Monthly payment formula: P * (r(1+r)^n) / ((1+r)^n - 1)
  const monthlyInterestRate = interestRate / 12;

  const monthlyPayment =
    (loanAmount *
      (monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, loanTermMonths))) /
    (Math.pow(1 + monthlyInterestRate, loanTermMonths) - 1);

  monthlyPaymentEl.textContent = `$${monthlyPayment
    .toFixed(2)
    .toLocaleString()}`;
}
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
      selectedColor = button.querySelector("img").alt;
      updateExteriorImage();
    }

    if (e.currentTarget === interiorColorSelection) {
      const color = button.querySelector("img").alt;
      interiorImage.src = interiorImages[color];
    }
  }
}

// Update exterior Image baed on color and wheels
function updateExteriorImage() {
  const performanceSuffix = selectedOptions["Performance Wheels"]
    ? "-performance"
    : "";
  const colorKey =
    selectedColor in exteriorImages ? selectedColor : "Stealth Gray";

  exteriorImage.src = exteriorImages[colorKey].replace(
    ".jpg",
    `${performanceSuffix}.jpg`
  );
}

// Wheel Selection
function handleWheelButtonClick(e) {
  if (e.target.tagName === "BUTTON") {
    const buttons = document.querySelectorAll("#wheel-btns button");

    buttons.forEach((btn) => btn.classList.remove("bg-gray-700", "text-white"));

    e.target.classList.add("bg-gray-700", "text-white");
    selectedOptions["Performance Wheels"] =
      e.target.textContent.includes("Performance");
    updateExteriorImage();

    updateTotalPrice();
  }
}

// Performance package selection
function handlePerformanceButtonClick() {
  const isSelected = perfomanceBtn.classList.toggle("bg-gray-700");
  perfomanceBtn.classList.toggle("text-white");

  selectedOptions["Performance Package"] = isSelected;

  updateTotalPrice();
}

// Full self driving selection
function fullSelfDrivingChange() {
  selectedOptions["Full Self-Driving"] = fullSelfDrivingCheckbox.checked;

  updateTotalPrice();
}

// Handle accessory checknox listener
accessoryCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", updateTotalPrice);
});

// Initial update price
updateTotalPrice();

// event listeners
window.addEventListener("scroll", () => requestAnimationFrame(handleScroll));
exteriorColorSelection.addEventListener("click", handleColorButtonClick);
interiorColorSelection.addEventListener("click", handleColorButtonClick);
wheelBtnsSection.addEventListener("click", handleWheelButtonClick);
perfomanceBtn.addEventListener("click", handlePerformanceButtonClick);
fullSelfDrivingCheckbox.addEventListener("change", fullSelfDrivingChange);
