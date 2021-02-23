
let blogposts = [
    //{ imgpath: "images/hackerman.jpg", headline: "RageMP Tutorial Reihe", language: "Language: german/deutsch", link: "https://www.youtube.com/watch?v=VvM6iu321Eg&list=PLF4R_lvpina_p17OwwAAwOZTTyP1Tldqz", body: "Diese Tutorialreihe behandelt das Arbeiten mit der API der Grand Theft Auto V Multiplayer Modifikation Rage:MP. Ich erkläre die Grundlagen in YouTube Tutorials und gebe dem Zuschauer einen leichten und verständlich Einstieg."},
    //{ imgpath: "images/gameofthrones.jpg", headline: "Game of Thrones",  language: "Language: english/englisch", link: "#", body: "In this post I talk about the famous HBO tv show 'Game of Thrones'. I give my opinion about the final season and the whole series and why I think its one of the best shows in the world and what I think they did wrong in the end."}
];

addBlogPost();
function addBlogPost() {
    let gridbox = document.getElementById("gridbox");
    
    for(var i = 0; i < blogposts.length; i++) {
        gridbox.innerHTML += '<div class="blogpost" id="blogpost_' +i +'"' +'> <a href="' +blogposts[i].link +'">'
        +'<img src=' +blogposts[i].imgpath +' alt=img_' +i +' width="190" height="190"> '
        +'<h3>' +blogposts[i].headline +'</h3>'
        +'<h5>' +blogposts[i].language +'</h5>'
        +'<p>' +blogposts[i].body +'</p>'
        +'</a> </div>';

        document.getElementById("blogpost_" +i).style = 'grid-column: 1/2; grid-row: ' +(i+1) +'/' +(i+2) +';'; 
    }
}