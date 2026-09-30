// Interfaccia del counter: crea gli elementi con il DOM e mostra il valore.

// Crea un elemento con classe, testo e attributi facoltativi.
function createElement(tag, className, text, attributes = {}) {
  const element = document.createElement(tag);
  if (className) {
    element.className = className;
  }
  if (text !== undefined) {
    element.textContent = text;
  }
  for (const [name, value] of Object.entries(attributes)) {
    element.setAttribute(name, value);
  }
  return element;
}

function createStepButtons() {
  const group = createElement("div", "counter__steps", undefined, {
    role: "group",
    "aria-label": "Passo",
  });
  group.append(createElement("span", "counter__steps-label", "Passo"));

  for (const step of STEPS) {
    const button = createElement("button", "step", String(step), {
      type: "button",
      "data-step": step,
      "aria-pressed": "false",
    });
    group.append(button);
  }
  return group;
}

// Costruisce il counter dentro root e restituisce i riferimenti agli elementi.
function buildCounter(root) {
  const card = createElement("section", "counter", undefined, { "aria-label": "Counter" });

  const display = createElement("output", "counter__value", undefined, { "aria-live": "polite" });

  const controls = createElement("div", "counter__controls");
  const minusButton = createElement("button", "control control--minus", "−", { type: "button" });
  const plusButton = createElement("button", "control control--plus", "+", { type: "button" });
  controls.append(minusButton, display, plusButton);

  const stepButtons = createStepButtons();
  const resetButton = createElement("button", "counter__reset", "Azzera", { type: "button" });

  const footer = createElement("div", "counter__footer");
  footer.append(stepButtons, resetButton);

  const hint = createElement("p", "counter__hint", "Tastiera: + o ↑ aumenta, − o ↓ diminuisce, 0 azzera.");

  card.append(controls, footer, hint);
  root.append(card);

  return {
    display,
    minusButton,
    plusButton,
    resetButton,
    stepButtons: stepButtons.querySelectorAll(".step"),
  };
}

// Aggiorna la pagina con lo stato attuale del counter.
function renderCounter(elements, counter) {
  const { display, minusButton, plusButton, stepButtons } = elements;

  display.textContent = counter.value;
  display.classList.toggle("is-positive", counter.value > 0);
  display.classList.toggle("is-negative", counter.value < 0);

  minusButton.setAttribute("aria-label", `Diminuisci di ${counter.step}`);
  plusButton.setAttribute("aria-label", `Aumenta di ${counter.step}`);

  for (const button of stepButtons) {
    const isActive = Number(button.dataset.step) === counter.step;
    button.setAttribute("aria-pressed", String(isActive));
  }
}
