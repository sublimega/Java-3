//Getting my items that I need in html into JS
const form = document.querySelector(".grocery-form");
const alert = document.querySelector(".alert");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

//setting up the edit button
let editElement;
let editFlag = false;
//to get a specific item in the list
let editID = "";

// Using Event Listeners on the submit button
// To submit form
form.addEventListener("submit", addItem);

//clearing up the value(items)
clearBtn.addEventListener("click", clearItems);

//Function
function addItem(e) {
  e.preventDefault();
  //To access the value in my grocery from the Input
  const value = grocery.value;
  //To give each item a unique ID
  const id = new Date().getTime().toString();

  //   if(value !== '' && editFlag === false){
  //     console.log ('add item to the list')
  // }
  //   else if(value!=='' && editFlag === true){
  //     console.log('editing')
  //   }
  //this is the same as the code beneth this one. Below is a short form of writing the code above.
  if (value && !editFlag) {
    const element = document.createElement("article");
    //add class to the article created
    element.classList.add("grocery-item");
    //adding id to the items
    const attr = document.createAttribute("data-id");
    attr.value = id;
    //add the attribute to the element created
    element.setAttributeNode(attr);
    //printing the attr in the html page
    element.innerHTML = `
            <p class="title">${value}</p>
            <div class="btn-container">
              <button type="button" class="edit-btn">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
              <button type="button" class="delete-btn">
                <i class="fa-regular fa-trash-can"></i>
              </button>
            </div>
          `;
    const deleteBtn = element.querySelector(".delete-btn");
    const editBtn = element.querySelector(".edit-btn");
    deleteBtn.addEventListener("click", deleteItem);
    editBtn.addEventListener("click", editItem);
    //append the items to the List using 'append child'
    list.appendChild(element);
    //display alert
    displayAlert("item added to the list", "success");
    //show container that contains the item
    container.classList.add("show-container");
    //set back to default after entering data in input
    setBackToDefault();
  } else if (value && editFlag) {
    editElement.innerHTML = value
    displayAlert("value changed", "success");
    setBackToDefault();
  } else {
    displayAlert("Please enter a value", "danger");
  }
}
//display alert
function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);

  //function to remove the alert after a time period
  setTimeout(function () {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 1000);
}

// clear items function
function clearItems() {
  const items = document.querySelectorAll(".grocery-item");
  if (items.length > 0) {
    items.forEach(function (item) {
      list.removeChild(item);
    });
  }
  container.classList.remove("show-container");
  displayAlert("empty list", "danger");
  setBackToDefault();
}
//delete function
function deleteItem(b) {
  const element = b.currentTarget.parentElement.parentElement;
  list.removeChild(element);
  if (list.children.length === 0) {
    container.classList.remove("show-container");
  }
  displayAlert("item removed", "danger");
  setBackToDefault();
}

//edit function
function editItem(b) {
  const element = b.currentTarget.parentElement.parentElement;
  //set edit item
  editElement = b.currentTarget.parentElement.previousElementSibling;
  //set form value
  grocery.value = editElement.innerHTML;
  editFlag = true;
  editID = element.dataset.id;
  submitBtn.textContent = "edit"
}

//set back to default function
function setBackToDefault() {
  grocery.value = "";
  editFlag = false;
  editID = "";
  submitBtn.textContent = "submit";
}
