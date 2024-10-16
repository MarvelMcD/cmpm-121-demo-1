import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Goober Farmer";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const gooberButton = document.createElement("button");
gooberButton.innerHTML = "🫠 goober 🫠";
app.append(gooberButton);

const counterDisplay = document.createElement("h2");
let counter: number = 0;
counterDisplay.textContent = `${counter} goobers`;
app.append(counterDisplay);

gooberButton.addEventListener("click", incrementCounter);

const autoClickButton = document.createElement("button");
autoClickButton.textContent = "Start Auto Goober";
app.append(autoClickButton);

let autoClickInterval: number | null = null;

autoClickButton.addEventListener("click", toggleAutoClick);

function incrementCounter() {
    counter++;
    counterDisplay.textContent = `${counter} goobers`;
}

function toggleAutoClick() {
    if (autoClickInterval !== null) {
        clearInterval(autoClickInterval);
        autoClickInterval = null;
        autoClickButton.textContent = "Start Auto Goober";
    } 
    else 
    {
        autoClickInterval = setInterval(incrementCounter, 1000);
        autoClickButton.textContent = "Stop Auto Goober";
    }
}