$(document).ready(function () {
  /**
   * Navigation menu button functionality
   */
  const navMenu = document.getElementById("navigation");
  const navBttn = document.getElementById("nav-button-wrapper");
  const navExitBttn = document.getElementById("nav-exit-button-wrapper");
  navBttn.addEventListener("click", () => {
    navMenu.classList.add("visible-navigation");
    navMenu.classList.remove("hidden-navigation");
  });

  navExitBttn.addEventListener("click", () => {
    navMenu.classList.add("hidden-navigation");
    navMenu.classList.remove("visible-navigation");
  });
});
