'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

// get all comments for database
const getAllComment = async (filter = 0) => {
  try {
    console.log('commentModel get all comments');
    const [rows] = await promisePool.execute('SELECT proj_comment.id, userid, mediaid, commenttext, visibility, proj_user.username FROM proj_comment LEFT JOIN proj_user ON userid = proj_user.id WHERE proj_comment.vet IS NULL AND visibility >= ?;', [filter]);
    console.log('all comments fetched');
    return rows;
  } catch (e) {
    console.error('commentModel:', e.message);
  }
};

// insert comment into database
const insertComment = async (req) => {
  try {
    console.log('insertComment try' + req.body.userid + ' ' + req.body.mediaid)
    const [rows] = await promisePool.execute('INSERT INTO proj_comment (userid, mediaid, commenttext, visibility, vst) VALUES (? , ?, ?, ?, NOW())',
        [req.user.id, req.body.mediaid, req.body.comment, req.user.role]);
    console.log('commentModel insert:', rows);
    return rows.insertId;
  } catch (e) {
    console.log('erroroium' + req);
    console.error('insertComment:', e.message);
    throw new Error('insertComment failed');
  }
};

const updateComment = async (req) => {
  console.log('updateComment' + req.id);
  try {
    const [rows] = await promisePool.execute('UPDATE proj_comment SET visibility = 2 WHERE id = ?;',
        [req.id]);
    console.log('commentModel update:', rows);
    return rows.affectedRows === 1;
  } catch (e) {
    return false;
  }
};

//
const getComment = async (id) => {
  try {
    console.log('commentModel getComment', id);
    const [rows] = await promisePool.execute(
        'SELECT * FROM proj_comment WHERE id = ?;', [id]);
    return rows[0];
  } catch (e) {
    console.error('commentModel:', e.message);
  }
};

const deleteComment = async (id) => {
  try {
    console.log('commentModel deleteComment', id);
    const [rows] = await promisePool.execute('UPDATE proj_comment SET vet = NOW() WHERE proj_comment.id = ?',
        [id]);
    return rows.affectedRows === 1;
  } catch (e) {
    console.error('mediaModel:', e.message);
  }
};

module.exports = {
  insertComment,
  getAllComment,
  deleteComment,
  updateComment,
  getComment
};