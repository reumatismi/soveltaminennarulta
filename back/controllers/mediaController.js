'use strict';
// mediaController
const mediaModel = require('../models/mediaModel');
const {validationResult} = require('express-validator');
const {makeThumbnail} = require('../utils/resize');
const {getCoordinates} = require('../utils/imageMeta');

const mediaPost = mediaModel.mediaPosts;

const mediaPost_list_get = async (req, res) => {
  try {
    console.log('get all users from controllers', req.query);
    if (req.query.sort === 'age') {
      const mediaPostSort = await mediaModel.getAllMediaPostSort('age');
      res.json(mediaPostSort);
      return;
    } else if (req.query.sort === 'name') {
      const mediaPostSort = await mediaModel.getAllMediaPostSort('name');
      res.json(mediaPostSort);
      return;
    }
    const mediaPost = await mediaModel.getAllMediaPost();
    res.json(mediaPost);
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
    // hae koordinaatit
    const coords = await getCoordinates(req.file.path);
    console.log('coords', coords);
    req.body.coords = coords;
    //here we will create a cat with data comming from req...
    console.log('mediaController mediaPost_create', req.body, req.file);
    const id = await mediaModel.insertMediaPost(req);
    const media = await mediaModel.getMediaPost(id);
    res.send(media);
  } catch (e) {
    res.status(400).json({error: e.message});
  }
};

const mediaPost_update = async (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }
  const updateOk = await mediaModel.updateMedia(req.params.id, req);
  res.send(`mediaPost updated... ${updateOk}`);
};

const mediaPost_delete = async (req, res) => {
  try {
    const deleteOk = await mediaModel.deleteMediaPost(req.params.id);
    res.send(`mediaPost terminated... ${updateOk}`);
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