let rainM = document.getElementById("rain");

let sounds = document.querySelectorAll("audio");

let playBtn = document.querySelector(".toggle-btn button");

let inputVol = document.querySelectorAll("input");

sounds.forEach((s) => {
  s.volume = s.dataset.startVol;
  inputVol.forEach((ipt) => {
    ipt.addEventListener("change", () => {
      if (ipt.id === "rain-vol" && s.id === "rain") {
        s.volume = ipt.value;
      } else if (ipt.id === "lightning-vol" && s.id === "lightning") {
        s.volume = ipt.value;
      } else if (ipt.id === "waves-vol" && s.id === "waves") {
        s.volume = ipt.value;
      } else if (ipt.id === "fire-vol" && s.id === "fire") {
        s.volume = ipt.value;
      } else if (ipt.id === "coffee-vol" && s.id === "coffee") {
        s.volume = ipt.value;
      }
    });
  });
});

playBtn.addEventListener("click", () => {
  if (rainM.paused) {
    sounds.forEach((s) => {
      s.play();
    });
    playBtn.className = "";
    playBtn.className = "pause";

    /* Tell Analytics about longSession */
    var anc = false;
    window.setInterval(function () {
      if (!anc) {
        ga("send", "event", "longSession15", "longSession15");
        anc = true;
      }
    }, 900000);
  } else {
    sounds.forEach((s) => {
      s.pause();
    });
    playBtn.className = "";
    playBtn.className = "play";
  }
});

// ##################################################################
var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName("typewrite");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-type");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
};
