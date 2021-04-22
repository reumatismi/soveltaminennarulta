'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllMediaPost = async () => {
  try {

    const [rows] = await promisePool.execute('SELECT ID, ClassID, UserID, MediaFileName, MediaDesc, VST, proj_user.UName AS username FROM proj_mediaFeed LEFT JOIN proj_user ON UserID = IDNo');
    return rows;
  } catch (e) {
    console.error('mediaModel:', e.message);
  }
};

const getMediaPostById = async (id) => {
  try {
    console.log('mediaModel getCat', id);
    const [rows] = await promisePool.execute('SELECT * FROM proj WHERE cat_id = ?', [id]);
    return rows[0];
  } catch (e) {
    console.error('catModel:', e.message);
  }
};

const insertMediaPost = async (req) => {
  try {
    const [rows] = await promisePool.execute('INSERT INTO proj_mediafeed (ClassID, USerID, MediaFileName, MediaDesc, VST = now()) VALUES (?, ?, ?, ?);',
        [req.body.class_id, req.body.user_id, req.body.filename, req.body.description]);
    console.log('mediaModel insert:', rows);
    return rows.insertId;
  } catch (e) {
    console.error('insertMediaPost:', e.message);
    throw new Error('insertMediaPost failed');
  }
};

const updateMediaPost = async (id, req) => {
  try {
    const [rows] = await promisePool.execute('UPDATE proj_mediafeed SET ClassID = ?, UserID = ?, MediaDesc = ? WHERE ID = ? AND VST = ?;',
        [req.body.class_id, req.body.user_id, req.body.description, id]);
    console.log('mediaModel update:', rows);
    return rows.affectedRows === 1;
  } catch (e) {
    return false;
  }
};