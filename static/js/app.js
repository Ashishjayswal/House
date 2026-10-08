const form = document.getElementById("predictionForm");
const predictBtn = document.getElementById("predictBtn");
const emptyState = document.getElementById("emptyState");
const predictionResult = document.getElementById("predictionResult");
const errorMessage = document.getElementById("errorMessage");

const price = document.getElementById("price");
const summarySize = document.getElementById("summarySize");
const summaryBeds = document.getElementById("summaryBeds");
const summaryBaths = document.getElementById("summaryBaths");
const summaryFloors = document.getElementById("summaryFloors");

const formatNumber = (value) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(value);

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");
  predictionResult.classList.add("hidden");
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  errorMessage.classList.add("hidden");

  const payload = {
    house_size: Number(document.getElementById("houseSize").value),
    bedrooms: Number(document.getElementById("bedrooms").value),
    bathrooms: Number(document.getElementById("bathrooms").value),
    floors: Number(document.getElementById("floors").value)
  };

  if (!payload.house_size || payload.house_size <= 0) {
    showError("Please enter a valid house size.");
    return;
  }

  predictBtn.disabled = true;
  predictBtn.querySelector("span").textContent = "Calculating...";

  try {
    const response = await fetch("/api/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error || "Unable to generate prediction.");
    }

    emptyState.classList.add("hidden");
    predictionResult.classList.remove("hidden");

    price.textContent = `₹${formatNumber(data.prediction)}`;
    summarySize.textContent = `${formatNumber(data.inputs.house_size)} sq ft`;
    summaryBeds.textContent = `${data.inputs.bedrooms}`;
    summaryBaths.textContent = `${data.inputs.bathrooms}`;
    summaryFloors.textContent = `${data.inputs.floors}`;

    document.getElementById("resultPanel").scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  } catch (error) {
    showError(error.message);
  } finally {
    predictBtn.disabled = false;
    predictBtn.querySelector("span").textContent = "Predict Property Price";
  }
});

document.getElementById("resetBtn").addEventListener("click", () => {
  form.reset();
  emptyState.classList.remove("hidden");
  predictionResult.classList.add("hidden");
  errorMessage.classList.add("hidden");
});
