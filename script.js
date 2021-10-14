const selectAllButton = document.getElementById("test");
const doneAllButton = document.getElementById("doneAction");
const removeAllButton = document.getElementById("removeAction");
const restoreAllButton = document.getElementById("restoreAction");
const inputElement = document.getElementById("input");
const ulElement = document.getElementById("list");

let todoList = [];
let checkedItems = [];

function addTask() {
  todoList.push({
    content: inputElement.value,
    done: false,
    checked: false,
  });
  upgradeView();
  inputElement.value = "";
}

function doneTask() {
  todoList.filter((item) => {
    if (item.checked === true) {
      item.done = true;
      item.checked = false;
    }
    upgradeView();
  });
}

function restoreTask() {
  todoList.filter((item) => {
    if (item.checked === true) {
      item.done = false;
      item.checked = false;
    }
    upgradeView();
  });
}

function removeTask() {
  checkedItems = todoList.filter((item) => item.checked !== true);
  todoList = [];
  todoList.push(...checkedItems);
  upgradeView();
}

inputElement.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && inputElement.value.length > 0) {
    addTask();
  }
});

selectAllButton.addEventListener("click", () => {
  addTask();
});

doneAllButton.addEventListener("click", () => {
  doneTask();
});

restoreAllButton.addEventListener("click", () => {
  restoreTask();
});

removeAllButton.addEventListener("click", () => {
  removeTask();
});

function upgradeView() {
  ulElement.innerHTML = "";
  todoList.map((item, index) => {
    const liElement = document.createElement("li");
    liElement.className = "list-group-item";
    ulElement.prepend(liElement);

    const checkboxElement = document.createElement("input");
    checkboxElement.type = "checkbox";
    checkboxElement.className = "cursor";
    checkboxElement.id = `checkox${index}`;
    checkboxElement.checked = item.checked;
    checkboxElement.addEventListener("change", () => {
      item.checked = !item.checked;
    });
    liElement.append(checkboxElement);

    const labelElement = document.createElement("label");
    labelElement.className = item.done
      ? "form-check-label mx-3 toDone"
      : "form-check-label mx-3";
    labelElement.setAttribute("for", `checkox${index}`);
    labelElement.innerText = item.content;
    liElement.append(labelElement);

    const doneButtonElement = document.createElement("button");
    doneButtonElement.type = "button";
    doneButtonElement.className = "btn btn-outline-primary mr-2";
    doneButtonElement.innerText = "Done";
    doneButtonElement.addEventListener("click", () => {
      item.done = !item.done;
      if (item.done === true) {
        labelElement.className = "form-check-label mx-3 toDone";
      } else {
        labelElement.className = "form-check-label mx-3";
      }
    });
    liElement.append(doneButtonElement);

    const removeButtonElement = document.createElement("button");
    removeButtonElement.type = "button";
    removeButtonElement.className = "btn btn-outline-danger";
    removeButtonElement.innerText = "Remove";
    removeButtonElement.addEventListener("click", () => {
      todoList.splice(index, 1);
      upgradeView();
    });
    liElement.append(removeButtonElement);
  });
}
