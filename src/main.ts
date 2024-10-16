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

const smoothIncrementButton = document.createElement("button");
smoothIncrementButton.textContent = "Start Continuous goobers";
app.append(smoothIncrementButton);

let isAnimating = false; 
let lastFrameTime = performance.now();
let growthRate = 1;
smoothIncrementButton.addEventListener("click", toggleSmoothIncrement);

function updateCounterDisplay() {
    counterDisplay.textContent = `${counter.toFixed(2)} goobers`;
    purchaseUpgradeButton.disabled = counter < 10;
}

function toggleSmoothIncrement() {
    if (isAnimating) 
    {
        isAnimating = false;
        smoothIncrementButton.textContent = "Start Continuous goobers";
    } 
    else 
    {
        isAnimating = true;
        lastFrameTime = performance.now();
        requestAnimationFrame(smoothIncrement);
        smoothIncrementButton.textContent = "Stop Continuous Goobers";
    }
}

function smoothIncrement(currentTime: number) {
    if (!isAnimating)
    {
        return;   
    } 

    const elapsedTime = currentTime - lastFrameTime; 
    lastFrameTime = currentTime;

    const incrementAmount = (elapsedTime / 1000) * growthRate;
    counter += incrementAmount;

    updateCounterDisplay();
    requestAnimationFrame(smoothIncrement); 
}

const purchaseUpgradeButton = document.createElement("button");
purchaseUpgradeButton.textContent = "Buy Growth Upgrade (10 goobers)";
purchaseUpgradeButton.disabled = true;
app.append(purchaseUpgradeButton);

purchaseUpgradeButton.addEventListener("click", purchaseUpgrade);

function purchaseUpgrade() {
    if (counter >= 10) 
    {
        counter -= 10;
        growthRate++; 
        updateCounterDisplay();
    }
}

