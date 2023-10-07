const themeButtons = document.getElementsByClassName("theme-toggle-btn");
const themeButtonsArray = [...themeButtons];
const body = document.getElementsByTagName("body");
const keypad = document.querySelector(".keys");
const screen = document.querySelector(".screen");
const calcTheme = document.querySelector(".calculator__theme");
const label = document.querySelector(".labels");
const span = document.querySelector(".span");
const btns = document.querySelectorAll(".btn");
const operationBtn = document.querySelectorAll(".btn--operation");
const equalBtn = document.querySelector(".btn-equal");
const delBtn = document.querySelector(".btn-del");
const resetBtn = document.querySelector(".btn-reset");
const currentOperand = document.querySelector(".current-operand");
const previousOperand = document.querySelector(".previous-operand");

////////////////////////////////////////////////////////

//changing themes style
const addThemeTwo = function () {
  body[0].style.backgroundColor = " hsl(0, 0%, 90%)";
  screen.classList.add("screen--theme-2");
  keypad.classList.add("keys--theme-2");
  span.classList.add("span--theme-2");
  calcTheme.classList.add("calculator__theme--2");
  label.classList.add("labels--theme-2");
  btns.forEach((btn) => btn.classList.add("btn--theme-2"));
  operationBtn.forEach((btn) => btn.classList.add("btn--operation--theme-2"));
  delBtn.classList.add("btn-del--theme-2");
  resetBtn.classList.add("btn-reset--theme-2");
  equalBtn.classList.add("btn-equal--theme-2");
};
const removeThemeTwo = function () {
  screen.classList.remove("screen--theme-2");
  keypad.classList.remove("keys--theme-2");
  span.classList.remove("span--theme-2");
  calcTheme.classList.remove("calculator__theme--2");
  label.classList.remove("labels--theme-2");
  btns.forEach((btn) => btn.classList.remove("btn--theme-2"));
  operationBtn.forEach((btn) =>
    btn.classList.remove("btn--operation--theme-2")
  );
  delBtn.classList.remove("btn-del--theme-2");
  resetBtn.classList.remove("btn-reset--theme-2");
  equalBtn.classList.remove("btn-equal--theme-2");
};

const addThemeThree = function () {
  body[0].style.backgroundColor = "hsl(268, 75%, 9%)";
  screen.classList.add("screen--theme-3");
  keypad.classList.add("keys--theme-3");
  span.classList.add("span--theme-3");
  calcTheme.classList.add("calculator__theme--3");
  label.classList.add("labels--theme-3");
  btns.forEach((btn) => btn.classList.add("btn--theme-3"));
  operationBtn.forEach((btn) => btn.classList.add("btn--operation--theme-3"));
  delBtn.classList.add("btn-del--theme-3");
  resetBtn.classList.add("btn-reset--theme-3");
  equalBtn.classList.add("btn-equal--theme-3");
};
const removeThemeThree = function () {
  screen.classList.remove("screen--theme-3");
  keypad.classList.remove("keys--theme-3");
  span.classList.remove("span--theme-3");
  calcTheme.classList.remove("calculator__theme--3");
  label.classList.remove("labels--theme-3");
  btns.forEach((btn) => btn.classList.remove("btn--theme-3"));
  operationBtn.forEach((btn) =>
    btn.classList.remove("btn--operation--theme-3")
  );
  delBtn.classList.remove("btn-del--theme-3");
  resetBtn.classList.remove("btn-reset--theme-3");
  equalBtn.classList.remove("btn-equal--theme-3");
};
////////////////////////////////////////////////////////

//Changing themes
themeButtonsArray.forEach((button, i) => {
  button.addEventListener("click", (e) => {
    button.style.opacity = "1";

    if (i === 0) {
      removeThemeTwo();
      removeThemeThree();
      body[0].style.backgroundColor = "hsl(222, 26%, 31%)";
    } else if (i === 1) {
      addThemeTwo();
      removeThemeThree();
    } else {
      addThemeThree();
      removeThemeTwo();
    }
    themeButtonsArray
      .filter(function (item) {
        return item != button;
      })
      .forEach((item) => (item.style.opacity = "0"));
  });
});

let currentOperandText = currentOperand.innerHTML;
let previousOperandText = previousOperand.innerHTML;
let operation;

function append(btn) {
  if (currentOperandText.length < 10) {
    currentOperandText = currentOperandText + btn;
  }
}

function display() {
  currentOperand.innerHTML = currentOperandText;
  if (operation !== undefined) {
    previousOperand.innerHTML = previousOperandText + operation;
  } else {
    previousOperand.innerHTML = previousOperandText;
  }
}

function operationSelection(operate) {
  if (!currentOperandText) return;
  if (operate) {
    calc();
  }
  operation = operate;
  previousOperandText = currentOperandText;
  currentOperandText = "";
}

function deleteNum() {
  currentOperandText = currentOperandText.toString().slice(0, -1);
  currentOperand.innerHTML = currentOperand.innerHTML.slice(0, -1);
}

function reset() {
  currentOperand.innerHTML = "";
  previousOperand.innerHTML = "";
  currentOperandText = "";
  previousOperandText = "";
  operation = undefined;
}

operationBtn.forEach((operate) => {
  operate.addEventListener("click", function (e) {
    operationSelection(operate.innerHTML);
    display();
  });
});

btns.forEach((btn) => {
  btn.addEventListener("click", function () {
    append(btn.value);
    display();
  });
});

function calc() {
  const prev = parseFloat(previousOperandText);
  const current = parseFloat(currentOperandText);
  let result;
  if (isNaN(prev) || isNaN(current)) return;
  switch (operation) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "/":
      result = prev / current;
      break;
    case "*":
      result = prev * current;
      break;
  }

  operation = undefined;
  currentOperandText = result;
  previousOperandText = "";
}

equalBtn.addEventListener("click", function () {
  calc();
  display();
});

resetBtn.addEventListener("click", function () {
  reset();
});

delBtn.addEventListener("click", function () {
  deleteNum();
});

document.addEventListener("keydown", function (e) {
  let patternForNumbers = /[0-9]/g;
  let patternForOperation = /[*\-\+\/]/g;
  if (e.key.match(patternForNumbers)) {
    e.preventDefault();
    append(e.key);
    display();
  }
  if (e.key.match(patternForOperation)) {
    e.preventDefault();
    operationSelection(e.key);
    display();
  }
  if (e.key === "Backspace") {
    e.preventDefault();
    deleteNum();
  }
  if (e.key === "Enter" || e.key === "=") {
    e.preventDefault();
    calc();
    display();
  }
  if (e.key === "Escape" || e.key === "F5") {
    e.preventDefault();
    reset();
  }
});
