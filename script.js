(() => {
  const screens = Array.from(document.querySelectorAll(".screen"));
  const counter = document.getElementById("page-count");
  let current = 0;

  function showScreen(index) {
    current = Math.max(0, Math.min(screens.length - 1, index));
    screens.forEach((screen, i) => {
      screen.classList.toggle("active", i === current);
      screen.setAttribute("aria-hidden", i === current ? "false" : "true");
    });
    counter.textContent = `${String(current + 1).padStart(2, "0")} / ${String(screens.length).padStart(2, "0")}`;
    window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }

  document.querySelectorAll("[data-next]").forEach(button => button.addEventListener("click", () => showScreen(current + 1)));
  document.querySelectorAll("[data-prev]").forEach(button => button.addEventListener("click", () => showScreen(current - 1)));
  document.getElementById("restart").addEventListener("click", () => {
    document.getElementById("surprise-message").hidden = true;
    document.getElementById("surprise-button").hidden = false;
    showScreen(0);
  });

  const quotes = [
    "Las amistades bonitas no necesitan ser perfectas; necesitan ser sinceras.",
    "Qué suerte encontrar personas con quienes podemos ser nosotros mismos.",
    "Hay detalles pequeños que guardan un cariño enorme.",
    "Gracias por las risas, las pláticas y los momentos compartidos.",
    "La vida se siente un poquito mejor cuando la compartimos con buenas personas.",
    "Ojalá nunca te falten motivos para sonreír y recordar cuanto la quiero.",
    "Una amistad sincera vale más que mil palabras bonitas.",
    "No hace falta decirlo todos los días para agradecer que esté en mi vida."
  ];
  let lastQuote = 0;
  document.getElementById("new-quote").addEventListener("click", () => {
    let next = Math.floor(Math.random() * quotes.length);
    if (quotes.length > 1) while (next === lastQuote) next = Math.floor(Math.random() * quotes.length);
    lastQuote = next;
    const quote = document.getElementById("random-quote");
    quote.animate([{ opacity: 0, transform: "translateY(5px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 300 });
    quote.textContent = quotes[next];
  });

  const surpriseButton = document.getElementById("surprise-button");
  surpriseButton.addEventListener("click", () => {
    surpriseButton.hidden = true;
    document.getElementById("surprise-message").hidden = false;
  });

  showScreen(0);
})();