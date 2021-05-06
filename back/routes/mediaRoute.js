'use strict';
// mediaRoute
const express = require('express');
const multer = require('multer');
const mediaController = require('../controllers/mediaController');
const {body} = require('express-validator');
const router = express.Router();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/gif') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const testFile = (req, res, next) => {
  if (req.file) {
    next();
  } else {
    res.status(400).json({errors: 'file is not image'});
  }
};

const upload = multer({dest: 'uploads/', fileFilter});

router.get('/', mediaController.mediaPost_list_get);
router.post('/',
    upload.single('media'),
    testFile,
    mediaController.make_thumbnail,
    body('description').isLength({min: 3}).blacklist(';'),
    mediaController.mediaPost_create);

//router.get('/:id', mediaController.mediaPost_get_by_user_id);
router.put('/',
    mediaController.mediaPost_update);
router.delete('/:id', mediaController.mediaPost_delete);

module.exports = router;