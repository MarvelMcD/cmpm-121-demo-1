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
let growthRate: number = 1;

counterDisplay.textContent = `${counter} goobers`;
app.append(counterDisplay);

gooberButton.addEventListener("click", () => {
    incrementCounter(1);
});

const growthRateDisplay = document.createElement("p");
growthRateDisplay.textContent = `Growth Rate: ${growthRate.toFixed(2)} goobers/sec`;
app.append(growthRateDisplay);

const purchasedItemsDisplay = document.createElement("div");
app.append(purchasedItemsDisplay);

function updateStatusDisplays() {
    growthRateDisplay.textContent = `Growth Rate: ${growthRate.toFixed(2)} goobers/sec`;

    purchasedItemsDisplay.innerHTML = ""; // clear

    for (const upgrade of upgrades) {
        const itemDisplay = document.createElement("p");
        itemDisplay.textContent = `${upgrade.name}: ${upgrade.count} purchased`;
        purchasedItemsDisplay.append(itemDisplay);
    }
}

function incrementCounter(amount: number) {
    counter += amount;
    updateCounterDisplay();
}

function updateCounterDisplay() {
    counterDisplay.textContent = `${counter.toFixed(2)} goobers`;
    updateUpgradeButtons();
    updateStatusDisplays();
}

// Auto Click Button
const autoClickButton = document.createElement("button");
autoClickButton.textContent = "Start Auto Goober";
app.append(autoClickButton);

let autoClickInterval: number | null = null;

autoClickButton.addEventListener("click", toggleAutoClick);

function toggleAutoClick() {
    if (autoClickInterval !== null) {
        clearInterval(autoClickInterval);
        autoClickInterval = null;
        autoClickButton.textContent = "Start Auto Goober";
    } else {
        autoClickInterval = setInterval(() => incrementCounter(1), 1000);
        autoClickButton.textContent = "Stop Auto Goober";
    }
}

const smoothIncrementButton = document.createElement("button");
smoothIncrementButton.textContent = "Start Continuous Goobers";
app.append(smoothIncrementButton);

let isAnimating = false;
let lastFrameTime = performance.now();

smoothIncrementButton.addEventListener("click", toggleSmoothIncrement);

function toggleSmoothIncrement() {
    if (isAnimating) {
        isAnimating = false;
        smoothIncrementButton.textContent = "Start Continuous Goobers";
    } else {
        isAnimating = true;
        lastFrameTime = performance.now();
        requestAnimationFrame(smoothIncrement);
        smoothIncrementButton.textContent = "Stop Continuous Goobers";
    }
}

function smoothIncrement(currentTime: number) {
    if (!isAnimating) return;

    const elapsedTime = currentTime - lastFrameTime;
    lastFrameTime = currentTime;

    const incrementAmount = (elapsedTime / 1000) * growthRate;
    counter += incrementAmount;

    updateCounterDisplay();
    requestAnimationFrame(smoothIncrement);
}

interface Upgrade {
    name: string;
    cost: number;
    rateIncrease: number;
    count: number;
}

const upgrades: Upgrade[] = [
    { name: "Snoober Goober Upgrades", cost: 10, rateIncrease: 0.1, count: 0 },
    { name: "Doober Goober Upgrades", cost: 100, rateIncrease: 2.0, count: 0 },
    { name: "Uber Goober Upgrades", cost: 1000, rateIncrease: 50.0, count: 0 },
];

const upgradeButtons: HTMLButtonElement[] = [];

upgrades.forEach((upgrade) => {
    const button = document.createElement("button");
    button.textContent = `Buy ${upgrade.name} (${upgrade.cost} goobers)`;
    button.disabled = true;
    button.addEventListener("click", () => purchaseUpgrade(upgrade));
    app.append(button);
    upgradeButtons.push(button);
});

function purchaseUpgrade(upgrade: Upgrade) {
    if (counter >= upgrade.cost) {
        counter -= upgrade.cost;
        growthRate += upgrade.rateIncrease;
        upgrade.count++;
        updateCounterDisplay();
    }
}

function updateUpgradeButtons() {
    upgradeButtons.forEach((button, index) => {
        const upgrade = upgrades[index];
        button.disabled = counter < upgrade.cost;
    });
}
