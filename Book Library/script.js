// script.js
let books = [];

function addBook() {
  const title = document.getElementById('bookTitle').value;
  const author = document.getElementById('bookAuthor').value;
  const category = document.getElementById('bookCategory').value;

  if (!title || !author || !category) {
    alert('Please fill in all fields');
    return;
  }

  const newBook = {
    id: Date.now(),
    title,
    author,
    category,
    isBorrowed: false,
    history: []
  };

  books.push(newBook);
  displayBooks();
  clearInputs();
}

function clearInputs() {
  document.getElementById('bookTitle').value = '';
  document.getElementById('bookAuthor').value = '';
  document.getElementById('bookCategory').value = '';
}

function displayBooks(filteredBooks = books) {
  const bookList = document.getElementById('bookList');
  bookList.innerHTML = '';

  filteredBooks.forEach(book => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div>
        <strong>${book.title}</strong> by ${book.author} [${book.category}] ${book.isBorrowed ? '<span class="borrowed">(Borrowed)</span>' : ''}
      </div>
      <div class="book-actions">
        <button onclick="toggleBorrow(${book.id})">${book.isBorrowed ? 'Return' : 'Borrow'}</button>
        <button onclick="viewHistory(${book.id})">History</button>
      </div>
    `;
    bookList.appendChild(li);
  });
}

function searchBooks() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const filtered = books.filter(book =>
    book.title.toLowerCase().includes(query) ||
    book.author.toLowerCase().includes(query) ||
    book.category.toLowerCase().includes(query)
  );
  displayBooks(filtered);
}

function toggleBorrow(id) {
  const book = books.find(b => b.id === id);
  book.isBorrowed = !book.isBorrowed;
  const now = new Date().toLocaleString();
  book.history.push(`${book.isBorrowed ? 'Borrowed' : 'Returned'} on ${now}`);
  displayBooks();
}

function viewHistory(id) {
  const book = books.find(b => b.id === id);
  alert(`History for ${book.title}:\n` + book.history.join('\n'));
}
