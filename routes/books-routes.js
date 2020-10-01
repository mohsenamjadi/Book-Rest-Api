const express = require('express');
const { check } = require('express-validator');

const booksControllers = require('../controllers/books-controller');

const router = express.Router();

router.get('/:bid', booksControllers.getBookById);

router.get('/user/:uid', booksControllers.getBooksByUserId);

router.post(
    '/',
    [
        check('title').not().isEmpty(),
        check('description').isLength({min: 5}),
        check('author').not().isEmpty()
    ], 
    booksControllers.createBook);

router.patch('/:bid', [
    check('title').not().isEmpty(),
    check('description').isLength({min: 5}),
    check('author').not().isEmpty()
], booksControllers.updateBook);

router.delete('/:bid', booksControllers.deleteBook);

module.exports = router;