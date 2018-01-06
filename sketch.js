class Planet {

  constructor(radius, orbit_radius, speed_ratio, color) {
    this.radius = radius;
    this.orbit_radius = orbit_radius;
    this.speed_ratio = speed_ratio;
    this.color = color;
  }

  draw() {
    push();
    ambientMaterial(color(100, 100, 100));
    translate(0, current_level * 80, 0);
    setTilt();
    rotateX(HALF_PI);
    torus(this.orbit_radius, 2, 100);
    pop();

    push();
    ambientMaterial(this.color);
    setTilt();
    translate(
      Math.cos(frameCount * this.speed_ratio) * this.orbit_radius,
      current_level * 120,
      Math.sin(frameCount * this.speed_ratio) * this.orbit_radius
    );

    sphere(this.radius);
    pop();
  }
}

function setTilt() {
  if (chorus) {
    rotateZ(Math.cos(frameCount * 0.5) * 0.1);
  }
}

function toggleSong() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}

var planets, song, btn, amp, current_level, chorus;

function preload() {
  song = loadSound('this-dot-kp.mp3');
}

function setup() {
  createCanvas(0.8 * windowWidth, 0.8 * windowHeight, WEBGL);
  noStroke();

  btn = createButton('Toggle music');
  btn.mousePressed(toggleSong);

  pointLight(color('white'), 200, 0, 0);

  camera(0, -450, 1000, 0, 150, 0, 0, 1, 0);

  song.setLoop(true);
  song.play();

  amp = new p5.Amplitude();

  // song.jump(55);

  planets = [
    new Planet(10, 150, 0.015, color('blue')),
    new Planet(30, 220, 0.013, color('red')),
    new Planet(40, 330, 0.02, color('green')),
    new Planet(20, 400, 0.024, color('yellow')),
    new Planet(28, 510, 0.022, color('orange')),
    new Planet(15, 590, 0.018, color('violet'))
  ];
}

function draw() {
  background(0);

  current_level = amp.getLevel();

  var curr_time = song.currentTime();
  chorus = (curr_time > 9.5 && curr_time < 24.8) || (curr_time > 40.22 && curr_time < 55.6);

  //sun
  ambientMaterial("yellow");
  sphere(50 + current_level * 30);

  //planets
  planets.forEach(p => {
    p.draw();
  });
}