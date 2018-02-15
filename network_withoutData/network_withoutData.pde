float r;
float r2;

void setup() {
  size(1000, 1000);
  r = width/2.5;
  r2= width/6;
  frameRate(120);
  smooth();
  //ellipse(width/2, height/2, r*2, r*2);
}

void draw() {

  background(0);
  randomSeed(360);
  noStroke();

  for (int i =0; i<10; i++) {
    float angle = random(360);
    float jitter = random(-100, 100);
    float x = width/2 + cos(radians(angle)) * (r+jitter);
    float y = width/2 + sin(radians(angle)) * (r+jitter);

    float jitter2 = random(-50, 50);
    float x2 = width/2+100 + cos(radians(angle)) * (r2+jitter2);
    float y2 = width/2+200 + sin(radians(angle)) * (r2+jitter2);

    float pos = width/2;
    float diameter = 50;

    if (mousePressed) {

      //FAKE
      strokeWeight(2);
      stroke(30, 215, 96, 10);
      line(pos, pos, pos+100, pos+200);

      stroke(30, 215, 96);
      strokeWeight(20);
      point(pos+100, pos+200);

      fill(255);
      textAlign(CENTER);
      text("related", pos+100, pos+225);

      if (keyPressed) {   
        strokeWeight(20);
        stroke(30, 215, 96);
        point(x2, y2);

        strokeWeight(2);
        stroke(30, 215, 96, 100);
        line(pos+100, pos+200, x2, y2);

        noStroke();
        fill(255);
        textAlign(CENTER);
        text("MAIN", pos, pos+diameter/10+40);
        fill(30, 215, 96, 50);
        ellipse(pos, pos, diameter, diameter);

        stroke(30, 215, 96, 30);
        strokeWeight(20);
        point(x, y);
        
        fill(255);
        textAlign(CENTER);
        text("related 2", x2, y2+diameter/10+20);

        strokeWeight(2);
        stroke(30, 215, 96, 30);
        line(x, y, pos, pos);
      
    } else {

        noStroke();
        fill(255);
        textAlign(CENTER);
        text("MAIN", pos, pos+diameter/10+40);
        
        fill(30, 215, 96);
        ellipse(pos, pos, diameter, diameter);

        fill(255);
        textAlign(CENTER);
        text("related", x, y+diameter/10+20);

        stroke(30, 215, 96);
        strokeWeight(20);
        point(x, y);

        strokeWeight(2);
        stroke(30, 215, 96, 100);
        line(x, y, pos, pos);
      }
    } else {
      
      fill(30, 215, 96, 5);
      ellipse(pos, pos, diameter, diameter);

      fill(255);
      textAlign(CENTER);
      text("MAIN", pos, pos+diameter/10+40);
    }
  }
}