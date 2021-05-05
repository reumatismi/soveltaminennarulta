'use strict';
// commentController
const commentModel = require('../models/commentModel');
const {validationResult} = require('express-validator');

// get comments from commentModel
const comment_list_get = async (req, res) => {
  try {
    console.log("commentController User role:" + req.user.role);

    if (req.user.role >1) {
      console.log('Fetching all comments');
      const commentPost = await commentModel.getAllComment(1);
      res.json(commentPost);
    }

    if (req.user.role < 2) {
      console.log('Fetching approved comments');
      const commentPost = await commentModel.getAllComment(2);
      res.json(commentPost);
    }

    //const commentPost = await commentModel.getAllComment();
    //console.log('commentController checking for comment return' + commentPost);
    //res.json(commentPost);
  } catch (e) {
    res.status(400).json({error: e.message});
  }
};

const comment_create = async (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }
  try {
    // create a comment with data coming from req
    console.log('commentController comment_create', req.body, req.user);
    const id = await commentModel.insertComment(req);
    const comment = await commentModel.getComment(id);
    res.send(comment);
  } catch (e) {
    res.status(400).json({error: e.message});
  }
};

const comment_update = async (req, res) => {
  try {
    console.log('update commentPost visibility', req.params);
    const success = await commentModel.updateComment(req.params);
    res.send(`comment visibility updated ${success}`);
  }catch (e) {
    res.status(400).json({error: e.message})
  }
};

const comment_delete = async (req, res) => {
  try {
    console.log(req.params.id);
    const deleteOk = await commentModel.deleteComment(req.params.id);
    res.send(`comment archived... ${deleteOk}`);
  } catch (e) {
    res.status(400).json({error: e.message});
  }
};

module.exports = {
  comment_list_get,
  comment_create,
  comment_update,
  comment_delete,
};