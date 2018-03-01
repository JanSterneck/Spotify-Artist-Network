//------------GOALS-------------//
//1. relative size (bubbles of smaller artists being visible without bubbles of bigger artists getting too big)
//2. hover over bubbles to fill
//3. open up at mouseClick
//4. click on related artist to make him/her the main artist
//5. fixed header – header inside sketch?



var related;
var amount = 10;
var toggleNames = true;
var spotifyApi = new SpotifyWebApi();
var button = document.querySelector('button');
var searchBox = document.querySelector('input');
//in case of 401 error: new AccessToken – https://developer.spotify.com/web-api/console/get-artist-related-artists/
spotifyApi.setAccessToken('BQAb1CB7mdYZEsGmJb__tUSmim9pM3AuN5fExTrCJKyLNB__M8-YVNJvwcfOvwnJNYv_cRWi_V4Iq2JfNmp-hQ_4N2_tOXaYGHlwPYaz4fURWQyN9OsGtlze87_-XDnZ4yNh3F56dg08a-Uq_08g');


function setup() {
		//User Interface
  sliderRange(1, 20);
  gui = createGui("CONTROL");
  gui.addGlobals("amount");
  gui.addGlobals("toggleNames");
  gui.addButton("save", function () {
    save("spotifyViz.svg");
  }
  );
	// i like my canvas like my browser window
	// SVG renderer (requires p5.svg.js)
	createCanvas(windowWidth, 1500, SVG);
	//some practical settings i like to use as default

	noStroke();
  	textSize(20);
  	smooth();

	//colorMode(HSB, 360, 100, 100, 1)
	//ellipseMode(CENTER);
	//rectMode(CENTER);
	//angleMode(DEGREES);

	//more setup code here


}

function draw(related) {
  if (related) {
    background(24, 24, 24);
    var angle = 360/amount;

    console.log(related);

    for (var i = 0; i < amount; i++) {
      var name = related.artists[i].name;
      var pop = related.artists[i].popularity;
      var followers = related.artists[i].followers.total;
      followers = followers/20000;

      var x = width/2 + cos(radians(angle*i)) * (pop*7);
      var y = height/2 + sin(radians(angle*i)) * (pop*7);

      //MAIN
      fill(30, 215, 96);
      noFill();
      ellipse(width/2, height/2, 40, 40);
      fill(255);
      fill(5);
      textAlign(CENTER);
      textFont('Montserrat');
      //text("MAIN", width/2, height/2+50);

      if (toggleNames==true) {
        fill(255);
        textSize(15);
        textFont('Montserrat');
        textAlign(CENTER);
        text(name, x, y+10+followers/2, 0, 100);
      }

      fill(30, 215, 96);
      ellipse(x, y, followers, followers);

      //LINES
      var xCenter = width/2 + cos(radians(angle*i)) * (30);
      var yCenter = height/2 + sin(radians(angle*i)) * (30);

      stroke(30, 215, 96, 50);
      line(xCenter, yCenter, x, y);
    }
  }
}

var search = function(query) {
  spotifyApi.searchArtists(query)
    .then(function(data) {
      var id = (data.artists.items[0].id);

      return id;
    })
    .then(function(id) {
      var related = spotifyApi.getArtistRelatedArtists(id);
      return related;
    })
    .then(function(related) {
      return draw(related);
    })
    .catch(function() {
      console.log('error');
    });
}

button.addEventListener('click', function() {
  var query = searchBox.value;
  search(query);
});

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}