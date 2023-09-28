const addBookBtn = document.getElementById("showDialog");
const preventClose = document.getElementById("preventClose");
const bookDialog = document.getElementById("addDialog");
const submitBtn = bookDialog.querySelector("#submitBtn");

const myLibrary = [];

function Book(title, author, pages) {
  this.title = title
  this.author = author
  this.pages = pages
}

function addBookToLibrary() {
  // do stuff here
}

addBookBtn.addEventListener("click", () => {
  bookDialog.showModal();
});

bookDialog.addEventListener("click", () => {
  bookDialog.close();
});

preventClose.addEventListener('click', (event) => {
  event.stopPropagation();
});

bookDialog.addEventListener("close", (e) => {
  document.querySelectorAll("input")[0].value = "";
  document.querySelectorAll("input")[1].value = "";
  document.querySelectorAll("input")[2].value = "";
  document.querySelectorAll("input")[3].checked = false;
});

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
});