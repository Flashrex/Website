class Project {
    constructor(logo, headline, description) {
        this.logo = logo;
        this.headline = headline;
        this.description = description;
        this.localFile = "";
        this.externalLink = "";
    }

    create(i) {
        let htmlString = 
            '<div class="project" id="project_' +i +'">' //Project Box
            +'<img src=' +this.logo +' alt=img_' +i +'" width="100" height="100"> ' //Logo
            +'<h4>' +this.headline +'</h4>'; //Headline

        if(this.localFile !== "") { //Local File Button
            htmlString += '<span><a href="' +this.localFile +'">Open!</a></span>'; 
        }

        if(this.externalLink.includes("github")) { //External Link Button
            htmlString += '<span><a href="' +this.externalLink +'">Open on Github</a></span>' 
        } else if(this.externalLink.includes("gitlab")) {
            htmlString += '<span><a href="' +this.externalLink +'">Open on Gitlab</a></span>'
        }

        htmlString += '<p>' +Projects[i].description + '</p>' + '</div>'; //Description

        document.getElementById("projectbox").innerHTML += htmlString; //Add Box to DomTree
        
        //Set Column and Row for new Box
        document.getElementById("project_" +i).style = 'grid-column:' +((i+1) % 4) +'/' +((i+2) % 4) +'; grid-row:' +Project.getRow() +'/' +(Project.getRow()+1);
        if(i > 0 && i % 3 == 0) Project.increaseRow();

        console.log("Projekt erstellt: " +Project.getRow());
    }

    addLocalFilePath(_localFile) {
        this.localFile = _localFile
    }

    addExternalLink(_externalLink) {
        this.externalLink = _externalLink;
    }

    static increaseRow() {
        this.currentRow++;
    }

    static getRow() {
        return this.currentRow;
    }
}
Project.currentRow = 1;

let Projects = [
    { logopath: "images/snake.png", headline: "Snake", file: "games/snake/index.html", link: "https://github.com/Flashrex", description: "Snake Game written in vanilla Javascript. You can leave and reenter the field. ;)"},
    { logopath: "images/pong.png", headline: "Pong!", file: "games/pong/index.html", link: "https://github.com/Flashrex", description: "Classic old Pong! written in vanilla Javascript. Added 2 Player Mode and Game Stages for extra difficulty."},
    { logopath: "images/brickbreaker.png", headline: "Brick Breaker", file: "games/brick_breaker/index.html", link: "https://github.com/Flashrex", description: "Brick Breaker with different Items in Javascript."},
    { logopath: "images/rage.png", headline: "San Street Life | RageMP", file: "", link: "https://github.com/Flashrex/San-Street-Life", description: "This is a gamemode written in C#, Html/Css and Js for the Gta V modification Rage:Mp. It is still work in progress."},
    { logopath: "images/asteroid.png", headline: "AsteroidField", file: "", link: "https://gitlab.informatik.hs-fulda.de/fdai5902/raumschiff", description: "Our own version of the popular game 'Asteroids' from 1979 written in Java that we created as a university project."},
    { logopath: "images/logo.png", headline: "Website", file: "", link: "https://github.com/Flashrex/Website", description: "The Website you are looking at - Created in plain Html/Css/Js."},
    { logopath: "images/logo.png", headline: "Passwordgenerator", file: "passwordgenerator.html", link: "", description: "Einfacher Passwordgenerator"}
]

addGames();
function addGames() {
    var i = 0
    for(; i < Projects.length; i++) {
        let project = new Project(Projects[i].logopath, Projects[i].headline, Projects[i].description);
        
        if(Projects[i].file != "") {
            project.addLocalFilePath(Projects[i].file);
        }

        if(Projects[i].link != "") {
            project.addExternalLink(Projects[i].link);
        }

        project.create(i);
    }

}