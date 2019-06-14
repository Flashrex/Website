
let blogposts = [
    { imgpath: "images/hackerman.jpg", headline: "Java Grundlagen Tutorial", language: "Language: german/deutsch", body: "In diesem Tutorial erkläre ich die Grundlagen der objektorientierten Programmiersprache Java. Wir beginnen mit dem klassichen 'Hello World' und machen uns mit Variablen und Methoden vertraut. <br> Das Tutorial richtet sich an Einsteiger, die gerne in die Welt der Nullen und Einsen eintauchen möchten."},
    { imgpath: "images/gameofthrones.jpg", headline: "Game of Thrones",  language: "Language: english/englisch", body: "In this post I talk about the famous HBO tv show 'Game of Thrones'. I give my opinion about the final season and the whole series and why I think its one of the best shows in the world and what I think they did wrong in the end."}
];

addBlogPost();
function addBlogPost() {
    let gridbox = document.getElementById("gridbox");
    
    for(var i = 0; i < blogposts.length; i++) {
        gridbox.innerHTML += '<div class="blogpost" id="blogpost_' +i +'"' +'> <a href="#">'
        +'<img src=' +blogposts[i].imgpath +' alt=img_' +i +' width="190" height="190"> '
        +'<h3>' +blogposts[i].headline +'</h3>'
        +'<h5>' +blogposts[i].language +'</h5>'
        +'<p>' +blogposts[i].body +'</p>'
        +'</a> </div>';

        document.getElementById("blogpost_" +i).style = 'grid-column: 1/2; grid-row: ' +(i+1) +'/' +(i+2) +';'; 
    }
}