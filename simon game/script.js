let gameseq = [];
let userseq = [];
let started = false;
let level = 0;

// Select DOM elements
let box1 = document.querySelector('.box1');
let box2 = document.querySelector('.box2');
let box3 = document.querySelector('.box3');
let box4 = document.querySelector('.box4');

let boxes = [box1, box2, box3, box4];
let h4 = document.querySelector("h4");

document.addEventListener("keypress", () => {
    if (!started) {
        started = true;
        levelup();
    }
});

function btnflash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 90);
}

function btnuserflash(btn) {
    btn.classList.add("userflash");
    setTimeout(() => {
        btn.classList.remove("userflash");
    }, 90);
}

function levelup() {
    userseq = [];  // Reset the user sequence to an empty array
    level++;  // Increment the level
    h4.innerText = `Level ${level}`;  // Update the displayed level

    // Choose a random button from the boxes
    let randidx = Math.floor(Math.random() * boxes.length);
    let randbox = boxes[randidx];

    // Add the random button to the game sequence
    gameseq.push(randbox);  // Ensure gameseq is defined and initialized

    // Flash the selected button
    btnflash(randbox);  // Make sure this function is defined to handle the flash effect
}


function checkAns(idx) {
     // Use the last index
    if (userseq[idx] === gameseq[idx].getAttribute("id")) { // Compare IDs
        h4.innerText = `You pressed right`;
        if (userseq.length == gameseq.length) {
        setTimeout(levelup,1000);
        }
    } else {
        h4.innerHTML= `Game Over! Your score was <b> ${level}</b> <br> Press any key to start`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(()=>{
            document.querySelector("body").style.backgroundColor="white";
        },300);

    }
    reset();// to reset the game if wrong key is pressed
}

function btnpress() {
    let btn = this;
    btnuserflash(btn);

    let usercolor = btn.getAttribute("id");
    userseq.push(usercolor);

    checkAns(userseq.length-1);
}

let boxselec = document.querySelectorAll('.box1, .box2, .box3, .box4');
for (let box of boxselec) { // Use 'let' for the loop variable
    box.addEventListener("click", btnpress);
}

