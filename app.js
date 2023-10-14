class Book {
  constructor(
    title = 'Unknown',
    author = 'Unknown',
    pages = '0',
    isRead = false
  ) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
}

class Library {
  constructor() {
    this.books = []
  }

  addBook(newBook) {
    this.books.push(newBook)
  }

  toggleRead() {
    this.readCheck = !this.readCheck;
  }
}

const myLibrary = new Library();

// UI
const addBookBtn = document.getElementById("showDialog");
const preventClose = document.getElementById("preventClose");
const bookDialog = document.getElementById("addDialog");
const submitBtn = bookDialog.querySelector("#submitBtn");

const cardWrapper = document.querySelector(".wrapper");
const inputTitle = document.getElementById("title");
const inputAuthor = document.getElementById("author");
const inputPages = document.getElementById("pages");
const readCheck = document.getElementById("readCheck");

// function Book(title, author, pages, readCheck) {
//   this.title = title;
//   this.author = author;
//   this.pages = pages;
//   this.readCheck = readCheck;
//   this.toggleRead = function() {
//     this.readCheck = !this.readCheck;
//   };
// }

function addBookToLibrary() {
  const div = document.createElement("div");
  const paraTitle = document.createElement("p");
  const paraAuthor = document.createElement("p");
  const paraPages = document.createElement("p");
  const btnRead = document.createElement("BUTTON");
  const btnRemove = document.createElement("BUTTON");

  myLibrary.addBook(
    new Book(
      inputTitle.value,
      inputAuthor.value,
      inputPages.value,
      readCheck.checked,
    )
  );

  for (let i = 0; i < myLibrary.books.length; i++) {
    div.setAttribute("class", "card");
    div.setAttribute("id", i);
    paraTitle.textContent = `"${myLibrary.books[i].title}"`;
    paraAuthor.textContent = myLibrary.books[i].author;
    paraPages.textContent = `${myLibrary.books[i].pages} pages`;

    if (readCheck.checked) {
      btnRead.textContent = "Read";
      btnRead.setAttribute("class", "read")
    } else {
      btnRead.textContent = "Not read";
      btnRead.setAttribute("class", "unread")
    }

    btnRead.setAttribute("type", "button");
    btnRead.setAttribute("id", "readBtn");

    btnRemove.textContent = "Remove";
    btnRemove.setAttribute("type", "button");
    btnRemove.setAttribute("id", "removeBtn");
    
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

function updatePage() {
  const cards = cardWrapper.querySelectorAll(".card");

  for (let i = 0; i < myLibrary.books.length; i++) {
    cards[i].id = i;
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
  const removeBtn = event.target.closest("#removeBtn");
  const divCard = event.target.closest(".card");

  if (readBtn) {
    const index = divCard.id;
        
    if (readBtn.textContent == "Read") {
      readBtn.classList.remove("read")
      readBtn.classList.add("unread")
      readBtn.textContent = "Not read";
      myLibrary.books[index].isRead = false;

    } else {
      readBtn.classList.remove("unread")
      readBtn.classList.add("read")
      readBtn.textContent = "Read";
      myLibrary.books[index].isRead = true;
    }

  } else if (removeBtn) {
      const index = divCard.id;
      
      myLibrary.books.splice(index, 1);
      divCard.remove();
      updatePage();
  }
})