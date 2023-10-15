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

  getBook(title) {
    return this.books.find((book) => book.title === title)
  }

  removeBook(title) {
    this.books = this.books.filter((book) => book.title !== title)
  }
}

const myLibrary = new Library();

// UI
const addBookBtn = document.getElementById("showDialog");
const preventClose = document.getElementById("preventClose");
const bookDialog = document.getElementById("addDialog");
const addBookForm = document.getElementById("book-form");

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

const createBookCard = (book) => {
  const bookCard = document.createElement("div");
  const title = document.createElement("p");
  const author = document.createElement("p");
  const pages = document.createElement("p");
  const btnRead = document.createElement("BUTTON");
  const btnRemove = document.createElement("BUTTON");
  
  bookCard.setAttribute("class", "card");
  title.textContent = `"${book.title}"`;
  author.textContent = book.author;
  pages.textContent = `${book.pages} pages`;

  if (book.isRead) {
    btnRead.textContent = "Read";
    btnRead.setAttribute("class", "read");
  } else {
    btnRead.textContent = "Not read";
    btnRead.setAttribute("class", "unread");
  }

  btnRead.setAttribute("type", "button");
  btnRead.setAttribute("id", "readBtn");
  btnRead.addEventListener("click", toggleRead);
  
  btnRemove.textContent = "Remove";
  btnRemove.setAttribute("type", "button");
  btnRemove.setAttribute("id", "removeBtn");
  btnRemove.addEventListener("click", removeBook);
  
  cardWrapper.append(bookCard);
  bookCard.append(title, author, pages, btnRead, btnRemove);
}

const resetBooksGrid = () => {
  cardWrapper.innerHTML = ""
}

const toggleRead = (e) => {
  const title = e.target.parentNode.firstChild.innerText.replaceAll('"', '');
  const book = myLibrary.getBook(title);
  
  book.isRead = !book.isRead;
  updateBooksGrid();
}

const removeBook = (e) => {
  const title = e.target.parentNode.firstChild.innerText.replaceAll('"', '');
  
  myLibrary.removeBook(title);
  updateBooksGrid();
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

addBookForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addBookToLibrary();
  updateBooksGrid();
  bookDialog.close();
})