let state = {
    love: "",
    goodAt: "",
    needs: "",
    paidFor: "",
}
const reset = () => {
    const areas = document.querySelectorAll(".area");
    areas.forEach(area => {
        area.classList.remove("area--background");
        area.classList.remove("area--selected");
    });
    disableIkigAi();
    hideIkigAi();
    state = {
        love: "",
        goodAt: "",
        needs: "",
        paidFor: "",
    }
    const inputs = document.querySelectorAll("textarea.questionaireInput")
    inputs.forEach(input => {
        input.value = "";
    });
}

const startArea = (areaId) => {
    const areas = document.querySelectorAll(`.area:not(#${areaId})`);
    const selectedArea = document.querySelector(`#${areaId}`);
    areas.forEach(area => {
        area.classList.add("area--background");;
    });
    selectedArea.classList.add("area--selected");
    const doneButton = document.querySelector(`#${areaId} .areaButton`);
    doneButton.removeEventListener("click", done);
    doneButton.addEventListener("click", done);
}

const done = (event, event2) => {
    const areas = document.querySelectorAll(".area");
    areas.forEach(area => {
        area.classList.remove("area--background");
        area.classList.remove("area--selected");
    });
    event.stopPropagation();
    if(state.love && state.goodAt && state.needs && state.paidFor) {
        enableIkigAi();
    } 
}

const enableIkigAi = () => {
    const ikigAi = document.querySelector(".ikigAiButton");
    ikigAi.classList.remove("ikigAiButton--disabled");
    ikigAi.classList.add("ikigAi--enabled");
    ikigAi.addEventListener("click", showIkigAi);
}

const disableIkigAi = () => {
    const ikigAi = document.querySelector(".ikigAiButton");
    ikigAi.classList.add("ikigAiButton--disabled");
    ikigAi.classList.remove("ikigAi--enabled");
    ikigAi.removeEventListener("click", showIkigAi);
}

const makePrompt = () => `Following the principles of ikigai, where a person loves ${state.love}, is good at ${state.goodAt}, the world needs ${state.needs} and can be paid for ${state.paidFor}, what is the one thing you would do?`;

const showIkigAi = () => {
    const ikigAiSection = document.querySelector(".ikigAiSection");
    ikigAiSection.classList.add("ikigAiSection--active");
    const ikigAi = document.querySelector("#ikigAi");
    ikigAi.innerText = `Prompt: "${makePrompt()}"`;
    const areas = document.querySelectorAll(".area");
    areas.forEach(area => {
        area.classList.add("area--background");
    });
    const ikigAiButton = document.querySelector(".ikigAiButton");
    ikigAiButton.classList.add("ikigAiButton--disabled");
}

const hideIkigAi = () => {
    const ikigAiSection = document.querySelector(".ikigAiSection");
    ikigAiSection.classList.remove("ikigAiSection--active");
}

const copyToClipboard = () => {
    navigator.clipboard.writeText(makePrompt()).then(() => {
        showNotification();
    });
}

const showNotification = () => {
    const notification = document.querySelector(".notification");
    notification.classList.remove("notification--gone");
    notification.classList.add("notification--hidden");
    setTimeout(() => notification.classList.remove("notification--hidden"), 1);
    setTimeout(() => {
        notification.classList.add("notification--hidden");
        setTimeout(() => {
            notification.classList.add("notification--gone");
        }, 500);
    }, 3000);
}

const registerAreaListener = (areaId, index) => {
    const input = document.querySelector(`#${areaId} .questionaireInput`);
    input.addEventListener("change", (event) => {
        state[index] = event.target.value;
    });
}

const registerListeners = () => {
    registerAreaListener("areaLove", "love");
    registerAreaListener("areaGoodAt", "goodAt");
    registerAreaListener("areaNeeds", "needs");
    registerAreaListener("areaPaidFor", "paidFor");
}

registerListeners();

//fix vh and vw on mobile
let vw = window.innerWidth * 0.01;
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vw', `${vw}px`);
document.documentElement.style.setProperty('--vh', `${vh}px`);
window.addEventListener('resize', () => {
    let vw = window.innerWidth * 0.01;
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vw', `${vw}px`);
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });