const letters = 'ABCDEFGHIJKLMOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const special = '-_.,;:#!§$%&'

class Password {
    constructor(_length, _letters, _numbers, _special) {
        this.length = _length;
        this.letters = _letters;
        this.numbers = _numbers;
        this.special = _special;
        this.password = "";
    }

    generate() {
        while(this.password.length < this.length) {
            switch(getRandomIntFromInterval(1, 6)) {
                case 1: case 2: case 3:
                    //Generate Letter
                    if(this.letters) this.password += letters[getRandomIntFromInterval(0, letters.length-1)];
                    break;
                case 4: case 5:
                    //Generate Number
                    if(this.numbers) this.password += getRandomIntFromInterval(0, 9);
                    break;
                case 6:
                    //Generate Special Character
                    if(this.special) this.password += special[getRandomIntFromInterval(0, special.length-1)];
                    break;
            }
        }
    }
    
    display() {
        document.getElementById('_output').innerHTML = "Dein Passwort: " +this.password;
    }
}

generatePassword();
function generatePassword() {
    let length = document.getElementById("_length").value;
    
    let numbers = document.getElementById("_number").checked;
    let letters = document.getElementById("_letter").checked;
    let special = document.getElementById("_special").checked;

    let password = new Password(length, letters, numbers, special);
    password.generate();
    password.display();
}

function getRandomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}