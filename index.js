let input = document.querySelector("#input-value");
let addBtn = document.querySelector("#addbtn");
let list = document.querySelector(".list");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodo() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function renderList() {
  list.innerHTML = "";
  todos.forEach((todo, index) => {
    let li = document.createElement("li");
    li.classList.add("dataList");

    let check = document.createElement("input");
    check.type = "checkbox";
    check.checked = todo.done;
    li.appendChild(check);

    let p = document.createElement("p");
    p.classList.add("para");
    p.innerHTML = todo.text;
    let text = p.innerHTML.split(" ");
    if (text.length > 4) {
      p.innerHTML = text.slice(0, 4).join(" ") + "...";
    }
    if (todo.done) {
      p.style.textDecoration = "line-through";
    }
    li.appendChild(p);

    let delbtn = document.createElement("button");
    delbtn.classList.add("delbtn");
    delbtn.innerHTML = "Delete";
    li.appendChild(delbtn);

    check.addEventListener("change", () => {
      todos[index].done = check.checked;
      saveTodo();
      check.checked
        ? (p.style.textDecoration = "line-through")
        : (p.style.textDecoration = "none");
    });

    p.addEventListener("dblclick", () => {
      let newP = prompt(`Edit : ${todo.text}`);
      if (newP !== null) {
        let trimmed = newP.trim();
        if (trimmed !== "") {
          todos[index].text = trimmed;
          saveTodo();
          renderList();
        } else {
          alert("Empty text not allowed");
        }
      }
    });

    delbtn.addEventListener("click", () => {
      todos.splice(index, 1);
      saveTodo();
      renderList();
    });

    list.append(li);
  });
}

function addTodo() {
  let val = input.value.trim();
  if (!val) return;
  todos.push({ text: val, done: false });
  saveTodo();
  renderList();
  input.value = "";
}

addBtn.addEventListener("click", addTodo);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTodo();
});

renderList();
