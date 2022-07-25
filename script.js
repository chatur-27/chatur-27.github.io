var flag = true;
var arr = [];
var myarr = [];
var level;
var check;
var beep;

// Action Listener for keypress
document.addEventListener("keypress", function() {
  if (flag) {
    initialiseGame();
    flag = false;
    level = 2;
  }
});

// Action Listener for Mouse Click
for (var i = 0; i < 4; i++) {
  document.querySelectorAll(".box")[i].addEventListener("click", function() {

    // used tempo var bcoz can't use this inside timeout function
    var tempo = this;

    // onClick Flash
    tempo.classList.add("flash");
    setTimeout(function() {
      tempo.classList.remove("flash");
    }, 100);

    // onClick audio
    beep = new Audio("audio/box" + this.dataset.value + ".wav");
    beep.play();

    // insert my clicked value in myarray
    myarr.push(this.dataset.value);
    console.log("myarr value = " + myarr);
    check = verify();

    // if result not matched
    if (!check) {
      console.log("wrong data is inputed");
      reset();

    }

    // flag used to distinguish from reset
    if (myarr.length == arr.length && flag == false) {
      changeHeading();
      flash();
      myarr = [];
    }

  });
}

function initialiseGame() {
  document.querySelector(".heading").innerHTML = "Level 1";
  flash();

}

function changeHeading() {
  var head = document.querySelector(".heading");
  head.innerHTML = "Level " + level;
  level++;
}

function flash() {
  var rand = Math.floor(Math.random() * 4) + 1;
  arr.push(rand);
  console.log("arr value = " + arr);

  // to display flash

  setTimeout(function() {
    document.querySelector(".box" + rand).classList.add("flash");
  }, 500);

  setTimeout(function() {
    document.querySelector(".box" + rand).classList.remove("flash");
  }, 800);

  // random key audio
  setTimeout(function() {
    beep = new Audio("audio/box" + rand + ".wav");
    beep.play();
  }, 500);



}

function verify() {
  var equal = true;
  for (var i = 0; i < myarr.length; i++) {
    if (myarr[i] != arr[i]) {
      equal = false;
      break;
    }
  }
  return equal;
}

function reset() {
  flag = true;
  arr = [];
  myarr = [];
  document.querySelector(".heading").innerHTML = "Game Over, Press a Key to Start!";

  // to display red light for wrong answer
  document.querySelector("body").classList.add("wrongans");
  setTimeout(function() {
    document.querySelector("body").classList.remove("wrongans");
  }, 100);

  // play wrong audio beep
  beep = new Audio("audio/wrong.mp3");
  beep.play();
}
