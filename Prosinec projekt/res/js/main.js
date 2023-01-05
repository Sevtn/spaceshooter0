const jet = document.getElementById("jet");
const board = document.getElementById("board");
var rocks = document.getElementById("rocks");

window.addEventListener("keyup", (a) => {
  var left = parseInt(window.getComputedStyle(jet).getPropertyValue("left"));
  if (a.key == "ArrowLeft" && left > 0) {
    jet.style.backgroundImage = "url(/res/img/frame0.png)"; //reset na default
  } else if (a.key == "ArrowRight" && left <= 1980) {
    jet.style.backgroundImage = "url(/res/img/frame0.png)"; //reset na default
  }
});

//pohyb do stran
window.addEventListener("keydown", (e) => {
  var left = parseInt(window.getComputedStyle(jet).getPropertyValue("left"));  //sehnavani leftu
  if (e.key == "ArrowLeft" && left > -30) {
    jet.style.left = left - 10 + "px";
    jet.style.backgroundImage = "url(/res/img/frame.png)"; //vlevo
  } else if (e.key == "ArrowRight" && left <= 1980) {
    jet.style.left = left + 10 + "px";
    jet.style.backgroundImage = "url(/res/img/frame1.png)"; //pravo
  }

  //pew pew
  if (e.key == "ArrowUp" || e.keyCode == 32) {
    //32 spacebar
    var bullet = document.createElement("div");
    bullet.classList.add("bullets");
    board.appendChild(bullet);

    var movebullet = setInterval(() => {
      var rocks = document.getElementsByClassName("rocks");

      for (var i = 0; i < rocks.length; i++) {//udelat jednotlivi rocks
        var rock = rocks[i];//kazdy rock
        if (rock != undefined) {
          var rockhitbox = rock.getBoundingClientRect(); //hitboxes
          var bullethitbox = bullet.getBoundingClientRect();

          if (
            //podminka pokud doslo ke kolizi
            bullethitbox.left >= rockhitbox.left &&
            bullethitbox.right <= rockhitbox.right &&
            bullethitbox.top <= rockhitbox.top &&
            bullethitbox.bottom <= rockhitbox.bottom
          ) {
            rock.parentElement.removeChild(rock); //remove tento rock
            //udelat scoreboard
          }
        }
      }
      var bulletbottom = parseInt(
        window.getComputedStyle(bullet).getPropertyValue("bottom")  //sehnavani bottom
      );
      //stop
      if (bulletbottom >= 800) {
        clearInterval(movebullet);
      }

      bullet.style.left = left + 45 + "px"; //jak hodne on leve strany
      bullet.style.bottom = bulletbottom + 3 + "px"; //rychlost projektilu
    });
  }
});



var rockgenerator=setInterval(() => {  //interval na spawning
  var rock = document.createElement("div");
  rock.classList.add("rocks");
  var LEFT= parseInt(window.getComputedStyle(rock).getPropertyValue("left")//sehnat si left od rock
  );
  rock.style.left= Math.floor(Math.random() * 450)+ "px";  //generator na pozice od 0 az 450px od leva
board.appendChild(rock);

},2000//spawn rate
);

var moverocks = setInterval(() => {
  var rocks = document.getElementsByClassName("rocks");
  if (rocks != undefined) {
  for (var i = 0; i < rocks.length; i++) {
    var rock = rocks[i];  //kazdy rock
  var rocktop = parseInt(
    window.getComputedStyle(rock).getPropertyValue("top"));

    rock.style.top = rocktop + 25 + "px";
  }
}
}
,1000);