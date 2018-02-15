class Artist {
 
  String name;
  float x = width/2;
  float y = height/2;
  float diameter = x;
  
  boolean over = false;

  Artist(float x_, float y_, float diameter_, String s) {
    x = x_;
    y = y_;
    diameter = diameter_;
    name = s;
  }
  

  void rollover(float px, float py) {
    float d = dist(px, py, x, y);
    if (d < diameter/2) {
      over = true;
    } else {
      over = false;
    }
  }
  void display() {
    strokeWeight(3);
    stroke(30, 215, 96, 170);
    noFill();
    ellipse(x, y, 50, 50);
    if (over) {
      fill(30, 215, 96);
      ellipse(x, y, diameter, diameter);
      fill(255);
      textAlign(CENTER);
      text(name, x, y+diameter/2+20);
    }
  }
}