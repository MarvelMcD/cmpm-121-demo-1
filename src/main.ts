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

let clickMultiplier: number = 1;

gooberButton.addEventListener("click", () => {
    incrementCounter(1 * clickMultiplier);
});

const growthRateDisplay = document.createElement("p");
growthRateDisplay.textContent = `Growth Rate: ${growthRate.toFixed(2)} goobers/sec`;
app.append(growthRateDisplay);

const purchasedItemsDisplay = document.createElement("div");
app.append(purchasedItemsDisplay);

interface Item {
    name: string;
    cost: number; // current cost of the item
    rate: number; 
    count: number; // times the item has been purchased
    description: string;
    emoji: string;
}

const availableItems: Item[] = [
    { name: "Goober Click Multiplier", cost: 50, rate: 1.25, count: 0, description: "Increaces the amount of goobers you get per click by 0.25x", emoji: "👆"},
    { name: "Snoober Goober Upgrades", cost: 10, rate: 0.1, count: 0, description: "Well fed Goober collectors increase prduction 0.1x 🍲", emoji: "🍲"},
    { name: "Doober Goober Upgrades", cost: 100, rate: 2.0, count: 0, description: "Improved housing for goobers increases prodoctivity 2x 🏠", emoji: "🏠"},
    { name: "Uber Goober Upgrades", cost: 1000, rate: 50.0, count: 0, description: "Well trained goobers 50x improvements 🏫", emoji: "🏫"},
    { name: "Gaba Goober", cost: 100000, rate: 1000.0, count: 0, description: "The Gaba Goober, the strongest of the Goobers 👑", emoji: "👑"},
];

function updateStatusDisplays() {
    growthRateDisplay.textContent = `Growth Rate: ${growthRate.toFixed(2)} goobers/sec`;
    purchasedItemsDisplay.innerHTML = ""; // clear

    for (const item of availableItems) {
        const itemDisplay = document.createElement("p");
        itemDisplay.textContent = `${item.name}: ${item.count} purchased ${item.emoji}`;
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

const smoothIncrementButton = document.createElement("button");
smoothIncrementButton.textContent = "Start Auto Goobers";
app.append(smoothIncrementButton);

let isAnimating = false;
let lastFrameTime = performance.now();

smoothIncrementButton.addEventListener("click", toggleSmoothIncrement);

function toggleSmoothIncrement() {
    if (isAnimating) {
        isAnimating = false;
        smoothIncrementButton.textContent = "Start Auto Goobers";
    } else {
        isAnimating = true;
        lastFrameTime = performance.now();
        requestAnimationFrame(smoothIncrement);
        smoothIncrementButton.textContent = "Stop Auto Goobers";
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

function purchaseUpgrade(item: Item) {
    const upgradeCost = Math.round(item.cost * Math.pow(1.15, item.count));
    if (counter >= upgradeCost) {
        counter -= upgradeCost;
        item.count++;

        if (item.name === "Goober Multiplier") {
            clickMultiplier *= item.rate;
        } else {
            growthRate += item.rate;
        }
        updateCounterDisplay();
    }
}

const upgradeButtons: HTMLButtonElement[] = availableItems.map(item => {
    const button = document.createElement("button");
    button.textContent = `Buy ${item.name} (${item.cost.toFixed(2)} goobers)`;
    button.title = item.description;
    button.disabled = true;
    button.addEventListener("click", () => purchaseUpgrade(item));
    app.append(button);
    return button;
});

function updateUpgradeButtons() {
    upgradeButtons.forEach((button, index) => {
        const item = availableItems[index];
        const currentCost = Math.round(item.cost * Math.pow(1.15, item.count));
        button.disabled = counter < currentCost;
        button.textContent = `Buy ${item.name} (${currentCost.toFixed(2)} goobers)`; 
    });
}

updateCounterDisplay();
