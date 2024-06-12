let welcomeButton = document.querySelector("#welcomeButton");
let promise = document.querySelector("#promise");

promise.addEventListener("change", ()=> {
    if (promise.checked){
      welcomeButton.removeAttribute("disabled", true);
    }
  });