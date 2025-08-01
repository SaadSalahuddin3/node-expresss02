const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'db.json');

// helper to load & save
function loadBooks() {
  return JSON.parse(fs.readFileSync(dbPath));
}
function saveBooks(books) {
  fs.writeFileSync(dbPath, JSON.stringify(books, null, 2));
}

exports.addBook = (req, res) => {
  const data = req.body;
  if (!data.title || !data.author || !data.genre || !data.publishedYear) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  const books = loadBooks();
  const id = books.length ? books[books.length - 1].id + 1 : 1;
  const newBook = {
    id,
    title: data.title,
    author: data.author,
    genre: data.genre,
    publishedYear: data.publishedYear,
    status: 'available'
  };
  books.push(newBook);
  saveBooks(books);
  res.status(201).json(newBook);
};

exports.getAllBooks = (req, res) => {
  const books = loadBooks();
  res.status(200).json(books);
};

exports.updateBook = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const updates = req.body;
  const books = loadBooks();
  const idx = books.findIndex(b => b.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Book not found' });
  Object.assign(books[idx], updates);
  saveBooks(books);
  res.status(200).json(books[idx]);
};

exports.deleteBook = (req, res) => {
  const id = parseInt(req.params.id, 10);
  let books = loadBooks();
  const idx = books.findIndex(b => b.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Book not found' });
  const [deleted] = books.splice(idx, 1);
  saveBooks(books);
  res.status(200).json({ message: `Deleted book id ${deleted.id}` });
};
