const uuid = require('uuid/v4');


const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');


let DUMMY_BOOKS = [
    {
        id: 'b1',
        title: 'masnavi',
        description: 'this book will show you who you are',
        author: 'molana',
        uId: 'u1'
    },
    {
        id: 'b2',
        title: 'masnavi2',
        description: 'this book will show you who you are',
        author: 'molana',
        uId: 'u1'
    }
];



const getBookById = (req, res, next) => {
    const bookId = req.params.bid;
    const book = DUMMY_BOOKS.find(b => {
        return b.id === bookId;
    });

    if (!book) {
        throw new HttpError('Could not find book for the provided id', 404);
    }
    
    res.json({book});
};



const getBooksByUserId = (req, res, next) => {
    const userID = req.params.uid;
    const books = DUMMY_BOOKS.filter(b => {
        return b.uId === userID;
    });

    if (!books || books.length === 0) {
        return next(
            new HttpError('Could not find books for the provided user id', 404)
            );
    }
    
    res.json({books});
};


const createBook = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        console.log(errors);
        throw new HttpError('Invalid inputs passed, please check your data', 422);
    }


    const { title, description, author, uId } = req.body;
    const createdBook = {
        id: uuid(),
        title,
        description, 
        author,
        uId
    };

    DUMMY_BOOKS.push(createdBook);

    res.status(201).json({book : createdBook});

};


const updateBook = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        console.log(errors);
        throw new HttpError('Invalid inputs passed, please check your data', 422);
    }

    const { title, description, author } = req.body;
    const bookId = req.params.bid;

    const updatedBook = { ...DUMMY_BOOKS.find(b => b.id === bookId) };
    const bookIndex = DUMMY_BOOKS.findIndex(b => b.id === bookId);
    updatedBook.title = title;
    updatedBook.description = description;
    updatedBook.author = author;

    DUMMY_BOOKS[bookIndex] =updatedBook;

    res.status(200).json({body: updatedBook});
};

const deleteBook = (req, res, next) => {
    const bookId = req.params.bid;
    
    if (!DUMMY_BOOKS.find(b => b.id === bookId)) {
        throw new HttpError('Could not find a place for that id.', 404);
    }

    DUMMY_BOOKS = DUMMY_BOOKS.filter(b => b.id !== bookId);
    res.status(200).json({ message: 'Deleted book'});
};


exports.getBookById = getBookById;
exports.getBooksByUserId = getBooksByUserId;
exports.createBook = createBook;
exports.updateBook = updateBook;
exports.deleteBook = deleteBook;