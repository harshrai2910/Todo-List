let input = document.querySelector("#input-value");
let addBtn = document.querySelector("#addbtn");
let list = document.querySelector(".list");

function render() {
  if (input.value === "") {
    return;
  } else {
    let li = document.createElement("li");
    li.classList.add("dataList");
    let check = document.createElement("input");
    check.type = "checkbox";
    li.appendChild(check);

    let p = document.createElement("p");
    p.classList.add("para");
    p.innerHTML = input.value;
    let text = p.innerHTML.split(" ");
    if (text.length > 4) {
      p.innerHTML = text.slice(0, 4).join(" ") + "...";
    }
    li.appendChild(p);

    let delbtn = document.createElement("button");
    delbtn.classList.add("delbtn");
    delbtn.innerHTML = "Delete";
    li.appendChild(delbtn);

    list.append(li);
    input.value = "";

    check.addEventListener("change", () => {
      if (check.checked) {
        p.style.textDecoration = "line-through";
      } else {
        p.style.textDecoration = "none";
      }
    });

    p.addEventListener("dblclick", () => {
      let newP = prompt(`Edit : ${p.innerHTML}`);
      if (newP.trim() != "" && newP != null) {
        p.innerHTML = newP;
      }
    });

    delbtn.addEventListener("click", (e) => {
      let listRemove = e.target.closest("li");
      listRemove.remove();
    });
  }
}

addBtn.addEventListener("click", () => {
  render();
});
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    render();
  }
});
