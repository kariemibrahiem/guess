// onload = gemerateInput();
// setting game name
let gameName = "guess the word";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;  //to but content in the element
// document.querySelector("footer").innerHTML = `${gameName} game created to learn me  `; //the var butted in 



// the game options
let numTries = 6;
let numLetters = 6;
let currentTries = 1;
let hints = 2;


//words manage
//to make a random element
let wordGuess = "";
let words = ["update" ,  'create' ,'Domain' , 'create' , 'delete' , 'master' , 'letter' , 'branch' , 'mainly' , 'school' , 'Double' , '	Driver' ];
wordGuess = words[Math.floor(Math.random()* words.length)].toLowerCase();   //to get a random element from the array

// manage hints
document.querySelector(".hint > span").innerHTML = hints;
const hintBtn = document.querySelector(".hint");
hintBtn.addEventListener("click" , getHint);


function gemerateInput(){
    const inputContainer = document.querySelector(".inputs");

    for(i = 1 ; i<= numTries ; i++){
        const tryDiv = document.createElement("div"); 
        tryDiv.classList.add(`try-${i}`);
        tryDiv.innerHTML = `<span> try ${i} </span>`;

        if(i > 1){
            tryDiv.classList.add("disabled");
        };

        for(let j = 1 ; j <= numLetters ; j++){
            const input = document.createElement("input");
            input.type = "text" ; // to declare the type of constant
            input.id = `guess-${i}-letter-${j}`;
            input.setAttribute('maxLength' , "1"); // to set new attr to the tag
            input.setAttribute("width" , "10");
            tryDiv.appendChild(input);
        }
        
        
        inputContainer.appendChild(tryDiv);
    }
    inputContainer.children[0].children[1].focus();   // to select the child of the element we appended by index


    // disable all inputs except first one
    const inputDisable = document.querySelectorAll(".disabled input");
    inputDisable.forEach((input) => {input.disabled = true});//how to make foreach loop && disable the elements


    const inputs = document.querySelectorAll('input');
    inputs.forEach((input , index) => {
        input.addEventListener('input' , function(){ //add event to the specific element
                this.value = this.value.toUpperCase();
                const nextInput = inputs[index + 1]; //take the input of the next input
                if (nextInput) nextInput.focus();    // to focus the next input
        });
        
        input.addEventListener('keydown' , function(event){ //add event to the specific element
            // console.log(event);
            const currentIndex = Array.from(inputs).indexOf(this /*event.target*/);  //convert the element to array
                                                                                    // indexOf give the index of the element
            // console.log(currentIndex);
            if(event.key == "ArrowRight"){
                const nextInput = currentIndex + 1;
                if(nextInput < inputs.length) inputs[nextInput].focus();
            };
            if(event.key == "ArrowLeft"){
                const prevInput = currentIndex - 1;
                if(prevInput >= 0) inputs[prevInput].focus();
            };

        });
        
    });
};


const checkBtn = document.querySelector(".check");  

checkBtn.addEventListener("click" , handleCheck);

function handleCheck(){
    let successGuess = true;
    // console.log(wordGuess);
    for(i=1 ; i <= numLetters ; i++){
        const inputField = document.querySelector(`#guess-${currentTries}-letter-${i}`);
        const letter = inputField.value.toLowerCase();
        const actualLetter = wordGuess[i-1];
        if(letter == actualLetter &&  letter != ""){
            inputField.classList.add("y-in-place");
            successGuess = true; 
        }else if(wordGuess.includes(letter) && letter != ""){    //check if the word include specific letter
            inputField.classList.add("y-not-in-place");
            successGuess = false;
        }else if(!wordGuess.includes(letter) || letter == ""){
            inputField.classList.add("y-no");
            successGuess = false;
        }   
    }

    //check winning
    const h = document.querySelector("h1");
    const game = document.querySelector(".guess-game");
    if(successGuess){
        h.innerHTML = `you is new winner the word id ${wordGuess}`;
        h.classList.add("winner");
        // game.style.display ="none";
        let allTries = document.querySelectorAll(".inputs > div");
        allTries.forEach((tryDiv) =>{  
            tryDiv.classList.add("disabled");
        });
        checkBtn.classList.add("disabled");
        hintBtn.disabled = true;

        //the try again btn
        const again = document.querySelector(".again");
            again.style.display="block";
            again.addEventListener("click" , function(){
                window.location.reload();
            });


    }else if(!successGuess){
        
        document.querySelector(`.try-${currentTries}`).classList.add("disabled");

        const currentInput = document.querySelectorAll(`.try-${currentTries} > input`);
        currentInput.forEach((input) => {
            input.disabled = true;
        });

        currentTries++;
        // delete the disabled from the inputs

        const nextInput = document.querySelectorAll(`.try-${currentTries} > input`);
        nextInput.forEach((input) => {
            input.disabled = false;
        });

        const el = document.querySelector(`.try-${currentTries}`);
        if(el){
            document.querySelector(`.try-${currentTries}`).classList.remove("disabled");
            el.children[1].focus();
        }else{
            checkBtn.disabled = true;
            hintBtn.disabled = true;
            h.innerHTML = `sorry but you is loser big loser the word is ${wordGuess}`;
            h.classList.add("loser");

            // the try again btn
            const again = document.querySelector(".again");
            again.style.display="block";
            again.addEventListener("click" , function(){
                window.location.reload();
            });

        }
    }
}

function getHint(){
    if(hints > 0){
        hints--;
        document.querySelector(".hint > span").innerHTML = hints;
    }
    if(hints == 0){
        hintBtn.disabled=true;
    }
    const enableInput = document.querySelectorAll("input:not([disabled])");
    // console.log(enableInput);
    const emptyEnableInput = Array.from(enableInput).filter((input) => input.value === "");
    // console.log(emptyEnableInput);
    if(emptyEnableInput.length > 0){
        const randomIndex = Math.floor(Math.random() * emptyEnableInput.length);
        const randomInput = emptyEnableInput[randomIndex];
        const fill = Array.from(enableInput).indexOf(randomInput);
        if(fill != -1){
            randomInput.value = wordGuess[fill].toUpperCase();
        }
        // indexFill.value = wordGuess[randomIndex];
        console.log(randomIndex);
        console.log(randomInput);
        console.log(fill);
    }
}
document.addEventListener("keydown" , handleBack);
function handleBack(event){
    if(event.key == "Backspace" ){
        const inputs_b = document.querySelectorAll("input:not([disabled])");
        const currentEl = Array.from(inputs_b).indexOf(document.activeElement);
        // console.log(currentEl);
        if(currentEl > 0){
            const currentInput = inputs_b[currentEl];
            const prevInput = inputs_b[currentEl-1] ;
            currentInput.value = "";
            prevInput.value = "";
            prevInput.focus();
        }

    }
}



window.onload = function(){     //to do function in the first load
    gemerateInput();
}