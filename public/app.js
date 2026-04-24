const betaArea = document.querySelector("#beta-area");

fetch("/api/features")
  .then((response) => response.json())
  .then((features) => {
    if (features.betaDashboard === true) {
      betaArea.classList.remove("hidden");
    }
  });