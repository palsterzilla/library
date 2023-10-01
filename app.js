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
  this.toggleRead = function() {
    this.readCheck = !this.readCheck;
  };
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
    btnRead.setAttribute("id", "readBtn");
    btnRead.setAttribute("value", i);

    btnRemove.textContent = "Remove";
    btnRemove.setAttribute("type", "button");
    
    cardWrapper.append(div);
    div.append(paraTitle, paraAuthor, paraPages, btnRead, btnRemove);
  }
}

function enableSubmit(){
  const inputs = document.getElementsByClassName("required");

  let isValid = true;
  for (let i = 0; i < inputs.length; i++){
    const changedInput = inputs[i];
    if (changedInput.value.trim() === "" || changedInput.value === null){
      isValid = false;
      break;
    }
  }
  submitBtn.disabled = !isValid;
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
  submitBtn.disabled = true;
});

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  addBookToLibrary();
  bookDialog.close();
});

inputTitle.addEventListener("keyup", enableSubmit);
inputAuthor.addEventListener("keyup", enableSubmit);
inputPages.addEventListener("change", enableSubmit);

cardWrapper.addEventListener("click", function(event) {
  const readBtn = event.target.closest("#readBtn");
  
  if (readBtn) {
    const bookIndex = myLibrary[readBtn.value];

    bookIndex.toggleRead();
  
    if (readBtn.textContent == "Read") {
      readBtn.textContent = "Not read";
    } else {
      readBtn.textContent = "Read";
    }
  }
})