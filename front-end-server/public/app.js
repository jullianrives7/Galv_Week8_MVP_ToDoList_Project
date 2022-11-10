const allFamiliesButton = document.querySelector("#all_families_btn");
const allParentsButton = document.querySelector("#all_parents_btn");
const allChildrenButton = document.querySelector("#all_children_btn");
const results = document.querySelector(".results");
const listTitle = document.querySelector("#list-title");

async function consoleLogSampleTdListFrom_db() {
  await fetch("http://localhost:3001/api/sample_td_list/all")
    .then((response) => response.json())
    .then((data) => console.log("Sample To-Do List Data:", data));
}

// async function consoleLogAllParentsFrom_db() {
//   await fetch("http://localhost:3001/api/parents")
//     .then((response) => response.json())
//     .then((data) => console.log("Parents Data:", data));
// }

// async function consoleLogAllChildrenFrom_db() {
//   await fetch("http://localhost:3001/api/children")
//     .then((response) => response.json())
//     .then((data) => console.log("Children Data:", data));
// }

consoleLogSampleTdListFrom_db();
// consoleLogAllParentsFrom_db();
// consoleLogAllChildrenFrom_db();

// function displayFamiliesToBrowser(data) {
//   while (results.hasChildNodes()) {
//     results.removeChild(results.firstChild);
//   }
//   let new_ul = document.createElement("ul");
//   new_ul.innerHTML = "Families:";
//   new_ul.style.fontSize = "x-large";
//   new_ul.style.fontWeight = "900";
//   results.appendChild(new_ul);
//   for (var i = 0; i < data.length; i++) {
//     let new_li = document.createElement("li");
//     new_li.innerHTML = `Parents: (Dad: ${data[i].dad}, Mom: ${data[i].mom}), Children: (Name: ${data[i].name}, Gender: ${data[i].gender}) `;
//     new_li.style.fontSize = "medium";
//     new_li.style.fontWeight = "10";
//     new_ul.appendChild(new_li);
//   }
// }

// async function listAllFamiliesToResults() {
//   await fetch("http://localhost:3001/api/families")
//     .then((response) => response.json())
//     .then((data) => displayFamiliesToBrowser(data));
// }

// function displayParentsToBrowser(data) {
//   while (results.hasChildNodes()) {
//     results.removeChild(results.firstChild);
//   }
//   let new_ul = document.createElement("ul");
//   new_ul.innerHTML = "Parents:";
//   new_ul.style.fontSize = "x-large";
//   new_ul.style.fontWeight = "900";
//   results.appendChild(new_ul);
//   for (var i = 0; i < data.length; i++) {
//     let new_li = document.createElement("li");
//     new_li.innerHTML = `Dad: ${data[i].dad}, Mom: ${data[i].mom}`;
//     new_li.style.fontSize = "medium";
//     new_li.style.fontWeight = "10";
//     new_ul.appendChild(new_li);
//   }
// }

// async function listAllParentsToResults() {
//   await fetch("http://localhost:3001/api/parents")
//     .then((response) => response.json())
//     .then((data) => displayParentsToBrowser(data));
// }

// function displayChildrenToBrowser(data) {
//   while (results.hasChildNodes()) {
//     results.removeChild(results.firstChild);
//   }
//   let new_ul = document.createElement("ul");
//   new_ul.className = "results-list";
//   new_ul.innerHTML = "Children:";
//   new_ul.style.fontSize = "x-large";
//   new_ul.style.fontWeight = "900";
//   results.appendChild(new_ul);
//   for (var i = 0; i < data.length; i++) {
//     let new_li = document.createElement("li");
//     new_li.innerHTML = `Name: ${data[i].name}, Gender: ${data[i].gender}`;
//     new_li.style.fontSize = "medium";
//     new_li.style.fontWeight = "10";
//     new_ul.appendChild(new_li);
//   }
// }

// async function listAllChildrenToResults() {
//   await fetch("http://localhost:3001/api/children")
//     .then((response) => response.json())
//     .then((data) => displayChildrenToBrowser(data));
// }

// allFamiliesButton.addEventListener("click", () => {
//   listAllFamiliesToResults();
//   console.log("btn clicked");
// });

// allParentsButton.addEventListener("click", () => {
//   listAllParentsToResults();
//   console.log("btn clicked");
// });

// allChildrenButton.addEventListener("click", () => {
//   listAllChildrenToResults();
//   console.log("btn clicked");
// });
