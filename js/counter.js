// Logica del counter: calcola i nuovi valori, senza toccare il DOM.

const INITIAL_VALUE = 0;
const STEPS = [1, 5, 10];

function createCounter() {
  return { value: INITIAL_VALUE, step: STEPS[0] };
}

function increment(counter) {
  return { ...counter, value: counter.value + counter.step };
}

function decrement(counter) {
  return { ...counter, value: counter.value - counter.step };
}

function reset(counter) {
  return { ...counter, value: INITIAL_VALUE };
}

function setStep(counter, step) {
  if (!STEPS.includes(step)) {
    return counter;
  }
  return { ...counter, step: step };
}
