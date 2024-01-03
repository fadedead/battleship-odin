import { getGameSetup } from "./gameSetupUI";
import "./style.css";

console.log("Hello Fadedead");

function main() {
  const content = document.getElementById("content");

  const setup = getGameSetup();
  content.appendChild(setup);
}

main();
