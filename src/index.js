import "./style.css";

const form = document.querySelector("form");
const input = document.querySelector("form > input");
const ul = document.querySelector("ul");

const todos = [
  {
    text: "todo 1",
    done: false,
    editMode: false,
  },
  {
    text: "todo 2",
    done: true,
    editMode: false,
  },
];

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = input.value;
  input.value = "";
  addTodo(value);
});

const displayTodo = () => {
  const todosNode = todos.map((todo, index) => {
    if (todo.editMode) {
      return createTodoEditElement(todo, index);
    } else {
      return createTodoElement(todo, index);
    }
  });
  ul.innerHTML = "";
  ul.append(...todosNode);
};

const createTodoElement = (todo, index) => {
  const buttonDelete = document.createElement("button");
  buttonDelete.innerHTML = "Supprimer";
  buttonDelete.classList.add("danger");
  buttonDelete.addEventListener("click", (event) => {
    event.stopPropagation();
    deleteTodo(index);
  });
  const buttonEdit = document.createElement("button");
  buttonEdit.innerHTML = "Editer";
  buttonEdit.classList.add("primary");
  buttonEdit.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleEditMode(index);
  });
  const li = document.createElement("li");
  li.innerHTML = `
        <span class="todo ${todo.done ? "done" : ""}"></span>
        <p class="${todo.done ? "done" : ""}">${todo.text}</p>
    `;
  li.addEventListener("click", (event) => {
    toggleTodo(index);
  });
  li.append(buttonEdit, buttonDelete);
  return li;
};

const createTodoEditElement = (todo, index) => {
  const li = document.createElement("li");
  const input = document.createElement("input");
  input.type = "text";
  input.value = todo.text;
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      editTodo(index, input);
    }
  });
  setTimeout(() => {
    input.focus();
  }, 0);
  const buttonSave = document.createElement("button");
  buttonSave.innerHTML = "Save";
  buttonSave.classList.add("primary");
  buttonSave.addEventListener("click", (event) => {
    editTodo(index, input);
  });
  const buttonCancel = document.createElement("button");
  buttonCancel.innerHTML = "Cancel";
  buttonCancel.classList.add("danger");
  buttonCancel.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleEditMode(index);
  });
  li.append(input, buttonSave, buttonCancel);
  return li;
};

const addTodo = (text) => {
  text = text.trim();
  if (text) {
    todos.push({
      text: `${text[0].toUpperCase()}${text.slice(1)}`,
      done: false,
    });
  }
  displayTodo();
};

const deleteTodo = (index) => {
  todos.splice(index, 1);
  displayTodo();
};

const toggleTodo = (index) => {
  todos[index].done = !todos[index].done;
  displayTodo();
};

const toggleEditMode = (index) => {
  todos[index].editMode = !todos[index].editMode;
  displayTodo();
};

const editTodo = (index, input) => {
  const value = input.value;
  todos[index].text = value;
  todos[index].editMode = false;
  displayTodo();
};

displayTodo();
