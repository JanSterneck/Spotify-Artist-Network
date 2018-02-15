import http.requests.*;
Artist a;
JSONObject related;


void setup() {
  size(1000, 1000);
  loadData();
}


//REALTIME
//GetRequest get = new GetRequest("https://api.spotify.com/v1/artists/0cmWgDlu9CwTgxPhf403hb/related-artists");
//get.addHeader("Accept", "application/json");
//get.addHeader("Authorization", "Bearer BQDQGbowSGrrdiksACRp_NqV6Ky-Ct6xh37ZjB7Z3aMDQ9YWZcSqlgbRYUoB1HvVIN-RW9bm81a4K0CMpEzEjHV-vkEVBtNAFc3X8X5Us-R35T6O1bVyD3j8lHwOmszD93Dq7ahFpqiWceIvGnIH");
//get.send();
//System.out.println("Reponse Content:" + get.getContent() + "\n");
//System.out.println("Reponse Content-Length Header: " + get.getHeader("Content-Length"));
//json = get.getContent();

void draw() {
  background(0);
  a.display();
  a.rollover(mouseX, mouseY);
  textAlign(LEFT);
  fill(255);
  text("Click to get related artists.", 10, height-10);
}


void loadData() {


  //REALTED-ARTISTS.JSON
  related = loadJSONObject("related-artists");

  for (int i =0; i<10; i++) {
    JSONArray artists = related.getJSONArray("artists");
    JSONObject artist = artists.getJSONObject(i);
    String name = artist.getString("name");


    float x = width/2;
    float y = height/2;
    float diameter = 50;

    a = new Artist(x, y, diameter, name);
    println(name);
    }
  }
  