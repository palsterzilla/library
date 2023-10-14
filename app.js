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
}

const myLibrary = new Library();

// UI
const addBookBtn = document.getElementById("showDialog");
const preventClose = document.getElementById("preventClose");
const bookDialog = document.getElementById("addDialog");
const submitBtn = document.getElementById("submitBtn");

const cardWrapper = document.getElementById("wrapper");
const inputTitle = document.getElementById("title");
const inputAuthor = document.getElementById("author");
const inputPages = document.getElementById("pages");
const readCheck = document.getElementById("readCheck");

const addBookToLibrary = () => {
  const newBook = () => {
    const title = inputTitle.value;
    const author = inputAuthor.value;
    const pages = inputPages.value;
    const isRead = readCheck.checked;
    return new Book(title, author, pages, isRead);
  }
  
  myLibrary.addBook(newBook())
}

const updateBooksGrid = () => {
  resetBooksGrid()
  for (let book of myLibrary.books) {
    createBookCard(book)
  }
}

// TODO create toggleRead() and remove() as on ln 141
const createBookCard = (book) => {
  const bookCard = document.createElement("div");
  const title = document.createElement("p");
  const author = document.createElement("p");
  const pages = document.createElement("p");
  const btnRead = document.createElement("BUTTON");
  const btnRemove = document.createElement("BUTTON");
  
  bookCard.setAttribute("class", "card");
  // bookCard.setAttribute("id", i);
  // bookCard.setAttribute("data-card", "");
  title.textContent = `"${book.title}"`;
  author.textContent = book.author;
  pages.textContent = `${book.pages} pages`;

  if (book.isRead) {
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
  
  cardWrapper.append(bookCard);
  bookCard.append(title, author, pages, btnRead, btnRemove);
}

const resetBooksGrid = () => {
  cardWrapper.innerHTML = ""
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
  updateBooksGrid();
  bookDialog.close();
});

inputTitle.addEventListener("keyup", enableSubmit);
inputAuthor.addEventListener("keyup", enableSubmit);
inputPages.addEventListener("change", enableSubmit);

// not used, keep for now
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

      // updatePage();
  }
})