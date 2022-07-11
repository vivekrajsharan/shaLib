console.log("project 2");

let prevBook = [];
showBooks();
// constructor
function Book(name, author, type) {
  this.name = name;
  this.author = author;
  this.type = type;
}

// to diplay previous books
function showBooks() {
  let entry = localStorage.getItem("entries");
  let tableBody = document.getElementById("tableBody");

  if (entry == null) {
    bookObj = [];
  } else {
    bookObj = JSON.parse(entry);
  }

  console.log(bookObj);
  bookObj.forEach((element) => {
    let uiString = `
              <tr>
                <td>${element.name}</td>
                <td>${element.author}</td>
                <td>${element.type}</td>
              </tr>`;
    tableBody.innerHTML += uiString;
  });
  prevBook = bookObj.concat(prevBook);
  // prev.push(element)
}

// diplay constuctor
function Display() {}

// add methods to display prototypes
Display.prototype.add = function (book) {
  // console.log("adding to UI");
  tableBody = document.getElementById("tableBody");
  let uiString = `
            <tr>
              <td>${book.name}</td>
              <td>${book.author}</td>
              <td>${book.type}</td>
            </tr>`;
  tableBody.innerHTML += uiString;
};

// implement the clear function
Display.prototype.clear = function () {
  let libraryForm = document.getElementById("libraryForm");
  libraryForm.reset();
};

// implement the validate function
Display.prototype.validate = function (book) {
  if (book.name.length < 2 || book.author.length < 2) {
    return false;
  } else {
    return true;
  }
};

// implement the show alert message function
Display.prototype.show = function (type, displayMessage) {
  let message = document.getElementById("message");
  message.innerHTML = `
                <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                  <strong>message</strong> ${displayMessage}!
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"></button>
                </div>
  `;
  setTimeout(function () {
    message.innerHTML = "";
  }, 2000);
};

// add submit event listner to libraryForm
let libraryForm = document.getElementById("addBook");
libraryForm.addEventListener("click", libraryFormSubmit);

function libraryFormSubmit(e) {
  console.log("You have submitted Library form");
  let name = document.getElementById("bookName").value;
  let author = document.getElementById("author").value;

  let fiction = document.getElementById("fiction");
  let programming = document.getElementById("programming");
  let cooking = document.getElementById("cooking");
  let type;

  if (fiction.checked) {
    type = fiction.value;
  } else if (programming.checked) {
    type = programming.value;
  } else if (cooking.checked) {
    type = cooking.value;
  }

  let book = new Book(name, author, type);
  console.log(book);

  let display = new Display();
  display.validate(book);

  if (display.validate(book)) {
    display.add(book);
    display.clear();

    let entries;
    prevBook.push(book);
    localStorage.setItem("entries", JSON.stringify(prevBook));

    display.show("success", " Your book has been successfully added");
  } else {
    // show error to user
    display.show("danger", " Sorry you cannot add this book");
  }

  e.preventDefault();
}

//localStorage.setItem("entries", JSON.stringify(book));
