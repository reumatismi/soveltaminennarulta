'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

// get all comments for database
const getAllComment = async () => {
  try {
    console.log('commentModel get all comments');
    const [rows] = await promisePool.execute(`SELECT userid, mediaid, commenttext, visibility, proj_comment.vst, proj_user.username FROM proj_comment LEFT JOIN proj_user ON userid = proj_user.id WHERE proj_comment.vet IS NULL`);
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
    const [rows] = await promisePool.execute('INSERT INTO proj_comment (userid, mediaid, commenttext, visibility, vst) VALUES (? , ?, ?, 1, NOW())',
        [req.body.userid, req.body.mediaid, req.body.comment]);
    console.log('commentModel insert:', rows);
    return rows.insertId;
  } catch (e) {
    console.log('erroroium' + req);
    console.error('insertComment:', e.message);
    throw new Error('insertComment failed');
  }
};

const updateComment = async (req) => {
  try {
    const [rows] = await promisePool.execute('UPDATE proj_comment SET visibility = ? WHERE id = ?;',
        [req.visibility, req.id]);
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
    console.log('mediaModel deleteMediaPost', id);
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