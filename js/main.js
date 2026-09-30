// Punto di ingresso: collega la logica del counter all'interfaccia.

let counter = loadCounter();
const elements = buildCounter(document.getElementById("app"));

// Applica una modifica al counter, poi salva e aggiorna la pagina.
function update(change) {
  counter = change(counter);
  saveCounter(counter);
  renderCounter(elements, counter);
}

elements.plusButton.addEventListener("click", () => update(increment));
elements.minusButton.addEventListener("click", () => update(decrement));
elements.resetButton.addEventListener("click", () => update(reset));

for (const button of elements.stepButtons) {
  button.addEventListener("click", () => {
    update((current) => setStep(current, Number(button.dataset.step)));
  });
}

document.addEventListener("keydown", (event) => {
  if (event.ctrlKey || event.metaKey || event.altKey) {
    return;
  }
  if (event.key === "+" || event.key === "ArrowUp") {
    event.preventDefault();
    update(increment);
  } else if (event.key === "-" || event.key === "ArrowDown") {
    event.preventDefault();
    update(decrement);
  } else if (event.key === "0") {
    update(reset);
  }
});

renderCounter(elements, counter);
