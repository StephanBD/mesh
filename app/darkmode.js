// DOM Elements
const darkButton = document.getElementById("dark");
const lightButton = document.getElementById("light");
const solarButton = document.getElementById("solar");
const body = document.body;

// Apply the cached theme on reload
const theme = localStorage.getItem("theme");
const isSolar = localStorage.getItem("isSolar");

if (theme) {
  body.classList.add(theme);
  isSolar && body.classList.add("solar");
}

// Button Event Handlers
darkButton.onclick = () => {
  body.classList.replace("light", "dark");
  localStorage.setItem("theme", "dark");
};

lightButton.onclick = () => {
  body.classList.replace("dark", "light");

  localStorage.setItem("theme", "light");
};

solarButton.onclick = () => {
  if (body.classList.contains("solar")) {
    body.classList.remove("solar");
    solarButton.style.cssText = `
      --bg-solar: var(--yellow);
    `;

    solarButton.innerText = "solarize";

    localStorage.removeItem("isSolar");
  } else {
    solarButton.style.cssText = `
      --bg-solar: white;
    `;

    body.classList.add("solar");
    solarButton.innerText = "normalize";

    localStorage.setItem("isSolar", true);
  }
};

//-----------------------------------------------------//
// Select the button
const btn = document.querySelector("#toggledark");

// Apply the cached theme on reload
const theme = localStorage.getItem("theme");
const isSolar = localStorage.getItem("isSolar");
localStorage.getItem("theme") ? document.body.classList.toggle(theme) : true;
if (theme) {
  // body.classList.add(theme);
  document.body.classList.toggle(theme);
}
btn.onclick = () => {
  // body.classList.replace("light", "dark");
};

btn.addEventListener("click", function () {
  switchTheme("dark-theme");
});
function switchTheme(themeName) {
  document.body.classList.toggle("dark-theme");
  // if (theme) {
  //   localStorage.setItem("theme", "dark-theme");
  // } else {
  //   localStorage.setItem("theme", null);
  // }

  theme
    ? localStorage.setItem("theme", "dark-theme")
    : localStorage.removeItem("theme");
}

// // Listen for a click on the button
// btn.addEventListener("click", toggle);

// // Then toggle (add/remove) the .dark-theme class to the body
// function toggle() {
//   document.body.classList.toggle("dark-theme");
//   console.log(document.body.classList);
// }

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  localStorage.getItem("theme")
    ? localStorage.removeItem("theme")
    : localStorage.setItem("theme", "dark-theme");
});
