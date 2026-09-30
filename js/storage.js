// Salvataggio del counter nel localStorage del browser.

const STORAGE_KEY = "counter-app";

function loadCounter() {
  const counter = createCounter();

  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && Number.isInteger(saved.value)) {
      counter.value = saved.value;
    }
    if (saved && STEPS.includes(saved.step)) {
      counter.step = saved.step;
    }
  } catch (error) {
    // Dati non leggibili o storage bloccato: si riparte da zero.
  }

  return counter;
}

function saveCounter(counter) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(counter));
  } catch (error) {
    // Storage non disponibile (per esempio in navigazione privata): il counter funziona lo stesso.
  }
}
