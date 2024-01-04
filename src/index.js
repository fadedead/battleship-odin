const { getGameSetup } = require("./gameSetupUI");
import "./style.css";

function main() {
  const content = document.getElementById("content");

  const setup = getGameSetup();
  content.appendChild(setup);
}

main();
