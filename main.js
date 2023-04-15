const submit = document.querySelector("button");
console.log(submit);

const ul = document.querySelector("ul");
console.log(ul);

const email = document.getElementById("exampleInputEmail1");
console.log(email);

const password = document.getElementById("exampleInputPassword1");
console.log(password);

submit.addEventListener("click", submitForm);

window.addEventListener("DOMContentLoaded", initialFunction);
function initialFunction(e) {
  axios
    .get("https://crudcrud.com/api/b8a99b6f656b466bbf195711d897994a/addUser")
    .then((res) => {
      console.log(res.data);
      let i = 0;
      for (let data of res.data) {
        const element = document.createElement("li");
        element.classList = "list-group-item text-center";
        element.innerHTML = `<b>${data.email}</b>`;
        i++;
        ul.appendChild(element);

        const btn = document.createElement("button");
        btn.classList = "btn btn-danger float-right";
        btn.innerText = "DELETE";
        btn.id = "delete";
        element.appendChild(btn);

        const editBtn = document.createElement("button");
        editBtn.classList = "btn btn-primary mr-5";
        editBtn.innerText = "EDIT";
        editBtn.id = "edit";
        element.appendChild(editBtn);
      }
    })
    .catch((err) => console.error(err));
}

console.log(ul);

function submitForm(e) {
  e.preventDefault();
  console.log(email.value);
  console.log(password.value);

  if (email.value.trim() && password.value.trim() != "") {
    const element = document.createElement("li");
    element.classList = "list-group-item text-center";
    element.innerHTML = `<b>${email.value}</b>`;
    ul.appendChild(element);

    const btn = document.createElement("button");
    btn.classList = "btn btn-danger float-right";
    btn.innerText = "DELETE";
    btn.id = "delete";
    element.appendChild(btn);

    const editBtn = document.createElement("button");
    editBtn.classList = "btn btn-primary mr-5";
    editBtn.innerText = "EDIT";
    editBtn.id = "edit";
    element.appendChild(editBtn);

    console.log(btn);
    const obj = { email: `${email.value}`, password: `${password.value}` };

    console.log(obj);

    //localStorage.setItem(`${email.value}Details`, JSON.stringify(obj));

    axios.post(
      "https://crudcrud.com/api/b8a99b6f656b466bbf195711d897994a/addUser",
      {
        email: `${email.value}`,
        password: `${password.value}`,
      }
    );

    const details = JSON.parse(localStorage.getItem(`${email.value}Details`));
    console.log(details.email);
    console.log(details.password);

    console.log("Done");
  }

  ul.addEventListener("click", deleteItem);

  function deleteItem(e) {
    if (e.target.id == "delete") {
      const parent = e.target.parentElement;
      console.log(parent);

      const deleteId = `${parent.firstElementChild.innerText}Details`;

      ul.removeChild(parent);

      //localStorage.removeItem(deleteId);
    }
  }

  ul.addEventListener("click", editItem);
  function editItem(e) {
    if (e.target.id == "edit") {
      const parent = e.target.parentElement;
      console.log(parent);

      const deleteId = `${parent.firstElementChild.innerText}Details`;

      ul.removeChild(parent);

      localStorage.removeItem(deleteId);

      setTimeout((e) => {
        email.value = `${parent.firstElementChild.innerText}`;
        password.value = "";
      }, 500);
    }
  }

  setTimeout((e) => {
    email.value = "";
    password.value = "";
  }, 200);
}
