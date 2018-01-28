const uuid = require('uuid/v4')

const fs = require('fs')
const dbPath = __dirname + '/db.json' //where
const dataJSON = fs.readFileSync(dbPath) //read the file
const db = JSON.parse(dataJSON) //making json readable array full of obj

function getAllBooks () {
    return db
}

function getBookByID(id) {
    const book = db.find(book => book.id === id)
    return book
}

function createBook(name, authors, borrowed, description) {
    const book = {
            id: uuid(),
            name: name,
            borrowed: borrowed,
            description: description || '',
            authors: authors || []
        }
    db.push(book)
    fs.writeFileSync(dbPath, JSON.stringify(db))
    return book
} 

function updateBook(id, name, borrowed, description, authors) {
    let bookID = db.find(book => book.id === id)
    bookID.name = name
    bookID.borrowed = borrowed
    bookID.description = description
    bookID.authors = authors
    fs.writeFileSync(dbPath, JSON.stringify(db))
    return bookID
}

function deleteBook(id) {
    const bookID = db.find(book => book.id === id)
    const index = db.indexOf(bookID)
    db.splice(index, 1)
    fs.writeFileSync(dbPath, JSON.stringify(db))
    return bookID
}

//author routes
function getAuthors(id) {
    const bookID = db.find(book => book.id === id)
    return bookID.authors
}

function getOneAuthor(id, aid) {
    let bookID = db.find(book => book.id === id)
    let authorID = bookID.authors.find(author => author.id === aid)
    return authorID
}

function createAuthor(id, fname, lname) {
    let bookID = db.find(book => book.id === id)
    const author = {
            id: uuid(),
            fname: fname,
            lname: lname
    }
    bookID.authors.push(author)
    fs.writeFileSync(dbPath, JSON.stringify(db))
    return author
}

function updateAuthor(id, aid) {
    let bookID = db.find(book => book.id === id)
    const authorID = bookID.authors.find(author => author.id === aid)
    authorID.fname = fname
    authorID.lname = lname
    fs.writeFileSync(dbPath, JSON.stringify(db))
    return authorID
}

function deleteAuthor(id, aid) {    
    let findBook = db.find(book => book.id === id)
    let findAuthorToDelete = findBook.authors.find(author => author.id === aid)
    const index = findBook.authors.indexOf(findAuthorToDelete)
    findBook.authors.splice(index, 1)
    fs.writeFileSync(dbPath, JSON.stringify(db))
    return findAuthorToDelete
}

module.exports = {
    getAllBooks,
    getBookByID,
    createBook,
    updateBook,
    deleteBook,
    getAuthors,
    getOneAuthor,
    createAuthor,
    updateAuthor,
    deleteAuthor
}

