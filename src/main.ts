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
counterDisplay.innerHTML = counter.toString() + " goobers";
app.append(counterDisplay);

gooberButton.addEventListener("click", function ()
{
    counter++;
    counterDisplay.innerHTML = counter.toString() + " goobers";
});