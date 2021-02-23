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
        document.getElementById("project_" +i).style = 'grid-column:' +((i % 4) +1) +'/' +((i % 4) +2) +'; grid-row:' +Project.getRow() +'/' +(Project.getRow()+1);
        if(i != 0 && (i+1) % 4 == 0) Project.increaseRow();

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
    { logopath: "images/logo.png", headline: "Website", file: "", link: "https://github.com/Flashrex/Website", description: "Die Website, die du dir gerade anschaust."},
    { logopath: "images/snake.png", headline: "Snake", file: "games/snake/index.html", link: "https://github.com/Flashrex", description: "Snake Spiel - Geschrieben in Vanilla Javascript. Du kannst das Feld an den Rändern verlassen. ;)"},
    { logopath: "images/pong.png", headline: "Pong!", file: "games/pong/index.html", link: "https://github.com/Flashrex", description: "Klassisches altes Pong! Um es ein wenig spannender zu machen habe ich einen 2 Spieler Modus hinzugefügt."},
    { logopath: "images/brickbreaker.png", headline: "Brick Breaker", file: "games/brick_breaker/index.html", link: "https://github.com/Flashrex", description: "Brick Breaker mit verschiedenen Items."},
    { logopath: "images/lock.png", headline: "Passwordgenerator", file: "passwordgenerator.html", link: "", description: "Einfacher Passwortgenerator, den ich auf einem langweiligen Ausflug mit der Bahn erstellt habe."},
    { logopath: "images/asteroid.png", headline: "AsteroidField [privat]", file: "", link: "https://gitlab.informatik.hs-fulda.de/fdai5902/raumschiff", description: "Unsere Version des Spiels 'Asteroids' aus 1979. Erstellt von mir und meinen Komillitonen als Uniprojekt."},
    { logopath: "images/rage.png", headline: "San Street Life [privat]", file: "", link: "https://github.com/Flashrex", description: "Dies ist ein Gamemode für die GTA V Multiplayer Modifikation Rage:MP. Geschrieben in C# und Javascript."},
    { logopath: "images/tutorial.jpg", headline: "RageMP Tutorial", file: "", link: "https://github.com/Flashrex/RageTutorial", description: "Ein kleines Projekt welches ich für meine Tutorial Reihe über Rage:MP auf Youtube erstellt habe."},
    { logopath: "images/tutorial.jpg", headline: "alt:V Tutorial", file: "", link: "https://github.com/Flashrex/altv-tutorial", description: "Ein kleines Projekt welches ich für meine Tutorial Reihe über alt:V auf Youtube erstellt habe."},
    { logopath: "images/altvoice.png", headline: "alt:V Voice Chat Resource", file: "", link: "https://github.com/Flashrex/altv-tutorial", description: "Eine custom Voice Chat API Resource für alt:V."}
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