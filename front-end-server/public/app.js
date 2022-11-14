const allFamiliesButton = document.querySelector("#all_families_btn");
const allParentsButton = document.querySelector("#all_parents_btn");
const allChildrenButton = document.querySelector("#all_children_btn");
const createNewListButton = document.querySelector("#create-new-list-btn");
const saveContinueButton = document.querySelector("#save-continue-btn");
const sampleListButton = document.querySelector("#sample-list-btn");
const getStartedButton = document.querySelector("#get-started-btn");
const menuButton = document.querySelector("#menu-btn");
const newListModal = document.querySelector(".modal");
const homeLink = document.querySelector("#home-link");
const contactLink = document.querySelector("#contact-link");
const savedListsLink = document.querySelector("#saved-lists-link");
const savedListsModalContent = document.querySelector("#saved-lists-modal-cnt");
const savedListsModalBody = document.querySelector("#saved-lists-modal-body");
const confirmDeleteModalBody = document.querySelector(
  "#confirm-delete-modal-body"
);
const inputTitle = document.querySelector("#floatingInput");
const listTitle = document.querySelector("#list-title");
const main = document.querySelector(".main");
const addRowButton = document.querySelector("#add-row-svg");
const deleteListLinks = document.getElementsByClassName("delete-list-link");
const savedListButtons = document.getElementsByClassName("saved-list-button");
const deleteListButton = document.querySelector("#delete-list");

async function consoleLogSampleTdListFrom_db() {
  await fetch("http://localhost:3001/api/sample_td_list/all")
    .then((response) => response.json())
    .then((data) => console.log("Sample To-Do List Data:", data));
}
consoleLogSampleTdListFrom_db();

async function consoleLogAllListsFrom_db() {
  await fetch("http://localhost:3001/api/get_all_lists")
    .then((response) => response.json())
    .then((data) =>
      console.log("All Lists from DB:", JSON.parse(JSON.stringify(data)))
    );
}
consoleLogAllListsFrom_db();

async function generateSampleList(data) {
  while (main.hasChildNodes()) {
    main.removeChild(main.firstChild);
  }
  function appendHtml(el, str) {
    var div = document.createElement("div"); //container to append to
    div.className = "td_list_container";
    div.innerHTML = str;
    while (div.children.length > 0) {
      el.appendChild(div.children[0]);
    }
  }
  var html_start = `<div class="container"> Sample "To-Do" List
  <table class="table table-striped table-hover">
      <thead>
      <tr>
          <th scope="col" id="num-col">#</th>
          <th scope="col" id="item-col">Item</th>
          <th scope="col" id="status-col">Status</th>
      </tr>
      </thead>
      <tbody>`;
  var html_middle = ``;
  var html_end = `</tbody>
      </table>
      </div>`;
  for (var i = 0; i < data.length; i++) {
    let switchStatus1;
    let switchStatus2;
    if (data[i].completion_status === true) {
      switchStatus1 = `"flexSwitchCheckChecked" checked`;
      switchStatus2 = `"flexSwitchCheckChecked"`;
    } else if (data[i].completion_status === false) {
      switchStatus1 = "flexSwitchCheckDefault";
      switchStatus2 = "flexSwitchCheckDefault";
    }
    let new_row = `<tr>
                      <td>${data[i].id}</td>
                      <td>${data[i].list_item}</td>
                      <th scope="row"><div class="form-check form-switch">
                          <input class="form-check-input" type="checkbox" role="switch" id=${switchStatus1}>
                          <label class="form-check-label" for=${switchStatus2}></label>
                        </div></th>
                  </tr>`;
    html_middle = html_middle + new_row;
  }
  let html = html_start + html_middle + html_end;
  appendHtml(main, html);
}

sampleListButton.addEventListener("click", () => {
  console.log("sample button clicked");
  fetch("http://localhost:3001/api/sample_td_list/all")
    .then((response) => response.json())
    .then((data) => console.log(generateSampleList(data)));
});

function createNewList() {
  let titleToLowercaseAndSpacesTo_ = () => {
    let splitWordArr = inputTitle.value.split(" ");
    for (each in splitWordArr) {
      splitWordArr[each] = splitWordArr[each].toLowerCase();
    }
    let resultText = splitWordArr.join("_");
    return resultText;
  };

  fetch(
    `http://localhost:3001/api/new_td_list/${titleToLowercaseAndSpacesTo_()}`,
    {
      method: "POST",
    }
  )
    .then((response) => response.json())
    .then((data) => console.log("New table created in api db."));
  while (main.hasChildNodes()) {
    main.removeChild(main.firstChild);
  }
  function appendHtml(el, str) {
    var div = document.createElement("div"); //container to append to
    div.innerHTML = str;
    while (div.children.length > 0) {
      el.appendChild(div.children[0]);
    }
  }
  var html = `<div class="container"> ${inputTitle.value}
  <table class="table table-striped table-hover">
      <thead>
      <tr>
          <th scope="col" id="num-col">#</th>
          <th scope="col" id="status-col">Status</th>
          <th scope="col" id="item-col">Item</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>
        <img src="./images/add-circle-outline.svg"  id="add-row-svg" width="30" height="30">
        </td>
        <td></td>
        <td></td>
      </tr>
      </tbody>
  </table>
  </div>`;
  appendHtml(main, html);
}

saveContinueButton.addEventListener("click", () => {
  console.log("save and continue button clicked");
  console.log(inputTitle.value);
  createNewList();
});

inputTitle.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    console.log("enter key pressed");
    saveContinueButton.click();
  }
});

getStartedButton.addEventListener("click", () => {
  savedListsLink.click();
  console.log("menu button clicked");
});

homeLink.addEventListener("click", () => {
  window.location.reload();
  console.log("Home link clicked. Home page generated.");
});

savedListsLink.addEventListener("click", () => {
  function postSavedListsToModal(data) {
    while (savedListsModalBody.hasChildNodes()) {
      savedListsModalBody.removeChild(savedListsModalBody.firstChild);
    }
    if (data.length === 1) {
      let p = document.createElement("p");
      p.innerHTML = `<p>You currently don't have any saved lists.</p>`;
      let footer_btn = document.createElement("div");
      footer_btn.innerHTML = `<div class="modal-footer">
      <button class="btn btn-outline-success me-2" id="create-new-list-btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop" type="button">Create New List</button>
    </div>`;
      savedListsModalBody.appendChild(p);
      savedListsModalContent.appendChild(footer_btn);
    } else {
      for (var i = 0; i < data.length; i++) {
        if (data[i].tablename != "sample_td_list") {
          let listButton = document.createElement("div");
          let splitAndCapListTitle = () => {
            let splitWordArr = data[i].tablename.split("_");
            for (each in splitWordArr) {
              splitWordArr[each] =
                splitWordArr[each].charAt(0).toUpperCase() +
                splitWordArr[each].slice(1);
            }
            let resultText = splitWordArr.join(" ");
            return resultText;
          };
          // listButton.innerHTML = `<button class="btn btn-md btn-outline-success me-2"  id="${
          //   data[i].tablename
          // }-btn" data-bs-target="modal" data-bs-dismiss="modal" type="button">${splitAndCapListTitle()}</button>`;
          listButton.innerHTML = `<div class="btn-group">
          <button type="button" class="btn btn-outline-success saved-list-button" id="${
            data[i].tablename
          }">${splitAndCapListTitle()}</button>
          <button type="button" class="btn btn-outline-danger dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
            <span class="visually-hidden">Toggle Dropdown</span>
          </button>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item delete-list-link" href="#" id="${
              data[i].tablename
            }">Delete List</a></li>
          </ul>
        </div>`;
          savedListsModalBody.appendChild(listButton);
          if (!savedListsModalContent.querySelector(".modal-footer")) {
            let footer_btn = document.createElement("div");
            footer_btn.innerHTML = `<div class="modal-footer">
          <button class="btn btn-outline-success me-2" id="create-new-list-btn" type="button">Create New List</button>
        </div>`;
            savedListsModalContent.appendChild(footer_btn);
          }
        }
      }
      function createEventListenersForSavedListBtns() {
        for (var i = 0; i < savedListButtons.length; i++) {
          savedListButtons[i].addEventListener("click", () => {
            console.log(
              "clicked 'saved list button' for list table: ",
              event.target.id
            );
          });
          console.log("saved buttons event listeners created");
        }
      }
      createEventListenersForSavedListBtns();

      // function createEventListenerForDeleteListLinks() {
      //   for (var i = 0; i < deleteListLinks.length; i++) {
      //     deleteListLinks[i].addEventListener("click", () => {
      //       console.log(
      //         "clicked 'delete list link' for list table: ",
      //         event.target.id
      //       );
      //       let splitAndCapListToBeDelTitle = () => {
      //         let splitWordArr = event.target.id.split("_");
      //         for (each in splitWordArr) {
      //           splitWordArr[each] =
      //             splitWordArr[each].charAt(0).toUpperCase() +
      //             splitWordArr[each].slice(1);
      //         }
      //         let resultText = splitWordArr.join(" ");
      //         return resultText;
      //       };
      //       let p = document.createElement("p");
      //       p.innerHTML = `Are you sure you want to delete your "${splitAndCapListToBeDelTitle()}" list?`;
      //       confirmDeleteModalBody.appendChild(p);
      //       deleteListButton.classList.add(`${event.target.id}`);
      //     });
      //   }
      // }
      // createEventListenerForDeleteListLinks();

      function createEventListenersForDeleteListLinks() {
        for (var i = 0; i < deleteListLinks.length; i++) {
          deleteListLinks[i].addEventListener("click", () => {
            console.log(
              "clicked 'delete list link' for list table: ",
              event.target.id
            );
            function target_index() {
              let index;
              for (i = 0; i < savedListsModalBody.children.length; i++) {
                if (
                  savedListsModalBody.children[i].outerHTML.includes(
                    `${event.target.id}`
                  )
                ) {
                  index = i;
                  console.log("index = ", index);
                  return index;
                }
              }
            }
            console.log(target_index());
            // console.log(savedListsModalBody.children[target_index()]);
            console.log(event.target.id);
            console.log(savedListsModalBody.children);
            fetch(`http://localhost:3001/api/${event.target.id}`, {
              method: "DELETE",
            })
              .then((response) => response.json())
              .then((data) => console.log("Table deleted from api db."))
              .then(
                savedListsModalBody.removeChild(
                  savedListsModalBody.children[target_index()]
                )
              );
            if (savedListsModalBody.children.length === 0) {
              let p = document.createElement("p");
              p.innerHTML = `<p>You currently don't have any saved lists.</p>`;
              savedListsModalBody.appendChild(p);
            }
          });
          console.log("delete list links event listeners created");
        }
      }
      createEventListenersForDeleteListLinks();
    }
  }

  fetch("http://localhost:3001/api/get_all_lists")
    .then((response) => response.json())
    .then((data) => postSavedListsToModal(JSON.parse(JSON.stringify(data))));
});

// deleteListButton.addEventListener("click", () => {
//   console.log("clicked");
//   console.log(deleteListButton.classList[2]);
//   function target_index() {
//     let index;
//     for (i = 0; i < savedListsModalBody.children.length; i++) {
//       if (
//         savedListsModalBody.children[i].outerHTML.includes(
//           `${deleteListButton.classList[2]}`
//         )
//       ) {
//         index = i;
//         console.log("index = ", index);
//         return index;
//       }
//     }
//   }
//   console.log(target_index());
//   console.log(savedListsModalBody.children[target_index]);
//   let index = target_index();
//   fetch(`http://localhost:3001/api/${deleteListButton.classList[2]}`, {
//     method: "DELETE",
//   })
//     .then((response) => response.json())
//     .then((data) => console.log("Table deleted from api db."))
//     .then(savedListsModalBody.removeChild(savedListsModalBody.children[index]))
//     .then(savedListsLink.click());
// if (savedListsModalBody.children.length === 0) {
//   let p = document.createElement("p");
//   p.innerHTML = `<p>You currently don't have any saved lists.</p>`;
//   savedListsModalBody.appendChild(p);
// }
// });
