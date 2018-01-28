const model = require('./model.js')

function getAllBooks (req, res) {
    const books = model.getAllBooks()
    res.status(200).json({data: books})
}

function getBookByID (req, res, next) {
    const id = req.params.id
    const book = model.getBookByID(id)
    if (!book) return next({status:400, message: `Could not find ID: ${id}` })
    res.json({data: book})
}

function createBook (req, res, next) {
    const { name, borrowed, description, authors } = req.body   
    if(!name || name.length > 30 || typeof name !== 'string') return next({status:400, message: `Name can only be a string that's less than 30 characters!!`})
    if (borrowed === undefined || (typeof borrowed) !== 'boolean') return next({status:400, message: `This field can only be true or false!`})
    if (authors && !Array.isArray(authors)) return next({status:400, message: `Authors can only be an ARRAY`})
    if (description && typeof description !== 'string') return next({status:400, message: `Only letters please!`})
    const book = model.createBook(name, authors, borrowed, description)
    res.status(201).json({data: book})
}

function updateBook (req, res, next) {
    const id = req.params.id
    const { name, borrowed, description, authors } = req.body
    if (!name || typeof borrowed === 'undefined' || !description || !authors) return next({status:400, message: `The name, borrowed, description & authors fields are required!` })
    let book = model.updateBook(id, name, borrowed, description, authors)
    if (!book) return next({status:404, message: `Could not find ID: ${id}` })
    res.status(200).json({data: book})
}

function deleteBook (req, res, next) {
    const id = req.params.id
    const book = model.deleteBook(id)
    if (!book) return next({status:400, message: `Could not find ID: ${id}` })
    res.status(200).json({data: book})
}

//authors routes
function getAuthors (req, res, next) {
    const id = req.params.id
    const authors = model.getAuthors(id)
    if (!authors) return next({status:400, message: `Could not find ID: ${id}` })
    res.status(200).json({data: authors})
}

function getOneAuthor(req, res, next) {
    const id = req.params.id
    const aid = req.params.aid
    const author = model.getOneAuthor(id, aid)
    if (!author) return next({status:400, message: `Could not find ID: ${id}` })
    res.status(200).json({data: author})
}

function createAuthor(req, res, next) {
    const id = req.params.id
    const { fname, lname } = req.body
    if (!fname || typeof fname != 'string') return next({status:400, message: `The field: fname can only be a string!` })
    if (!lname || typeof lname != 'string') return next({status:400, message: `The field: lname can only be a string!` })
    const author = model.createAuthor(id, fname, lname)
    if (!author) return next({status:400, message: `Could not find ID: ${id}` })
    res.status(201).json({data: author})
}

function updateAuthor(req, res, next) {
    const id = req.params.id
    const { fname, lname } = req.body
    const aid = req.params.aid
    const author = model.updateAuthor(id, aid)
    if (!author) {
        next({status:400, message: `Could not find ID: ${id}` })
        if (!author.fname || !author.lname) {
            next({status:400, message: `Please enter in the author's first and last name` })
        } else {
            res.status(200).json({data: author})
        }
    } 
}

function deleteAuthor(req, res, next) {
    const id = req.params.id
    const aid = req.params.aid
    const author = model.deleteAuthor(id, aid)
    if (!author) {
        next({status:400, message: `Could not find ID: ${id}` })
    } else {
        res.status(200).json({data: author})
    }
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