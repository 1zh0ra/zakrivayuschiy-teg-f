function changeTheme(theme) {
  document.documentElement.className = "";
  document.documentElement.classList.add(`theme-${theme}`);
  localStorage.setItem("theme", theme);
}

function setThemeAutomatically() {
  const prefersDarkScheme = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const autoTheme = prefersDarkScheme ? "dark" : "light";
  changeTheme(autoTheme);
}

(function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    if (savedTheme === "auto") {
      setThemeAutomatically();
    } else {
      changeTheme(savedTheme);
    }
  } else {
    setThemeAutomatically();
    localStorage.setItem("theme", "auto");
  }
})();

document.addEventListener("DOMContentLoaded", () => {
  const themeButtons = document.querySelectorAll(".theme-menu__button");

  function setDisabled(currentTheme) {
    themeButtons.forEach((item) => {
      if (item.getAttribute("data-theme") === currentTheme) {
        item.setAttribute("disabled", true);
      } else {
        item.removeAttribute("disabled");
      }
    });
  }

  function updateThemeButtonState() {
    const currentTheme = localStorage.getItem("theme") || "auto";
    setDisabled(currentTheme);
  }

  themeButtons.forEach((button) => {
    button.onclick = () => {
      const theme = button.getAttribute("data-theme");
      if (theme === "auto") {
        setThemeAutomatically();
      } else {
        changeTheme(theme);
      }
      localStorage.setItem("theme", theme);
      updateThemeButtonState();
    };
  });

  updateThemeButtonState();
});
