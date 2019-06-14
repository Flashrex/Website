let Projects = [
    { logopath: "images/snake.png", headline: "Snake", file: "games/snake/index.html", link: "https://github.com/Flashrex", description: "Snake Game written in vanilla Javascript. You can leave and reenter the field. ;)"},
    { logopath: "images/pong.png", headline: "Pong!", file: "games/pong/index.html", link: "https://github.com/Flashrex", description: "Classic old Pong! written in vanilla Javascript. Added 2 Player Mode and Game Stages for extra difficulty."},
    { logopath: "images/rage.png", headline: "San Street Life | RageMP", file: "", link: "https://github.com/Flashrex/San-Street-Life", description: "This is a gamemode written in C#, Html/Css and Js for the Gta V modification Rage:Mp. It is still work in progress."},
    { logopath: "images/asteroid.png", headline: "AsteroidField", file: "", link: "https://gitlab.informatik.hs-fulda.de/fdai5902/raumschiff", description: "Our own version of the popular game 'Asteroids' from 1979 written in Java that we created as a university project."},
    { logopath: "images/logo.png", headline: "Website", file: "", link: "https://github.com/Flashrex/Website", description: "This Website - Created in plain Html/Css/Js."}
]

addGames();
function addGames() {
    let projectbox = document.getElementById("projectbox");

    var counter = 1;
    for(var i = 0; i < Projects.length; i++) {
        let linkText = "Open on Github";
        if(Projects[i].link.includes("gitlab")) linkText = "Open on Gitlab";
        let htmlString = '<div class="project" id="project_' +i +'">'
        +'<img src=' +Projects[i].logopath +' alt=img_' +i +'" width="100" height="100"> '
        +'<h4>' +Projects[i].headline +'</h4>';
        if(Projects[i].file !== "") {
            htmlString += '<span><a href="' +Projects[i].file +'">Play!</a></span> <span><a href="' +Projects[i].link +'">' +linkText +'</a></span>';
        } else {
            htmlString += '<span><a href="' +Projects[i].link +'">' +linkText +'</a></span>'
        }
        htmlString += '<p>' +Projects[i].description + '</p>' + '</div>';
        
        projectbox.innerHTML += htmlString;

        document.getElementById("project_" +i).style = 'grid-column:' +((i+1) % 4) +'/' +((i+2) % 4) +'; grid-row:' +counter +'/' +(counter+1);
        if(i % 4 === 3) counter++;
    }
    
}