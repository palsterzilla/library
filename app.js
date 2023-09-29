const addBookBtn = document.getElementById("showDialog");
const preventClose = document.getElementById("preventClose");
const bookDialog = document.getElementById("addDialog");
const submitBtn = bookDialog.querySelector("#submitBtn");

const cardWrapper = document.querySelector(".wrapper");
const inputTitle = document.getElementById("title");
const inputAuthor = document.getElementById("author");
const inputPages = document.getElementById("pages");
const readCheck = document.getElementById("readCheck");

const myLibrary = [];

function Book(title, author, pages, readCheck) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readCheck = readCheck;
}

function addBookToLibrary() {
  const div = document.createElement("div");
  const paraTitle = document.createElement("p");
  const paraAuthor = document.createElement("p");
  const paraPages = document.createElement("p");
  const btnRead = document.createElement("BUTTON");
  const btnRemove = document.createElement("BUTTON");

  myLibrary.push(
    new Book(
      inputTitle.value,
      inputAuthor.value,
      inputPages.value,
      readCheck.checked,
    )
  );

  for (let i = 0; i < myLibrary.length; i++) {
    div.classList.add("card");
    paraTitle.textContent = `"${myLibrary[i].title}"`;
    paraAuthor.textContent = myLibrary[i].author;
    paraPages.textContent = `${myLibrary[i].pages} pages`;

    if (readCheck.checked) {
      btnRead.textContent = "Read";
    } else {
      btnRead.textContent = "Not read";
    }
    btnRead.setAttribute("type", "button");

    btnRemove.textContent = "Remove";
    btnRemove.setAttribute("type", "button");
    
    cardWrapper.append(div);
    div.append(paraTitle, paraAuthor, paraPages, btnRead, btnRemove);
  }
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

bookDialog.addEventListener("close", () => {
  inputTitle.value = "";
  inputAuthor.value = "";
  inputPages.value = "";
  readCheck.checked = false;
});

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();  
  addBookToLibrary();
  bookDialog.close();
});