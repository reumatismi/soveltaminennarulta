'use strict';
// mediaController
const mediaModel = require('../models/mediaModel');
const {validationResult} = require('express-validator');
const {makeThumbnail} = require('../utils/resize');

const mediaPost_list_get = async (req, res) => {
  console.log("Fetching some media posts?");
  try {
    console.log('get all users from controllers???', req.query);
    if (req.query.sort === 'vst') {
      const mediaPostSort = await mediaModel.getAllMediaPostSort('vst');
      res.json(mediaPostSort);
      return;
    } else if (req.query.sort === 'userid') {
      const mediaPostSort = await mediaModel.getAllMediaPostSort('userid');
      res.json(mediaPostSort);
      return;
    }

    console.log("User role:" + req.user.role);

    //Checks the use role and sends the corresponding value as filter to mediaModel
    if (req.user.role  >1) {
      const mediaPost = await mediaModel.getAllMediaPost(1);
      res.json(mediaPost);
    }
    if (req.user.role  < 2) {
      const mediaPost = await mediaModel.getAllMediaPost(2);
      res.json(mediaPost);
    }
  } catch (e) {
    res.status(400).json({error: e.message});
  }
};

const mediaPost_get_by_user_id = async (req, res) => {
  try {
    console.log('Get Media Post By Id', req.params.id);
    const [media] = await mediaModel.getMediaPostByUserId(req.params.id);
    res.json(media);
  } catch (e) {
    res.status(400).json({error: e.message});
  }
};

const mediaPost_create = async (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }
  try {
    //here we will create a mediaPost with req parameters
    console.log('mediaController mediaPost_create', req.body, req.file, req.user);
    const id = await mediaModel.insertMediaPost(req);
    const media = await mediaModel.getMediaPost(id);
    res.send(media);
  } catch (e) {
    res.status(400).json({error: e.message});
  }
};

//Calls mediaModel to set visibility of mediaPost
const mediaPost_update = async (req, res) => {
  try {
    console.log('update mediaPost using html form', req.body);
    const mediaPost = req.body;
    const success = await mediaModel.updateMediaPost(mediaPost);
    res.send(`mediaPost updated ${success}`);
  }catch (e) {
    res.status(400).json({error: e.message})
  }
};

//Calls mediaModel to set VET of media post
const mediaPost_delete = async (req, res) => {
  try {
    const deleteOk = await mediaModel.deleteMediaPost(req.params.id);
    res.send(`mediaPost terminated... ${deleteOk}`);
  } catch (e) {
    res.status(400).json({error: e.message});
  }
};

const make_thumbnail = async (req, res, next) => {
  try {
    const thumbnail = await makeThumbnail(req.file.path, req.file.filename);
    if (thumbnail) {
      next();
    }
  } catch (e) {
    res.status(400).json({error: e.message});
  }
};

module.exports = {
  mediaPost_list_get,
  mediaPost_get_by_user_id,
  mediaPost_create,
  mediaPost_update,
  mediaPost_delete,
  make_thumbnail,
};
