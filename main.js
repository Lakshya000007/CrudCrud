window.addEventListener("DOMContentLoaded", initialFunction);
function initialFunction(e) {
  axios
    .get("https://crudcrud.com/api/5e08cf111c8d4a638a40c722206b7932/addUser")
    .then((res) => {
      console.log(res);
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

const submit = document.querySelector("button");

const ul = document.querySelector("ul");

const email = document.getElementById("exampleInputEmail1");

const password = document.getElementById("exampleInputPassword1");

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
    // const obj = { email: `${email.value}`, password: `${password.value}` };

    // console.log(obj);

    //localStorage.setItem(`${email.value}Details`, JSON.stringify(obj));

    axios.post(
      "https://crudcrud.com/api/5e08cf111c8d4a638a40c722206b7932/addUser",
      {
        email: `${email.value}`,
        password: `${password.value}`,
      }
    );

    // const details = JSON.parse(localStorage.getItem(`${email.value}Details`));
    // console.log(details.email);
    // console.log(details.password);

    // console.log("Done");
  }

  setTimeout((e) => {
    email.value = "";
    password.value = "";
  }, 200);
}

submit.addEventListener("click", submitForm);
ul.addEventListener("click", (e) => {
  if (e.target.id == "delete") {
    const parent = e.target.parentElement;
    uniqueEmail = parent.children[0].innerText;
    axios
      .get("https://crudcrud.com/api/5e08cf111c8d4a638a40c722206b7932/addUser")
      .then((res) => {
        console.log(res);
        let i = 0;
        for (let data of res.data) {
          if (data.email == uniqueEmail) {
            uniqueId = data._id;
            axios
              .delete(
                `https://crudcrud.com/api/5e08cf111c8d4a638a40c722206b7932/addUser/${uniqueId}`
              )
              .then((res) => {
                console.log("Deleted");
              })
              .catch((err) => console.error(err));
          }
        }
      })
      .catch((err) => console.error(err));
    ul.removeChild(parent);
  }
});

console.log(ul);
