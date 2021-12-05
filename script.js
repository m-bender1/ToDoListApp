// To-Do List Redesign - Aug. 2020

var addBtn = document.getElementById("addBtn");
var input = document.getElementById("inputTask"); // ref to input area
var taskArea = document.getElementById("taskArea");
var taskList = document.getElementById("taskList");

// for add button to work with enter key
let taskInputArea = document.getElementById("inputTask");
taskInputArea.addEventListener("keyup", function(event) {
   if (event.key === 13) {
    event.preventDefault();
    addBtn.click();
   }
 });

function createTaskItem(tLabel) {
      // create elements
      let taskItem = document.createElement("li"); // task var that elements will be appended to

      let taskLabel = document.createElement("label"); // label for task()
      let check = document.createElement("input")
      let editTask = document.createElement("input");
      let editBtn = document.createElement("i"); // making them i element instead of button for the icons
      let deleteBtn = document.createElement("i");

      // get innertext of the label and turn into text node so its able to append
      taskLabel.innerText = tLabel;
      let labelNode = document.createTextNode(tLabel);

      // modify elements
      check.type = "checkbox";
      check.id = "checkStatus";

      // add classname and label to buttons
      editBtn.className = "fas fa-pencil-alt";
      editBtn.id = "editBtn";

      deleteBtn.id = "delBtn";
      deleteBtn.className = "fas fa-trash-alt";

      editTask.type = "text";
      editTask.id = "editTask";

      // now append all elements as children of listItem(li element)
      taskItem.appendChild(check);
      taskItem.appendChild(labelNode);
      taskItem.appendChild(deleteBtn);
      taskItem.appendChild(editBtn);

      // event listeners for appended buttons
      // these need to be moved and referenced by id instead but im too lazy to do that right now
      editBtn.addEventListener("click", createEditInput);
      deleteBtn.addEventListener("click", deleteTask);
      check.addEventListener("click", tickTask);

      return taskItem;
   }

function addItem() {
      let taskItem = createTaskItem(input.value); // get input from user, create item var
      taskList.appendChild(taskItem);

      input.value = "";
   }

// create function to bring up the new input area when editing task
function createEditInput() {
      let taskItem = this.parentNode; // listItem = li element 
      let fullList = taskItem.parentNode; // fullList = ul element
      let listElement = document.createElement("li");
      let newItem = document.createElement("input");
      let saveBtn = document.createElement("button");

      // modify and append
      saveBtn.innerText = "Save";
      newItem.type = "text";
      newItem.id = "editBox";
      listElement.appendChild(newItem);
      listElement.appendChild(saveBtn);

      // remove original list item and replace with input field
      fullList.replaceChild(listElement, taskItem)

      saveBtn.addEventListener("click", saveInput);
      newItem.addEventListener("keyup", function(event) {
         if(event.keyCode === 13) {
            saveBtn.click();
         }
      });
   }

function saveInput() {
      // after edit has been clicked, input area appears for task to be altered, then saved
      let fullList = this.parentNode.parentNode; // ul element
      let taskItem = this.parentNode;
      let newItem = document.getElementById("editBox"); // reference to task input box
      fullList.replaceChild(createTaskItem(newItem.value), taskItem); // replace the list item being edited with the new input value
   }

function deleteTask() {
      // get refrence to li and remove it from ul 
      let fullList = this.parentNode.parentNode; // ul
      let taskItem = this.parentNode; // li

      fullList.removeChild(taskItem);
   }

function tickTask() {
      // if the item is checked, it is simply striked out 
      let taskItem = this.parentNode;
      let check = taskItem.childNodes[0];

      if (check.checked == true) {
         // if the task gets ticked, put a slash thru
         taskItem.style.textDecoration = "line-through";
         taskItem.style.color = "rgb(145, 145, 145)";
      }
      else if (check.checked == false) {
         taskItem.style.textDecoration = "none";
         taskItem.style.color = "black";
      }
   }