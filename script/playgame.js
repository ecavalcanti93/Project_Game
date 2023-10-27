window.onload = function () {
    const startButton = document.getElementById("button-play");
    //const restartButton = document.getElementById("restart-button");
  
    startButton.addEventListener("click", function () {
      startGame();
    });
  
    function startGame() {
      console.log("start game");
    }
  };