const addBookBtn = document.getElementById("showDialog");
const bookDialog = document.getElementById("addDialog");

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
  bookDialog.showModal()
});