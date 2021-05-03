'use strict';
// commentRoute
const express = require('express');
const commentController = require('../controllers/commentController');
const {body} = require('express-validator');
const router = express.Router();

router.get('/', commentController.comment_list_get);

router.post('/',
    body('comment').isLength({min: 5}).blacklist(';'),
    commentController.comment_create);

router.put('/',
//    body('visibility').isLength({max: 1}).isNumeric().blacklist(';'),
    commentController.comment_update);

router.delete('/:id', commentController.comment_delete);

module.exports = router;